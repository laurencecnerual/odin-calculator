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
            evaluateEquation();
        }
    });
});

function buildNumber(value) {
    if (!firstInputComplete) {
        firstNumber += value;
        refreshDisplay(firstNumber);
    } else if (!secondInputComplete) {
        secondNumber += value;
        refreshDisplay(displayText + secondNumber);
    }
}

function setOperator(value) {
    if (!firstInputComplete) {
        firstInputComplete = true;
        operator = value;
        refreshDisplay(displayText + " " + operator + " ");
    } else if (!secondInputComplete) {
        secondInputComplete = true;
        evaluateEquation();
    }
}

function refreshDisplay(value) {
    displayText = value;
    display.textContent = displayText;
}

function evaluateEquation() {
    firstNumber = operate(Number(firstNumber), operator, Number(secondNumber))
    firstInputComplete = false;

    secondNumber = ""
    secondInputComplete = false;

    refreshDisplay(firstNumber);
}

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