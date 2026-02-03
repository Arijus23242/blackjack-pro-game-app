function getAdvice(playerHand, dealerCard) {
    if (!playerHand || playerHand.length === 0 || !dealerCard) {
        return "Pasirink kortas!";
    }

    const d = parseInt(dealerCard);

    // Jei ranka turi splitable kortas (pvz. "8,8")
    if (playerHand.length === 2 && playerHand[0] === playerHand[1]) {
        return splitAdvice(playerHand[0], d);
    }

    // Patikriname soft hands (A + kažkas)
    if (playerHand.includes(11) && playerHand.length === 2) {
        return softAdvice(playerHand, d);
    }

    // Hard total
    const total = playerHand.reduce((a,b)=>parseInt(a)+parseInt(b),0);
    return basicAdvice(total, d);
}

// Hard hands
function basicAdvice(total, dealer) {
    if (total >= 17) return "STAND";
    if (total >= 13 && dealer <= 6) return "STAND";
    if (total === 12 && dealer >= 4 && dealer <= 6) return "STAND";
    if (total === 11) return "DOUBLE";
    if (total === 10 && dealer <= 9) return "DOUBLE";
    if (total === 9 && dealer >= 3 && dealer <= 6) return "DOUBLE";
    return "HIT";
}

// Soft hands (A2–A9)
function softAdvice(hand, dealer) {
    let nonA = hand.find(c => c != 11);
    switch(nonA) {
        case 2: case 3: return (dealer>=5 && dealer<=6) ? "DOUBLE":"HIT";
        case 4: case 5: return (dealer>=4 && dealer<=6) ? "DOUBLE":"HIT";
        case 6: return (dealer>=3 && dealer<=6) ? "DOUBLE":"HIT";
        case 7: if(dealer>=3 && dealer<=6) return "DOUBLE"; if(dealer===2||dealer>=8) return "STAND"; return "STAND";
        case 8: case 9: return "STAND";
        default: return "HIT";
    }
}

// Split
function splitAdvice(card, dealer) {
    const c = parseInt(card);
    switch(c) {
        case 11: return "SPLIT"; // AA
        case 8: return "SPLIT";
        case 10: return "STAND";
        case 9: return (dealer>=2 && dealer<=6) || dealer===8||dealer===9 ? "SPLIT":"STAND";
        case 7: return dealer<=7?"SPLIT":"HIT";
        case 6: return dealer<=6?"SPLIT":"HIT";
        case 5: return dealer<=9?"DOUBLE":"HIT";
        case 4: return dealer===5||dealer===6?"SPLIT":"HIT";
        case 3: case 2: return dealer<=7?"SPLIT":"HIT";
        default: return "HIT";
    }
}
