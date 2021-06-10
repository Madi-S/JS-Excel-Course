import {ExcelComponent} from '@/core/ExcelComponent'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    static name = 'Table'

    constructor($root) {
        super($root, {
            name: Table.name,
            listeners: ['click']
        })
    }

    onClick() {
        console.log('Clicked Table')
    }

    toHTML() {
        return `
        <div class="row">
            <div class="row-info">

            </div>

            <div class="row-data">
                <div class="column">
                    A
                </div>
                <div class="column">
                    B
                </div>
                <div class="column">
                    C
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="row-info">
                1
            </div>

            <div class="row-data">
                <div class="cell selected" contenteditable spellcheck="false">lorem</div>
                <div class="cell" contenteditable spellcheck="false">lorem</div>
                <div class="cell" contenteditable spellcheck="false">lorem</div>
            </div>
        </div>

        <div class="row">
            <div class="row-info">
                2
            </div>

            <div class="row-data">
                <div class="cell" contenteditable spellcheck="false">lorem</div>
                <div class="cell" contenteditable spellcheck="false">lorem</div>
                <div class="cell" contenteditable spellcheck="false">lorem</div>
            </div>
        </div>`
    }
}