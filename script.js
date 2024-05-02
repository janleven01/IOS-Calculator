class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()

    }

    clear(){
        this.currentOperand = ""
        this.previousOperand = ""
        this.operator = undefined
    }

    appendNumber(number){
        if (number === "." && this.currentOperand.includes(".")) return
        if (number === "." && this.currentOperand === ""){
            return this.currentOperand = 0 + "."
        }
        if (this.afterRes === 1){
            this.currentOperand = number
            this.afterRes = 0
        } else this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    compute(){
        let afterRes = 0
        this.afterRes = afterRes
        let computation 
        const curr = parseFloat(this.currentOperand)
        const prev = parseFloat(this.previousOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch(this.operator){
            case "+":
                computation = prev + curr
                break
            case "-":
                computation = prev - curr
                break
            case "×":
                computation = prev * curr
                break
            case "÷":
                computation = prev / curr
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operator = undefined
        this.previousOperand = ""
        this.afterRes = 1
    }
    chooseOperation(operator){
        if (this.operator === undefined && this.currentOperand === "")
            this.currentOperand = 0
        if (this.previousOperand !== "" && this.currentOperand !== ""){
            this.compute()
        }
        this.operator = operator
        if (this.operator !== undefined && this.currentOperand === ""){
            this.currentOperand = this.previousOperand
        }
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            }) 
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    chooseFunction(operatorFunc){
        let result 
        this.operatorFunc = operatorFunc
        switch(this.operatorFunc){
            case "+/-":
                result = -this.currentOperand
                break
            case "%":
                result = this.currentOperand / 100
        }
        this.currentOperand = result
    }
    
    updateDisplay(){
                    
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.currentOperand > 9){
            this.currentOperand = this.currentOperand.toString()
            this.currentOperand = this.currentOperand.slice(0,9)
        }
        if (this.operator != null){
            this.currentOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)}`
        }
        if (this.currentOperand !== ""){
            this.currentOperandTextElement.innerText =
            `${this.getDisplayNumber(this.currentOperand)}`
        }
        if (this.currentOperand === "" && this.previousOperand === ""){
            this.currentOperandTextElement.innerText = 0
        }
    }
}

//DOM elements
const numberButtons = document.querySelectorAll('[data-number]') 
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const pmButton = document.querySelectorAll('[data-function]')
const clearButton = document.querySelector('[data-all-clear]')

const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

pmButton.forEach(button => {
    button.addEventListener('click', () =>{
    calculator.chooseFunction(button.innerText)
    calculator.updateDisplay()
    })
})

clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

