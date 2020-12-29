const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const percentButton = document.querySelector('[data-percent]');
const deleteButton = document.querySelector('[data-all-clear]');
const result = document.querySelector('[data-result]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

function Calculator(previousOperandText, currentOperandText, result) {
    this.previousOperandText = previousOperandText;
    this.currentOperandText = currentOperandText;
    this.result = result;

    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.resulting = '';
    this.exspression = '';

    this.showResult = function () {
        if (!this.currentOperand) return;
        this.previousOperandText.innerText = `${this.expression}${this.currentOperand} `;
        this.currentOperandText.innerText = '';
        this.result.innerText = this.resulting;
        this.currentOperand = '';
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
        if (this.currentOperand === '0' && this.currentOperand.length > 0)
            return;
        if (this.currentOperand.length < 9) {
            this.currentOperand =
                this.currentOperand.toString() + number.toString();
        }
    };

    this.chooseOperation = function (operation) {
        if (!this.currentOperand) return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand + this.operation;
        this.currentOperand = '';
        this.expression = this.previousOperand;
    };

    this.compute = function () {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '/':
                computation = prev / current;
                break;
            default:
                return;
        }

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

let calculator = new Calculator(
    previousOperandText,
    currentOperandText,
    result
);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

deleteButton.addEventListener('click', () => {
    calculator.clearAll();
    calculator.updateDisplay();
});

percentButton.addEventListener('click', () => {
    calculator.computePercent();
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.showResult();
});
