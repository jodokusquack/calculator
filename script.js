/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint no-underscore-dangle: 0 */

// Define calculation types

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Please don't!";
  }
  return a / b;
}

function power(a, b) {
  return a ** b;
}


// Operate function
function operate(a, b, operator) {
  switch (operator) {
    case 'add':
      return add(a, b);
    case 'subtract':
      return subtract(a, b);
    case 'multiply':
      return multiply(a, b);
    case 'divide':
      return divide(a, b);
    case 'power':
      return power(a, b);
    default:
      return 'Please input two numbers and an operator.';
  }
}

// Define Calculation class
class Calculation {
  constructor(text, place) {
    this._text = text;
    this.place = place;
    this.expression = [];
    this.tempNumber = text;
    this.result = 0;
  }

  display() {
    this.place.textContent = this._text;
  }

  updateText(newText) {
    this._text += newText;
    this.display();
  }

  updateExpression(type) {
    this.expression.push(Number(this.tempNumber));
    this.expression.push(type);

    // Reset tempNumber
    this.tempNumber = '';
  }

  numberPressed(number) {
    this.updateText(number);
    this.tempNumber += number;
    expressionField.scrollLeft = expressionField.scrollWidth;
  }

  normalOperatorPressed(operator) {
    let operatorText = '';
    switch (operator) {
      case 'add':
        operatorText = ' + ';
        break;
      case 'subtract':
        operatorText = ' - ';
        break;
      case 'multiply':
        operatorText = ' x ';
        break;
      case 'divide':
        operatorText = ' / ';
        break;
      case 'power':
        operatorText = ' ^ ';
        break;
      default:
        operatorText = '';
    }

    if (typeof this.expression[this.expression.length - 1] === 'string' && !this.tempNumber) {
      this.expression.pop();
      this.expression.push(operator);
      this.text = this._text.replace(/\s[+\-x/]\s$/, operatorText);
    } else {
      this.updateExpression(operator);

      // Update text
      this.updateText(operatorText);
      expressionField.scrollLeft = expressionField.scrollWidth;
    }
  }

  evaluatePressed() {
    if (this.expression.length === 0) {
      return;
    }


    this.expression.push(Number(this.tempNumber));
    this.reformExpression();
    this.result = this.evaluate(this.expression);

    // Add a history to the calculator
    this.updateText(` = ${this.result}`);
    const lastExpression = document.createElement('p');
    lastExpression.classList.add('previousResult');
    lastExpression.textContent = currentExpression.text;
    containerField.appendChild(lastExpression);
    containerField.scrollTop = containerField.scrollHeight;

    currentExpression = new Calculation(String(this.result), expressionField);
    currentExpression.display();
    expressionField.scrollLeft = 0;
  }

  // eslint-disable-next-line class-methods-use-this
  evaluate(expression) {
    function init() {
      let a;
      let b;
      let type;

      function reduceExpression(accumulator, currentValue) {
        if (Array.isArray(currentValue)) {
          const newReducer = init();
          currentValue = currentValue.reduce(newReducer, 0);
        }
        if (a === undefined) {
          a = currentValue;
          accumulator = currentValue;
        } else if (!type) {
          type = currentValue;
          accumulator = a;
        } else if (b === undefined) {
          a = operate(a, currentValue, type);
          accumulator = a;
          type = '';
        }
        return accumulator;
      }

      return reduceExpression;
    }
    const recursiveReducer = init();

    return expression.reduce(recursiveReducer, 0);
  }

  reformExpression() {
    while (this.expression.includes('power')) {
      const index = this.expression.indexOf('power');

      this.expression.splice(index - 1, 3, [this.expression[index - 1],
        this.expression[index], this.expression[index + 1]]);
    }
    while (this.expression.includes('multiply') || this.expression.includes('divide')) {
      const index = this.expression.findIndex((item) => item === 'multiply' || item === 'divide');

      this.expression.splice(index - 1, 3, [this.expression[index - 1],
        this.expression[index], this.expression[index + 1]]);
    }
  }

