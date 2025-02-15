document.addEventListener("DOMContentLoaded", function () {
  // Prende gli elementi display
  const inputDisplay = document.querySelector(".screen .input");
  const mainDisplay = document.querySelector(".screen .main-display");
  // Usa il contenuto iniziale come espressione
  let expression = inputDisplay.textContent.trim();
  let lastAnswer = ""; // ultimo risultato
  let memory = 0;      // memoria (M+ / RCL)

  // Aggiorna il display dell'espressione
  function updateDisplay() {
    inputDisplay.textContent = expression;
  }

  // Converte alcuni simboli grafici in operatori validi per eval()
  function transformExpression(expr) {
    return expr
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/−/g, "-")
      .replace(/\^/g, "**");
  }

  // Valuta l'espressione e aggiorna il main display
  function evaluateExpression() {
    const expr = transformExpression(expression);
    try {
      const result = eval(expr);
      lastAnswer = result;
      mainDisplay.textContent = result;
      expression = result.toString();
    } catch (e) {
      mainDisplay.textContent = "Error";
    }
  }

  // Gestisce la pressione dei pulsanti
  document.querySelectorAll(".calculator button").forEach(function (button) {
    button.addEventListener("click", function () {
      // Pulsante OFF (AC) - cancella tutto
      if (button.classList.contains("ac")) {
        expression = "";
        mainDisplay.textContent = "";
        updateDisplay();
        return;
      }
      // Pulsante DEL - elimina l'ultimo carattere
      if (button.classList.contains("del")) {
        expression = expression.slice(0, -1);
        updateDisplay();
        return;
      }
      // Pulsante "=" - valuta l'espressione
      if (button.classList.contains("equals")) {
        evaluateExpression();
        return;
      }
      // Pulsante "Ans" - inserisce l'ultimo risultato
      if (button.classList.contains("ans")) {
        expression += lastAnswer.toString();
        updateDisplay();
        return;
      }
      // Funzione M+ (mem-plus): aggiunge il valore corrente alla memoria
      if (button.classList.contains("mem-plus")) {
        try {
          const val = eval(transformExpression(expression));
          memory += val;
        } catch (e) {
          // se c'è un errore, non fa nulla
        }
        return;
      }
      // Funzione RCL: richiama il valore in memoria
      if (button.classList.contains("rcl")) {
        expression += memory.toString();
        updateDisplay();
        return;
      }
      // Pulsanti funzione: sin, cos, tan, log, ln, x², x³, reciproco
      if (button.classList.contains("sin")) {
        try {
          const val = eval(transformExpression(expression));
          const result = Math.sin(val * Math.PI / 180); // in gradi
          expression = result.toString();
          mainDisplay.textContent = result;
          updateDisplay();
        } catch (e) {
          mainDisplay.textContent = "Error";
        }
        return;
      }
      if (button.classList.contains("cos")) {
        try {
          const val = eval(transformExpression(expression));
          const result = Math.cos(val * Math.PI / 180);
          expression = result.toString();
          mainDisplay.textContent = result;
          updateDisplay();
        } catch (e) {
          mainDisplay.textContent = "Error";
        }
        return;
      }
      if (button.classList.contains("tan")) {
        try {
          const val = eval(transformExpression(expression));
          const result = Math.tan(val * Math.PI / 180);
          expression = result.toString();
          mainDisplay.textContent = result;
          updateDisplay();
        } catch (e) {
          mainDisplay.textContent = "Error";
        }
        return;
      }
      if (button.classList.contains("log")) {
        try {
          const val = eval(transformExpression(expression));
          const result = Math.log10(val);
          expression = result.toString();
          mainDisplay.textContent = result;
          updateDisplay();
        } catch (e) {
          mainDisplay.textContent = "Error";
        }
        return;
      }
      if (button.classList.contains("ln")) {
        try {
          const val = eval(transformExpression(expression));
          const result = Math.log(val);
          expression = result.toString();
          mainDisplay.textContent = result;
          updateDisplay();
        } catch (e) {
          mainDisplay.textContent = "Error";
        }
        return;
      }
      if (button.classList.contains("square")) {
        try {
          const val = eval(transformExpression(expression));
          const result = val * val;
          expression = result.toString();
          mainDisplay.textContent = result;
          updateDisplay();
        } catch (e) {
          mainDisplay.textContent = "Error";
        }
        return;
      }
      if (button.classList.contains("cube")) {
        try {
          const val = eval(transformExpression(expression));
          const result = val * val * val;
          expression = result.toString();
          mainDisplay.textContent = result;
          updateDisplay();
        } catch (e) {
          mainDisplay.textContent = "Error";
        }
        return;
      }
      if (button.classList.contains("reciprocal")) {
        try {
          const val = eval(transformExpression(expression));
          const result = 1 / val;
          expression = result.toString();
          mainDisplay.textContent = result;
          updateDisplay();
        } catch (e) {
          mainDisplay.textContent = "Error";
        }
        return;
      }
      
      // Per tutti gli altri pulsanti, aggiunge il loro testo all'espressione.
      // (Nota: alcuni pulsanti potrebbero avere pseudo-elementi; usiamo trim() sul testo visibile.)
      const key = button.textContent.trim();
      expression += key;
      updateDisplay();
    });
  });
});