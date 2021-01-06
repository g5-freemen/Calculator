let result = document.querySelector('.calc-display--result'),
    previousOperandText = document.querySelector('.calc-display--operation'),
    currentOperandText = document.querySelector('.calc-display--input'),
    calcPad = document.querySelector('.calc-pad');

const ResultFontSize = parseFloat(document.defaultView.getComputedStyle(result).fontSize);
const PrevFontSize = parseFloat(document.defaultView.getComputedStyle(previousOperandText).fontSize);
const InputFontSize = parseFloat(document.defaultView.getComputedStyle(currentOperandText).fontSize);

const maxDigits = 10;

//#region Functions
function Calculator(previousOperandText, currentOperandText, result) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.result = result;

    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.resulting = '';
    this.expression = '';

    this.showResult = function () {
        if (!this.currentOperand) return;
        this.previousOperandText.innerText = `${this.expression}${this.currentOperand} `;
        this.currentOperandText.innerText = '';
        this.result.innerText = this.resulting;
        this.currentOperand = '';

        function checkWidthOverflow(place, fz) { // check overflow & make font smaller if needed
            place.style.fontSize = fz + 'px';
            let CurrentFontSize = fz;
            while (calcPad.clientWidth*0.96 < place.clientWidth) {
                CurrentFontSize--;
                place.style.fontSize = CurrentFontSize + 'px';
            }
        } // end of checkWidthOverflow()

        checkWidthOverflow(currentOperandText, InputFontSize);
        checkWidthOverflow(previousOperandText, PrevFontSize);
        checkWidthOverflow(result, ResultFontSize);
    };

    this.clearAll = function () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.resulting = '';
    };

    this.computePercent = function () {
        if (!this.currentOperand) return;
        this.previousOperandText.innerText = `${this.expression}${this.currentOperand}%`;
        this.currentOperandText.innerText = '';
        this.x = eval(
            parseFloat(this.expression) +
                this.operation +
                (parseFloat(this.expression) / 100) *
                    parseFloat(this.currentOperand)
        );

        this.result.innerText = this.x;
        this.currentOperand = '';
    };

    this.appendNumber = function (number) {
        this.resulting = '';
        this.result.innerText = this.resulting;
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number === '0') return;
        if (this.currentOperand.length <= maxDigits) {
            if (number === '.' && !this.currentOperand) { this.currentOperand = '0' }
            this.currentOperand += number.toString();
        }
    };

    this.reverse = function () {
        if (this.currentOperand.includes('-') ) {
            this.currentOperand = this.currentOperand.replace("-", "");
        } else if (this.currentOperand) {
            this.currentOperand = '-' + this.currentOperand;
        };
        this.currentOperandText.innerText = this.currentOperand;
    }

    this.chooseOperation = function (operation) {
        if (!this.currentOperand) this.currentOperand = '0';

        if (this.previousOperand) calculator.compute();

        if (result.innerText) {
            alert(result.innerText)
            this.previousOperand = result.innerText + operation;
            this.previousOperandText.innerText = this.previousOperand;
        } else {
            this.previousOperand = this.currentOperand + operation;
        }
        this.operation = operation;
        this.currentOperand = '';
        this.expression = this.previousOperand;
    };

    this.compute = function () {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        if (this.operation == '+') computation = prev + current;
        if (this.operation == '-') computation = prev - current;
        if (this.operation == '×') computation = prev * current;
        if (this.operation == '÷') computation = prev / current;

        this.resulting = computation;
        this.operation = undefined;
        this.previousOperand = '';
    };

    this.updateDisplay = function () {
        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
        this.result.innerText = this.resulting;
    };
}
//#endregion

setInterval(() => {
    if (!currentOperandText.innerText) currentOperandText.innerText = '0';   
}, 66);

window.addEventListener('resize', () => { location.reload() } ); // reload page on resize/rotate

let calculator = new Calculator( previousOperandText, currentOperandText, result );

//#region Keyboard Listener
document.addEventListener('keydown', event => { // keyboard listener
    if (event.key == +event.key || event.key == '.' ) { // press digit or . button on keyboard
        calculator.appendNumber( event.key );
        calculator.updateDisplay();

    } else if (event.key.match(/[\*\+/-]/)) { // press +-/* button on keyboard
        calculator.chooseOperation(event.key);
        calculator.updateDisplay();
    
    } else if (event.key == '=') { // press = button on keyboard
        calculator.compute();
        calculator.showResult();
    
    } else if (event.key == 'Escape') { // press ESC button on keyboard
        calculator.clearAll();
        calculator.updateDisplay();
    }
} ); 
//#endregion

//#region (mouse) Clicks Listener
calcPad.addEventListener('click', event => { // mouse clicks listener
    let eventValue = event.target.value,
        eventBGcolor = event.target.style.background;

    if (event.target.className.includes('button')) { // changes BG color of pressed button for 99 ms
        event.target.style.background = '#bbb';
        setTimeout(() => event.target.style.background = eventBGcolor, 99);
    } else return;

    if (eventValue == +eventValue || eventValue == '.') { // click digit or .
        calculator.appendNumber(eventValue);
        calculator.updateDisplay();

    } else if (event.target.className.includes('colorOper')) {  // click operation button
        calculator.chooseOperation(eventValue);
        calculator.updateDisplay();

    } else if (eventValue == 'C') { // click C button
        calculator.clearAll();
        calculator.updateDisplay();

    } else if (eventValue == '%') { // click % button
        calculator.computePercent();
        
    } else if (eventValue == '±') { // click Plus/minus button
        calculator.reverse();
        calculator.updateDisplay();

    } else if (eventValue == '=') { // click = button
        calculator.compute();
        calculator.showResult();
    }
} );
 //#endregion