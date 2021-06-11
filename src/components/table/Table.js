import {
    ExcelComponent
} from '@core/ExcelComponent'
import {
    createTable
} from '@/components/table/table.template'
import {
    $
} from '@core/dom'

const DEFAULT_ROW_HEIGHT = 24
const DEFAULT_COL_WIDTH = 120

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
            this.$resize = event.target
            this.resizing = true

            if (resize === 'col') {
                this.colResizing = true

                const cellId = event.target.dataset.cellId

                this.initialCellWidth = event.clientX
                this.$column = event.target.closest('.column')
                this.$cells = this.$root.findAll(`.cell[data-cell-id='${cellId}']`)

            } else if (resize === 'row') {
                this.rowResizing = true

                this.initialCellHeight = event.clientY
                this.$row = event.target.closest('.row')
            }
        }
    }

    onMouseup() {
        this.resizing = false
        this.colResizing = false
        this.rowResizing = false
        try {
            this.$resize.style.opacity = 0
        } catch (e) {
            console.log(e)
        }
    }

    onMousemove(event) {
        if (this.resizing) {
            this.clearSelection()
            this.$resize.style.opacity = 1

            if (this.colResizing) {
                this._colResize(event)
            } else if (this.rowResizing) {
                this._rowReszie(event)
            }
        }
    }

    _rowReszie(event) {
        const finalCellHeight = event.clientY
        const heightDiff = finalCellHeight - this.initialCellHeight

        this.initialCellHeight = finalCellHeight

        let cellHeight = this.$row.style.height
        cellHeight = cellHeight ? pxToInt(cellHeight) : DEFAULT_ROW_HEIGHT
        cellHeight = cellHeight + heightDiff + 'px'

        this.$row.style.height = cellHeight
    }

    _colResize(event) {
        const finalCellWidth = event.clientX
        const widthDiff = finalCellWidth - this.initialCellWidth

        this.initialCellWidth = finalCellWidth

        let cellWidth = this.$column.style.width
        cellWidth = cellWidth ? pxToInt(cellWidth) : DEFAULT_COL_WIDTH

        cellWidth = cellWidth + widthDiff + 'px'
        this.$column.style.width = cellWidth

        for (const $cell of this.$cells) {
            $cell.style.width = cellWidth
        }
    }

    toHTML() {
        return createTable()
    }

    clearSelection() {
        // console.log(this.$root.$el.selection, this.$root.$el.getSelection)
        // if (this.$root.getSelection) {
        //     if (window.getSelection().empty) {
        //         window.getSelection().empty()
        //     } else if (window.getSelection().removeAllRanges) {
        //         window.getSelection().removeAllRanges()
        //     }
        // } else if (this.$root.selection) {
        //     this.$root.selection.empty()
        // }
    }
}

function pxToInt(width) {
    const lastIndex = width.length - 2
    return Number(width.slice(0, lastIndex))
}