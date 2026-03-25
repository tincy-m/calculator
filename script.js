(function(){
  const display = document.getElementById('display');
  const buttons = Array.from(document.querySelectorAll('.btn'));

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      const value = btn.dataset.value;
      if (action === 'clear') {
        display.value = '';
        return;
      }
      if (action === 'back') {
        display.value = display.value.slice(0, -1);
        return;
      }
      if (action === 'equals') {
        calculate();
        return;
      }
      if (typeof value !== 'undefined') {
        display.value += value;
      }
    });
  });

  function calculate(){
    const expr = display.value.trim();
    if (!expr) return;
    // allow only digits, operators, parentheses, dot and spaces
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
      display.value = 'Error';
      return;
    }
    try {
      // safe-ish evaluation
      const result = Function('"use strict"; return (' + expr + ')')();
      display.value = String(result);
    } catch (e) {
      display.value = 'Error';
    }
  }

  // keyboard support (optional)
  document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || ['+','-','*','/','.','(',')',' '].includes(e.key)) {
      display.value += e.key;
      e.preventDefault();
      return;
    }
    if (e.key === 'Enter') {
      calculate();
      e.preventDefault();
      return;
    }
    if (e.key === 'Backspace') {
      display.value = display.value.slice(0, -1);
      e.preventDefault();
      return;
    }
    if (e.key === 'Escape') {
      display.value = '';
      e.preventDefault();
      return;
    }
  });
})();
