let firstNumber = "";
let operator = "";
let secondNumber = "";
let displayText = "";

let firstInputComplete = false;
let secondInputComplete = false;

const operatorError = "BAD OPERATOR";
const divideByZeroError = "NICE TRY";
const nthPlaceRounding = 1000000;

const display = document.querySelector(".display-area");

const buttons = Array.from(document.querySelectorAll("button"));

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("number") || button.id == "decimal") {
            buildNumber(button.textContent);
        } else if (button.classList.contains("math-op")) {
            setOperator(button.textContent);
        } else if (button.id == "equal") {
            evaluateEquation();
        } else if (button.id == "clear-all") {
            clearAll();
        } else if (button.id == "backspace") {
            undo();
        }
    });
});

function buildNumber(value) {
    if (!firstInputComplete) {
        if (isFinite(firstNumber) && !hasDoubleSymbols(value, firstNumber)) {
            firstNumber += value;
            refreshDisplay(firstNumber);
        }
    } else if (!secondInputComplete) {
        if (isFinite(secondNumber) && !hasDoubleSymbols(value, secondNumber)) {
            secondNumber += value;
            refreshDisplay(firstNumber + " " + operator + " " + secondNumber);
        }
    }
}

function setOperator(value) {
    if (!firstInputComplete && isValid(firstNumber)) {
        firstInputComplete = true;
        operator = value;
        refreshDisplay(firstNumber + " " + operator + " ");
    } else if (!secondInputComplete && isValid(firstNumber) && isValid(secondNumber)) {
        secondInputComplete = true;
        evaluateEquation();
        
        if (!isErrorMessage(firstNumber)) {
            operator = value;
            refreshDisplay(firstNumber + " " + operator + " ");
            firstInputComplete = true;
        }
    } else if (value == "-" && !isErrorMessage(firstNumber)) {
        buildNumber(value);
    }
}

function refreshDisplay(value) {
    displayText = value;
    display.textContent = displayText;
}

function evaluateEquation() {
    if (isValid(firstNumber) && isValid(secondNumber)) {
        firstNumber = operate(Number(firstNumber), operator, Number(secondNumber))
        firstInputComplete = false;

        operator = ""

        secondNumber = ""
        secondInputComplete = false;

        refreshDisplay(firstNumber);
    }
}

function clearAll() {
    firstNumber = ""
    firstInputComplete = false;

    operator = ""

    secondNumber = ""
    secondInputComplete = false;

    refreshDisplay("");
}

function hasDoubleSymbols(value, targetNumber) {
    return (value == "." && targetNumber.includes(".") || value == "-" && targetNumber.includes("-") || value == "-" && targetNumber.includes("."));
}

function undo() {
    if (secondNumber != "") {
        secondNumber = secondNumber.slice(0, -1);
        refreshDisplay(firstNumber + " " + operator + " " + secondNumber)
    } else if (operator != "") {
        operator = "";
        refreshDisplay(firstNumber);
        firstInputComplete = false;
    } else if (firstNumber != "") {
        firstNumber = firstNumber.slice(0, -1);
        refreshDisplay(firstNumber);
    }
}

function isValid(targetNumber) {
    return (targetNumber != "" && targetNumber != "." && targetNumber != "-" && targetNumber != "-." && !isErrorMessage(targetNumber) && isFinite(targetNumber));
}

function isErrorMessage(targetNumber) {
    return (targetNumber.length > 0 && isNaN(targetNumber));
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
    return b != 0? a / b : divideByZeroError;
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
            result = operatorError;
    }

    return !isErrorMessage(result) ? round(result).toString() : result;
}

function round(targetNumber) {
    return Math.round((targetNumber + Number.EPSILON) * nthPlaceRounding) / nthPlaceRounding;
}