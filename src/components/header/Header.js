import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {ExcelComponent} from '@/core/ExcelComponent'
import {createHeader} from '@/components/header/header.template'
import {debounce} from '@core/utils'


export class Header extends ExcelComponent {
    static className = 'excel__header' 
    static name = 'Header'

    constructor($root, options) {
        super($root, {
            name: Header.name,
            listeners: ['click', 'input'],
            ...options
        })
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const {role} = $target.data
            if (role === 'delete') {
                console.log('Deleting')
            } else if (role === 'exit') {
                console.log('Redirecting')
            }
        }
    }

    onInput(event) {
        const $target = $(event.target)
            if ($target.data.role === 'tableName') {
                const value = $target['value']
                this.$dispatch(actions.changeTableName({value}))
            }
        }
        

    toHTML() {
        return createHeader(this.store.getState())
    }
}