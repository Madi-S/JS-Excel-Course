import {
    ExcelComponent
} from '@/core/ExcelComponent'
import {
    createTable
} from '@/components/table/table.template'

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
        const resize = event.target.dataset.resize
        if (resize) {
            const cellId = event.target.dataset.cellId

            this.resizing = true
            this.initialCellWidth = event.clientX
            this.column = event.target.parentElement
            this.cells = document.querySelectorAll(`.cell[data-cell-id='${cellId}']`)
        }
    }

    onMouseup(event) {
        this.resizing = false
    }

    onMousemove(event) {
        if (this.resizing) {
            this.clearSelection()

            const finalCellWidth = event.clientX
            const widthDiff = finalCellWidth - this.initialCellWidth

            this.initialCellWidth = finalCellWidth

            let cellWidth = this.column.style.width
            if (cellWidth) {
                cellWidth = widthToInt(cellWidth)
            } else {
                cellWidth = 120
            }

            cellWidth = cellWidth + widthDiff + 'px'
            this.column.style.width = cellWidth

            for (const cell of this.cells) {
                cell.style.width = cellWidth
            }
        }
    }

    toHTML() {
        return createTable(5, 3)
    }

    clearSelection() {
        if (window.getSelection) {
            if (window.getSelection().empty) {
                window.getSelection().empty()
            } else if (window.getSelection().removeAllRanges) {
                window.getSelection().removeAllRanges()
            }
        } else if (document.selection) {
            document.selection.empty()
        }
    }
}

function widthToInt(width) {
    const lastIndex = width.length - 2
    return Number(width.slice(0, lastIndex))
}