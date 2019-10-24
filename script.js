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
    this.tempType = '';
    this.tempNumber = '';
  }

  display() {
    this.place.textContent = this._text;
  }

  updateText(newText) {
    this._text += newText;
    this.display();
  }

  updateExpression() {
    this.expression.push(Number(this.tempNumber));
    this.expression.push(this.tempType);
  }

  numberPressed(number) {
    this.updateText(number);
    this.tempNumber += number;
  }

  // Getters and Setters

  set text(newText) {
    this._text = newText;
    this.display();
  }

  get text() {
    return this._text;
  }

  set type(operation) {
    this._type = operation;
  }

  get type() {
    return this._type;
  }
}


const expressionField = document.querySelector('#display .expression');

const numberButtons = document.querySelectorAll('#buttons .number');

const currentExpression = new Calculation('1+2', expressionField);
currentExpression.display();
currentExpression.updateText('3x9');


// Continue Here, ALSO MAke GIT !!!!!!!
numberButtons.forEach((button) => button.addEventListener('onlick', (e) => {
  const current = currentExpression;
  current.numberPressed(e.target.id);
  console.log(e.target.id);
}));
