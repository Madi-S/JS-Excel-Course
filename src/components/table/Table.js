import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {clearSelection, pxToInt} from '@/components/table/utils'
import {TableSelection} from '@/components/table/TableSelection'
import {$} from '@core/dom'


const DEFAULT_ROW_HEIGHT = 24
const DEFAULT_COL_WIDTH = 120
const DEFAULT_RESIZER_LENGTH = '-10000px'


export class Table extends ExcelComponent {
    static className = 'excel__table'
    static name = 'Table'

    constructor($root) {
        super($root, {
            name: Table.name,
            listeners: ['mousedown', 'keydown']
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

    onKeyDown(event) {
        
    }

    onMousedown(event) {
        console.log('mouse', event)

        if (this._isMultipleSelect(event)) {
            const initialCell = $(event.target)

            document.onmousemove = e => {
                if (event.target.dataset.type === 'cell') {
                    const finalCell = $(e.target)
                    this.selection.selectGroup(initialCell, finalCell)
                }
                
            }
            document.onmouseup = () => document.onmousemove = null 
            return
        }

        if (this._isSingleSelect(event)) {
            const $el = $(event.target)
            this.selection.select($el)
            return
        }

        const resize = event.target.dataset.resize
        if (resize) {
            const $resizer = event.target
            const isRowResize = resize === 'row'
            const isColResize = resize === 'col' 

            if (isRowResize) {
                this.initialCellHeight = event.clientY
                this.$row = event.target.closest('.row')

                document.onmousemove = e => {
                    $resizer.style.opacity = 1
                    $resizer.style.right = DEFAULT_RESIZER_LENGTH
                    clearSelection()
                    this._resizeRow(e)
                }

            } else if (isColResize) {
                this.initialCellWidth = event.clientX
                this.$column = event.target.closest('.column')                
            }

            document.onmousemove = e => {
                clearSelection()
                $resizer.style.opacity = 1
                
                if (isRowResize) {
                    $resizer.style.right = DEFAULT_RESIZER_LENGTH
                    this._resizeRow(e)
                } else if (isColResize) {
                    $resizer.style.bottom = DEFAULT_RESIZER_LENGTH
                    this._resizeCol(e)
                }                
            }

            document.onmouseup = e => {
                if (this.cellWidth) {
                    const colId = event.target.dataset.colId
                    const $cells = this.$root.findAll(`.cell[data-col-id='${colId}']`)
                    for (const $cell of $cells) {
                        $cell.style.width = this.cellWidth
                    }
                }
                this.cellWidth = null

                $resizer.style.opacity = null
                $resizer.style.right = null
                $resizer.style.bottom = null
                document.onmousemove = null
                document.onmouseup = null
            }
        }
    }

    _isSingleSelect(e) {
        return e.target.dataset.type === 'cell'
    }

    _isMultipleSelect(e) {
        return e.shiftKey && e.target.dataset.type === 'cell'
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