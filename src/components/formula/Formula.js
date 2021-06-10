import {ExcelComponent} from '@/core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula' 
    static name = 'Formula'

    constructor($root) {
        super($root, {
            name: Formula.name,
            listeners: ['input', 'click']
        })
    }

    toHTML() {
        return `
        <div class="info">Fx</div>
        <div class="input" contenteditable spellcheck="false"></div>`
    }

    onInput(event) {
        console.log(Formula.name, 'onInput', event, this.$root)
    }

    onClick(event) {
        console.log(Formula.name, 'onClick', event, this.$root)
    }
}