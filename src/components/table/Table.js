import {ExcelComponent} from '@/core/ExcelComponent'
import {createTable} from '@/components/table/table.template'

export class Table extends ExcelComponent {
    static className = 'excel__table'
    static name = 'Table'

    constructor($root) {
        super($root, {
            name: Table.name,
            listeners: ['mousedown', 'mouseup', 'mousemove']
        })
    }

    onMousedown(event) {
        this.dragging = true
        console.log('Mousedown', event.target)
    }
    
    onMouseup() {
        this.dragging = false
        console.log('Mouseup')
    }
    
    onMousemove() {
        if (this.dragging) {
            console.log('Mousemove')
        }
    }

    toHTML() {
        return createTable()
    }
}