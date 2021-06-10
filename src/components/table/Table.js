import {ExcelComponent} from '@/core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

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
        return createTable(5, 5)
    }
}