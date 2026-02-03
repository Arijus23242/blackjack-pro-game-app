function getAdvice() {
  const p = parseInt(document.getElementById("player").value);
  const d = parseInt(document.getElementById("dealer").value);
  let advice = "HIT";

  if (p >= 17) advice = "STAND";
  if (p >= 13 && d <= 6) advice = "STAND";
  if (p === 12 && d >= 4 && d <= 6) advice = "STAND";
  if (p === 11) advice = "DOUBLE";
  if (p === 10 && d <= 9) advice = "DOUBLE";
  if (p === 9 && d >= 3 && d <= 6) advice = "DOUBLE";

  document.getElementById("result").innerText = "👉 " + advice;
}
