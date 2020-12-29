let displayInput = document.querySelector('.calc-display--input'),
    displayOperation = document.querySelector('.calc-display--operation'),
    displayResult = document.querySelector('.calc-display--result'),
    buttonsDigits = document.querySelectorAll('.colorDigit'),
    buttonsOpers = document.querySelectorAll('.colorOper'),
    clearBtn = document.querySelector('[value="C"]'),
    dotBtn = document.querySelector('[value="."]'),
    plusMinusBtn = document.querySelector('[value="±"]'),
    equallyBtn = document.querySelector('.colorEqually'),
    input = '',
    inputPrev = '',
    operation = '',
    operationValue = '',
    operationLastPressed = false,
    result = '';

function showDisplay() {
    if (!input) {displayInput.innerHTML = '0';}
    else {displayInput.innerHTML = input;}

    if (!result) {displayOperation.innerHTML = inputPrev.toString() + operationValue;}
    else {displayOperation.innerHTML = inputPrev.toString() + operationValue + input;}

    displayResult.innerHTML = result;
}

buttonsDigits.forEach(item => item.addEventListener('click', () => {
        if (operationLastPressed && !result) {
            inputPrev = input;
            input = '';
            operationLastPressed = false;
        }
        if (input.length < 11) input += item.value;
        // showDisplay();
        if (!input) {displayInput.innerHTML = '0';}
        else {displayInput.innerHTML = input;}
} ))

buttonsOpers.forEach(item => item.addEventListener('click', () => {
    if (result && !operationLastPressed) {
        inputPrev = result;
        showDisplay();
    }
    if (item.value === '÷') {operation = 'divide'; operationValue = "/";}
    if (item.value === '×') {operation = 'multiply'; operationValue = "*";}
    if (item.value === '+') {operation = 'plus'; operationValue = "+";}
    if (item.value === '-') {operation = 'minus'; operationValue = "-";}
    operationLastPressed = true;
    if (!result) inputPrev = input;
    showDisplay();
} ))

clearBtn.addEventListener('click', () => {
    input = '';
    inputPrev = '';
    operation = '';
    operationValue = '';
    result = '';
    showDisplay();
})

dotBtn.addEventListener('click', () => {
    if (!input.split('').find(symb => symb == '.')) {
        if (input.length < 10 && input.length)
            input += '.';
    }
    showDisplay();
})

plusMinusBtn.addEventListener('click', () => {
    if (input) {
        if (input.toString().charAt(0) !== "-" ) input = '-' + input.toString();
        else input = input.toString().slice(1);
    }
    showDisplay();
})

equallyBtn.addEventListener('click', () => {
    if (operation == 'divide') {result = +inputPrev / +input;}
    if (operation == 'multiply') {result = +inputPrev * +input;}
    if (operation == 'plus') {result = +inputPrev + +input;}
    if (operation == 'minus') {result = +inputPrev - +input;}
    showDisplay();
    input = '';
    inputPrev = result;
    operation = '';
    operationValue = '';
    operationLastPressed = true;
    displayInput.innerHTML = '0';
})