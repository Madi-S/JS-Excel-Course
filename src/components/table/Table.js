import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {clearSelection, pxToInt} from '@/components/table/utils'
import {TableSelection} from '@/components/table/TableSelection'


const DEFAULT_ROW_HEIGHT = 24
const DEFAULT_COL_WIDTH = 120
const DEFAULT_RESIZER_LENGTH = '-10000px'


export class Table extends ExcelComponent {
    static className = 'excel__table'
    static name = 'Table'

    constructor($root) {
        super($root, {
            name: Table.name,
            listeners: ['mousedown', 'click']
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        const $firstCell = this.$root.find('[data-id="0:0"]')
        this.selection.select($firstCell)
    }

    onClick(event) {
        console.log('Inside')
        this.selection.onClick(event)
    }

    onMousedown(event) {
        const resize = event.target.dataset.resize

        if (resize) {
            const $resizer = event.target

            if (resize === 'row') {
                this.initialCellHeight = event.clientY
                this.$row = event.target.closest('.row')

                document.onmousemove = e => {
                    $resizer.style.opacity = 1
                    $resizer.style.right = DEFAULT_RESIZER_LENGTH
                    clearSelection()
                    this._resizeRow(e)
                }

                document.onmouseup = e => {
                    $resizer.style.opacity = null
                    $resizer.style.right = null
                    document.onmousemove = null
                    document.onmouseup = null
                }

            } else if (resize == 'col') {
                this.initialCellWidth = event.clientX
                this.$column = event.target.closest('.column')

                document.onmousemove = e => {
                    $resizer.style.opacity = 1
                    $resizer.style.bottom = DEFAULT_RESIZER_LENGTH
                    clearSelection()
                    this._resizeCol(e)
                }

                document.onmouseup = e => {
                    const colId = event.target.dataset.colId
                    const $cells = this.$root.findAll(`.cell[data-col-id='${colId}']`)
                    for (const $cell of $cells) {
                        $cell.style.width = this.cellWidth
                    }

                    $resizer.style.opacity = null
                    $resizer.style.bottom = null
                    document.onmousemove = null
                    document.onmouseup = null
                }
            }
        }
    }

    _resizeCol(e) {
        const finalCellWidth = e.clientX
        const widthDiff = finalCellWidth - this.initialCellWidth

        this.initialCellWidth = finalCellWidth

        let cellWidth = this.$column.style.width
        cellWidth = cellWidth ? pxToInt(cellWidth) : DEFAULT_COL_WIDTH
        this.cellWidth = cellWidth + widthDiff + 'px'

        this.$column.style.width = this.cellWidth
    }

    _resizeRow(e) {
        const finalCellHeight = e.clientY
        const heightDiff = finalCellHeight - this.initialCellHeight

        this.initialCellHeight = finalCellHeight

        let cellHeight = this.$row.style.height
        cellHeight = cellHeight ? pxToInt(cellHeight) : DEFAULT_ROW_HEIGHT
        cellHeight = cellHeight + heightDiff + 'px'

        this.$row.style.height = cellHeight
    }

    toHTML() {
        return createTable()
    }
}