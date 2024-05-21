let firstNumber;
let operator;
let secondNumber;

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

function operate(firstNum, action, secondNum) {
    let result;

    switch (action) {
        case "+":
            result = add(firstNum, secondNum);
            break;
        case "-":
            result = subtract(firstNum, secondNum);
            break;
        case "*":
            result = multiply(firstNum, secondNum);
            break;
        case "/":
            result = divide(firstNum, secondNum);
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

// console.log(operate(2,"+",3));
// console.log(operate(2,"-",3));
// console.log(operate(2,"*",3));
// console.log(operate(2,"/",3));
// console.log(operate(2,"#",3));