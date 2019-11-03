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

function root(a, b = 2) {
  return a ** (1 / b);
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
    case 'root':
      return root(a, b);
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

  evaluate() {
    // Check if expression is well formed

    // if (typeof (this.expression[length - 1]) !== 'number') {
    //   return;
    // }

    this.expression.push(Number(this.tempNumber));


    let a;
    let b;
    let type;

    this.result = this.expression.reduce((accumulator, currentValue) => {
      if (!a) {
        a = currentValue;
        accumulator = currentValue;
      } else if (!type) {
        type = currentValue;
        accumulator = a;
      } else if (!b) {
        a = operate(a, currentValue, type);
        accumulator = a;
        type = '';
      }
      return accumulator;
    }, 0);

    // Add a history to the calculator
    this.updateText(` = ${this.result}`);
    const lastExpression = document.createElement('p');
    lastExpression.classList.add('previousResult');
    lastExpression.textContent = currentExpression.text;
    containerField.appendChild(lastExpression);
    containerField.scrollTop = containerField.scrollHeight;

    currentExpression = new Calculation(String(this.result), expressionField);
    currentExpression.display();
  }

  // Getters and Setters

  set text(newText) {
    this._text = newText;
    this.display();
  }

  get text() {
    return this._text;
  }
}

function numberPressed(number) {
  currentExpression.updateText(number);
  currentExpression.tempNumber += number;
}

function normalOperatorPressed(operator) {
  currentExpression.updateExpression(operator);

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
    default:
      operatorText = '';
  }

  currentExpression.updateText(operatorText);
  currentExpression.display();
}

function clear() {
  // Make a new Calculation
  currentExpression = new Calculation('', expressionField);
  currentExpression.display();
}


// DOM-Nodes
const displayField = document.querySelector('#display');
const historyField = document.querySelector('#display .history');
const containerField = document.querySelector('#display .container');
const expressionField = document.querySelector('#display .expression');

const numberButtons = document.querySelectorAll('#buttons .number');
const operatorButtons = document.querySelectorAll('#buttons .operator');
const clearButton = document.querySelector('#buttons .clear');
const equalsButton = document.querySelector('#buttons .equals');

// Initiate Calculator with new Calculation
let currentExpression = new Calculation('', expressionField);
currentExpression.display();

// Attach event Listeners
numberButtons.forEach((button) => button.addEventListener('click', (e) => {
  numberPressed(e.target.id);
}));
operatorButtons.forEach((button) => button.addEventListener('click', (e) => {
  normalOperatorPressed(e.target.id);
}));

clearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', () => {
  currentExpression.evaluate();
});
