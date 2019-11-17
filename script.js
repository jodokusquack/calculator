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
        console.log(currentValue);
        if (Array.isArray(currentValue)) {
          const newReducer = init();
          currentValue = currentValue.reduce(newReducer, 0);
          console.log('Going deeper');
        }
        if (a === undefined) {
          a = currentValue;
          accumulator = currentValue;
          console.log('a set');
        } else if (!type) {
          type = currentValue;
          accumulator = a;
          console.log('type set');
        } else if (b === undefined) {
          a = operate(a, currentValue, type);
          accumulator = a;
          type = '';
          console.log('acc set');
        }
        console.log('next');
        return accumulator;
      }

      return reduceExpression;
    }
    const recursiveReducer = init();

    return expression.reduce(recursiveReducer, 0);
  }

  reformExpression() {
    while (this.expression.includes('multiply') || this.expression.includes('divide')) {
      const index = this.expression.findIndex((item) => item === 'multiply' || item === 'divide');

      this.expression.splice(index - 1, 3, [this.expression[index - 1],
        this.expression[index], this.expression[index + 1]]);
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
}

// function format(number) {
//   let numberString = String(number);
//   if (numberString.length <= 10) {
//     return number
//   } else {
//     if (numberString[9] === ".") {
//       if (Number(numberString[10]) >= 5) {
//         return Number(numberString.slice(0,8) + String(Number(numberString[8] + 1)));
//       } else {
//         return Number(numberString.slice(0, 9));
//       }
//     } else {
//       if (Number(numberString[10]) >= 5) {
//         return Number(numberString.slice(0, 9) + String(Number(numberString[9] + 1)));
//       }
//         return Number(numberString.slice(0, 10));

//     }
//   }
// }


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
  currentExpression.numberPressed(e.target.id);
}));
operatorButtons.forEach((button) => button.addEventListener('click', (e) => {
  currentExpression.normalOperatorPressed(e.target.id);
}));
equalsButton.addEventListener('click', () => {
  currentExpression.evaluatePressed();
});

clearButton.addEventListener('click', clear);
