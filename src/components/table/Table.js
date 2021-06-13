import {$} from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {clearSelection, pxToInt} from '@/components/table/utils'
import {TableSelection} from '@/components/table/TableSelection'


const DEFAULT_ROW_HEIGHT = 24
const DEFAULT_COL_WIDTH = 120
const DEFAULT_RESIZER_LENGTH = '-10000px'


export class Table extends ExcelComponent {
    static name = 'Table'
    static className = 'excel__table'
    static navigationKeys = ['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft', 'Tab', 'Enter']

    constructor($root, options) {
        super($root, {
            name: Table.name,
            listeners: ['mousedown', 'keydown', 'input', 'click'],
            ...options
        })
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        this.selectFirstCell()
        this.subscribe()        
    }

    selectFirstCell() {
        const $firstCell = this.$root.find('[data-id="0:0"]')
        this.selection.select($firstCell)
        this._onFocus()
    }

    subscribe() {
        this.$on('formula:input', text => {
            this.selection.selected.text = text
        })
        this.$on('formula:enter', () => {
            this.selection.selected.$el.focus()
        })
    }

    toHTML() {
        return createTable()
    }

    onInput(event) {
        const text = event.target.textContent
        this.$emit('table:input', text)
    }
  
    onClick(event) {
        const {role, rowId, colId} = event.target.dataset
        if (role) {
            this._selectRowColCells()
        }
    }

    onKeydown(event) {
        if (this._isNavigation(event)) {
            event.preventDefault()
            const moved = this._handleNavigation(event.key)
            if (moved) {
                this._onFocus()
            }
        }
    }

    onMousedown(event) {
        if (this._isMultipleSelect(event)) {
            this._handleMultipleSelect(event)
            this._onFocus()
            return
        }

        if (this._isSingleSelect(event)) {
            this._handleSingleSelect(event)
            this._onFocus()
            return
        }

        const resize = event.target.dataset.resize
        if (resize) {
            this._handleResize(resize, event)
            return 
        }
    }

    _onFocus() {
        const text = this.selection.selected.$el.textContent
        this.$emit('table:focus', text)
    }

    _isNavigation(event) {
        return Table.navigationKeys.includes(event.key) && !event.shiftKey && ! event.ctrlKey
    }

    _handleNavigation(key) {
        let {rowId, colId} = this.selection.selected.$el.dataset
        rowId = +rowId
        colId = +colId

        if (key === 'ArrowDown' || key === 'Enter') {
            rowId++
        }
        else if (key === 'ArrowUp') {
            rowId--
        }
        else if (key === 'ArrowRight' || key === 'Tab') {
            colId++
        }
        else if (key === 'ArrowLeft') {
            colId--
        }
        
        const $nextCell = this.$root.find(`[data-id="${colId}:${rowId}"]`)
        if ($nextCell.$el) {
            this.selection.select($nextCell)
            return true
        }
    }
 
    _handleMultipleSelect(event) {
        const initialCell = $(event.target)

        document.onmousemove = e => {
            if (event.target.dataset.type === 'cell') {
                const finalCell = $(e.target)
                this.selection.selectFromTo(initialCell, finalCell)
            }
        }
        document.onmouseup = () => document.onmousemove = null 
    }

    _handleSingleSelect(event) {
        const $el = $(event.target)
        this.selection.select($el)
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

    _handleResize(resize, event) {
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
                    $cell.css({'width': this.cellWidth})
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

    _selectRowColCells(event) {
        let cells
        if (role === 'selectCol') {
            cells = this.$root.findAll(`.cell[data-col-id="${colId}"]`) 
        } else if (role === 'selectRow') {
            cells = this.$root.findAll(`.cell[data-row-id="${rowId}"]`)
        }
        this.selection.selectAll(cells)
    }
}