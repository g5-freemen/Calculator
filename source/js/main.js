let displayInput = document.querySelector('.calc-display--input'),
    displayOperation = document.querySelector('.calc-display--operation'),
    displayResult = document.querySelector('.calc-display--result'),
    calcPad = document.querySelector('.calc-pad'),
    input = '',
    inputPrev = '',
    operation = '',
    operationValue = '',
    operationLastPressed = false,
    result = '';
const ResultFontSize = Number.parseInt( document.defaultView.getComputedStyle(displayResult).fontSize );
const OperationFontSize = Number.parseInt( document.defaultView.getComputedStyle(displayOperation).fontSize );

function showDisplay() {
    if (!input) {displayInput.innerHTML = '0';}
    else {displayInput.innerHTML = input;}

    if (!result) {displayOperation.innerHTML = inputPrev.toString() + operationValue;}
    else {displayOperation.innerHTML = inputPrev.toString() + operationValue + input;}

    if ( result && 0 > Number.parseFloat(result) - Number.parseInt(result) < 1 ) {
        if ( result.toString().length > 13 ) {
            result = +result.toString().slice(0,12);
        }
    }

    displayResult.innerHTML = result;

    function checkWidthOverflow(place, fz) { // check overflow of some field & make font a little bit smaller
        place.style.fontSize = fz + 'px';
        let CurrentFontSize = fz;
        while (calcPad.clientWidth*0.97 < place.clientWidth) {
            CurrentFontSize--;
            place.style.fontSize = CurrentFontSize + 'px';
        }
    } // end of checkWidthOverflow()

    checkWidthOverflow(displayOperation, OperationFontSize);
    checkWidthOverflow(displayResult, ResultFontSize);
} // end of showDisplay()

calcPad.addEventListener('click', event => {
    let eventValue = event.target.value,
        eventClass = event.target.className,
        eventBGcolor = event.target.style.background;

    if (eventClass.includes('button')) { // changes BG color of pressed button
        event.target.style.background = '#aaa';
        setTimeout(() => event.target.style.background = eventBGcolor, 99);
    }

    if (eventValue == +eventValue) { // press digit
        if (operationLastPressed && !result) {
        inputPrev = input;
        input = '';
        operationLastPressed = false;
        }
        if (input.length < 11) {
            input += +eventValue;
            showDisplay();
        }
        if (!input) {displayInput.innerHTML = '0';}
        else {displayInput.innerHTML = input;}

    } else if (eventClass.includes('colorOper')) {  // press operation button
        if (result && !operationLastPressed) {
            inputPrev = result;
            showDisplay();
        }
        if (eventValue === '÷') {operation = 'divide'; operationValue = "/";}
        if (eventValue === '×') {operation = 'multiply'; operationValue = "*";}
        if (eventValue === '+') {operation = 'plus'; operationValue = "+";}
        if (eventValue === '-') {operation = 'minus'; operationValue = "-";}
        operationLastPressed = true;
        if (!result) inputPrev = input;
        showDisplay();

    } else if (eventValue == 'C') { // press C button
        input = '';
        inputPrev = '';
        operation = '';
        operationValue = '';
        result = '';
        showDisplay();

    } else if (eventValue == '.') { // press Dot button
        if (!input.split('').find(symb => symb == '.')) {
            if (input.length < 10 && input.length) input += '.';
            showDisplay();
        }

    } else if (eventValue == '±') { // press Plus/minus button
        if (input) {
            if (input.toString().charAt(0) !== "-" ) input = '-' + input.toString();
            else input = input.toString().slice(1);
        }
        showDisplay();

    } else if (eventValue == '=') { // press = button
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
    }

} )