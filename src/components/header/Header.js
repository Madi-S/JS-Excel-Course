import {ExcelComponent} from '@/core/ExcelComponent'

export class Header extends ExcelComponent {
    static className = 'excel__header' 
    static name = 'Header'

    constructor($root, options) {
        super($root, {
            name: Header.name,
            listeners: ['click'],
            ...options
        })
    }

    onClick() {
        console.log('Clicked Header')
    }

    toHTML() {
        return `
        <input type="text" value="New table" class="input" />

        <div>
            <div class="button">
                <span class="material-icons">
                    delete
                </span>
            </div>

            <div class="button">
                <span class="material-icons">
                    exit_to_app
                </span>
            </div>
        </div>`
    }
}