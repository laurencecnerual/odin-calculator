let firstNumber = "";
let operator = "";
let secondNumber = "";
let displayText = "";

let firstInputComplete = false;
let secondInputComplete = false;

const display = document.querySelector(".display-area");

const buttons = Array.from(document.querySelectorAll("button"));

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("number")) {
            buildNumber(button.textContent);
        } else if (button.classList.contains("math-op")) {
            setOperator(button.textContent);
        } else if (button.id == "equal") {
            displayText = operate(Number(firstNumber), operator, Number(secondNumber));
            updateDisplay();
        }
    });
});

function buildNumber(value) {
    if (!firstInputComplete) {
        firstNumber += value;
        displayText = firstNumber;
        updateDisplay();
    } else if (!secondInputComplete) {
        secondNumber += value;
        displayText += secondNumber;
        updateDisplay();
    }
}

function setOperator(value) {
    if (!firstInputComplete) {
        firstInputComplete = true;
        operator = value;
        displayText += " " + operator + " ";
        updateDisplay();
    } else if (!secondInputComplete) {
        secondInputComplete = true;
        displayText = operate(Number(firstNumber), operator, Number(secondNumber));
        updateDisplay();
    }
}

function updateDisplay() {
    display.textContent = displayText;
}

// function calculate() {
//     firstInputComplete

//     secondNumber = ""
//     secondInputComplete = false;
//     return operate(Number(firstNumber), operator, Number(secondNumber));
// }

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
    return a / b;
}

function getRemainder(a, b) {
    return a % b;
}

function exponentiate(a, b) {
    return a ** b;
}

function operate(firstNum, action, secondNum) {
    let result;

    switch (action) {
        case "+":
            result = add(firstNum, secondNum);
            break;
        case "-":
            result = subtract(firstNum, secondNum);
            break;
        case "×":
            result = multiply(firstNum, secondNum);
            break;
        case "÷":
            result = divide(firstNum, secondNum);
            break;
        case "MOD":
            result = getRemainder(firstNum, secondNum);
            break;
        case "POW":
            result = exponentiate(firstNum, secondNum);
            break;
        default:
            result = "INVALID OPERATOR";
    }

    return result;
}

// console.log(add(2,3));
// console.log(subtract(2,3));
// console.log(multiply(2,3));
// console.log(divide(2,3));
// console.log(getRemainder(2,3));
// console.log(exponentiate(2,3));

// console.log(operate(2,"+",3));
// console.log(operate(2,"-",3));
// console.log(operate(2,"*",3));
// console.log(operate(2,"/",3));
// console.log(operate(2,"#",3));
// console.log(operate(2,"%",3));
// console.log(operate(2,"^",3));