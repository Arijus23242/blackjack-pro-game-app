function getAdvice() {
    const p = document.getElementById("player").value.trim();
    const d = parseInt(document.getElementById("dealer").value);

    if (!p || isNaN(d) || d < 2 || d > 11) {
        document.getElementById("result").innerText = "Įveskite teisingas kortas!";
        return;
    }

    // Patikriname ar ranka splitable (pvz. '8,8')
    if (p.includes(",")) {
        const cards = p.split(",").map(c => parseInt(c));
        const advice = splitAdvice(cards, d);
        document.getElementById("result").innerText = "👉 " + advice;
        return;
    }

    const total = parseInt(p);
    let advice = basicAdvice(total, d);
    document.getElementById("result").innerText = "👉 " + advice;
}

// Pagrindinė strategija (hard totals)
function basicAdvice(total, dealer) {
    // Hard hands
    if (total >= 17) return "STAND";
    if (total >= 13 && dealer <= 6) return "STAND";
    if (total === 12 && dealer >= 4 && dealer <= 6) return "STAND";
    if (total === 11) return "DOUBLE";
    if (total === 10 && dealer <= 9) return "DOUBLE";
    if (total === 9 && dealer >= 3 && dealer <= 6) return "DOUBLE";
    return "HIT";
}

// Soft hands (A2–A9)
function softAdvice(softTotal, dealer) {
    switch (softTotal) {
        case "A,2": case "A,3":
            return (dealer >= 5 && dealer <= 6) ? "DOUBLE" : "HIT";
        case "A,4": case "A,5":
            return (dealer >= 4 && dealer <= 6) ? "DOUBLE" : "HIT";
        case "A,6":
            return (dealer >= 3 && dealer <= 6) ? "DOUBLE" : "HIT";
        case "A,7":
            if (dealer >= 3 && dealer <= 6) return "DOUBLE";
            if (dealer === 2 || dealer >= 😎 return "STAND";
            return "STAND";
        case "A,8": case "A,9":
            return "STAND";
        default:
            return "HIT";
    }
}

// Splitų patarimai
function splitAdvice(cards, dealer) {
    const [c1, c2] = cards;
    if (c1 !== c2) return basicAdvice(c1 + c2, dealer);

    switch (c1) {
        case 11: return "SPLIT"; // AA
        case 8: return "SPLIT";
        case 10: return "STAND";
        case 9:
            return (dealer >= 2 && dealer <= 6) || (dealer === 8 || dealer === 9) ? "SPLIT" : "STAND";
        case 7: return (dealer <= 7) ? "SPLIT" : "HIT";
        case 6: return (dealer <= 6) ? "SPLIT" : "HIT";
        case 5: return (dealer <= 9) ? "DOUBLE" : "HIT";
        case 4: return (dealer === 5 || dealer === 6) ? "SPLIT" : "HIT";
        case 3: case 2: return (dealer <= 7) ? "SPLIT" : "HIT";
        default: return basicAdvice(c1 + c2, dealer);
    }
}
