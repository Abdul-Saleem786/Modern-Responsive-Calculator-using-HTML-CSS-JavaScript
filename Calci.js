const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let resetNext = false;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('clear')) {
      currentInput = '';
      display.value = '';
    } else if (button.classList.contains('delete')) {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
    } else if (button.classList.contains('equal')) {
      try {
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
        resetNext = true;
      } catch {
        display.value = 'Error';
        currentInput = '';
      }
    } else {
      if (resetNext && !isNaN(value)) {
        currentInput = value;
        resetNext = false;
      } else {
        currentInput += value;
      }
      display.value = currentInput;
    }
  });
});

// Optional: Support keyboard input
document.addEventListener('keydown', (e) => {
  if (
    (e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/', '.', '%'].includes(e.key)
  ) {
    currentInput += e.key;
    display.value = currentInput;
  } else if (e.key === 'Enter') {
    try {
      currentInput = eval(currentInput).toString();
      display.value = currentInput;
      resetNext = true;
    } catch {
      display.value = 'Error';
      currentInput = '';
    }
  } else if (e.key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (e.key === 'Escape') {
    currentInput = '';
    display.value = '';
  }
});
