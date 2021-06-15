import {$} from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'


export class Formula extends ExcelComponent {
    static className = 'excel__formula' 
    static name = 'Formula'

    constructor($root, options) {
        super($root, {
            name: Formula.name,
            listeners: ['input', 'keydown'],
            subscribe: ['currentText'],
            ...options
        })
    }

    init() {
        super.init()

        this.$formulaInput = $('#formulaInput')
        this.$on('table:focus', text => this._changeText(text))
    }

    toHTML() {
        return `
        <div class="info">Fx</div>
        <div class="input" id="formulaInput" contenteditable spellcheck="false"></div>`
    }

    onInput(event) {
        const text = event.target.textContent
        this.$emit('formula:input', text)
    }

    onKeydown(event) {
        if (event.key === 'Enter' || event.key === 'Tab') {
            event.preventDefault()
            this.$emit('formula:enter')
        }
    }

    storeChanged({currentText}) {
        this.$formulaInput.text = currentText
    }

    _changeText(text) {
        this.$formulaInput.text = text
    }
}