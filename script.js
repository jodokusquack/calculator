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
    case 'plus':
      return add(a, b);
    case 'minus':
      return subtract(a, b);
    case 'times':
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
    this.tempNumber = '';
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
    console.log(this.expression);

    // Reset tempNumber
    this.tempNumber = '';
  }

  evaluate() {
    // Add a history to the calculator
    const lastExpression = document.createElement('p');
    lastExpression.classList.add('previousResult');
    lastExpression.textContent = currentExpression.text;
    containerField.appendChild(lastExpression);
    containerField.scrollTop = containerField.scrollHeight;

    // For now
    this.result = 0;
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

  console.log(operatorText);
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
  console.log(e.target.id);
}));

clearButton.addEventListener('click', clear);
equalsButton.addEventListener('click', currentExpression.evaluate);
