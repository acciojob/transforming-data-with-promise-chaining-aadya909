// Wait for the DOM to be fully loaded before attaching event listeners
window.onload = function () {
  const input = document.getElementById('ip');
  const button = document.getElementById('btn');
  const output = document.getElementById('output');

  // Function to delay a promise and transform a number
  function delayedOperation(value, delay, operation, label = 'Result') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const result = operation(value);
        output.textContent = `${label}: ${result}`;
        resolve(result);
      }, delay);
    });
  }

  // Event listener for the button click
  button.onclick = function () {
    const inputValue = Number(input.value);
    if (isNaN(inputValue)) {
      output.textContent = 'Please enter a valid number.';
      return;
    }

    // Chain of transformations using promises
    new Promise((resolve) => {
      setTimeout(() => {
        output.textContent = `Result: ${inputValue}`;
        resolve(inputValue);
      }, 2000); // Initial 2-second delay
    })
      .then((num) => delayedOperation(num, 2000, (n) => n * 2))       // Multiply by 2
      .then((num) => delayedOperation(num, 1000, (n) => n - 3))       // Subtract 3
      .then((num) => delayedOperation(num, 1000, (n) => n / 2))       // Divide by 2
      .then((num) => delayedOperation(num, 1000, (n) => n + 10, 'Final Result')); // Add 10
  };
};