  negate() {
    if (Number(this.tempNumber) > 0) {
      this.text = `${this.text.slice(0, -this.tempNumber.length)}-${this.text.slice(-this.tempNumber.length)}`;
    } else if (Number(this.tempNumber) < 0) {
      this.text = this.text.slice(0, -this.tempNumber.length)
      + this.text.slice(-this.tempNumber.length + 1);
    }
    this.tempNumber = String(this.tempNumber * -1);
  }

  decimal() {
    if (Number.isInteger(Number(this.tempNumber))) {
      this.updateText('.');
      this.tempNumber += '.';
      expressionField.scrollLeft = expressionField.scrollWidth;
    }
  }

  root() {
    this.text = this.text.slice(0, -this.tempNumber.length);
    this.tempNumber = Math.sqrt(this.tempNumber);
    this.updateText(this.tempNumber);
  }

  backspace() {
    if (this.expression.length === 0 && this.tempNumber === '') {
      return;
    }

    if (this.tempNumber !== '') {
      this.text = this.text.slice(0, -1);
      this.tempNumber = this.tempNumber.slice(0, -1);
    } else if (this.tempNumber === '') {
      this.text = this.text.slice(0, -3);
      this.expression.pop();
      this.tempNumber = this.expression.pop();
    }
  }

  // Getters and Setters

  set text(newText) {
    this._text = newText;
    this.display();
  }

  get text() {
    return this._text;
  }
} // Object ends


function clear() {
  // Make a new Calculation
  currentExpression = new Calculation('', expressionField);
  currentExpression.display();
}


// DOM-Nodes
// const displayField = document.querySelector('#display');
// const historyField = document.querySelector('#display .history');
const containerField = document.querySelector('#display .container');
const expressionField = document.querySelector('#display .expression');

const numberButtons = document.querySelectorAll('#buttons .number');
const operatorButtons = document.querySelectorAll('#buttons .operator');
const clearButton = document.querySelector('#buttons .clear');
const equalsButton = document.querySelector('#buttons .equals');
const negativeButton = document.querySelector('#buttons .negative');
const decimalButton = document.querySelector('#buttons .decimalPoint');
const rootButton = document.querySelector('#buttons .root');
const backspaceButton = document.querySelector('#buttons .backspace');

// Initiate Calculator with new Calculation
let currentExpression = new Calculation('', expressionField);
currentExpression.display();

// Attach event Listeners
numberButtons.forEach((button) => button.addEventListener('click', (e) => {
  currentExpression.numberPressed(e.target.id);
}));

operatorButtons.forEach((button) => button.addEventListener('click', (e) => {
  currentExpression.normalOperatorPressed(e.target.id);
}));

equalsButton.addEventListener('click', () => {
  currentExpression.evaluatePressed();
});

clearButton.addEventListener('click', clear);

negativeButton.addEventListener('click', () => {
  currentExpression.negate();
});

decimalButton.addEventListener('click', () => {
  currentExpression.decimal();
});

rootButton.addEventListener('click', () => {
  currentExpression.root();
});

backspaceButton.addEventListener('click', () => {
  currentExpression.backspace();
});

// Keyboard support //
function keydown(e) {
  if (!isNaN(Number(e.key))) {
    currentExpression.numberPressed(Number(e.key));
  } else if (e.key === ',' || e.key === '.') {
    currentExpression.decimal();
  } else if (['+', '-', '*', '/'].includes(e.key)) {
    const operation = {
      '+': 'add',
      '-': 'subtract',
      '*': 'multiply',
      '/': 'divide',
    };
    currentExpression.normalOperatorPressed(operation[e.key]);
  } else if (e.key === 'Enter') {
    currentExpression.evaluatePressed();
  } else if (e.key === 'Backspace') {
    currentExpression.backspace();
  }
}
window.addEventListener('keydown', keydown);
