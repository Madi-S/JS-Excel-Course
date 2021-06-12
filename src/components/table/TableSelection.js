import {$} from '@core/dom'

export class TableSelection {
    
    static CLASS_NAME = 'selected'
    
    constructor() {
        this.group = []
        this.selected = null
    }

    // $el must be DOM instance
    select($el) {
        this.clear()

        $el.$el.focus()
        $el.addClasses(TableSelection.CLASS_NAME)
        this.group.push($el)
        this.selected = $el
    }

    selectGroup($first, $last) {
        const [minX, maxX, minY, maxY] = TableSelection.getBoundaries($first, $last)
        this.clear()

        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                const $cell = $(TableSelection.findCell(x, y))
                $cell.addClasses(TableSelection.CLASS_NAME)
                this.group.push($cell)
            }
        }
        this.selected = this.group[0]
        this.selected.$el.focus()
    }

    clear() {
        this.group.forEach($el => $el.removeClasses(TableSelection.CLASS_NAME))
        this.group = []
        this.selected = null
    }

    static findCell(x, y) {
        return document.querySelector(`.cell[data-id="${x}:${y}"]`)
    }

    static getBoundaries($first, $last) {
        const colRange = [+$first.$el.dataset.colId, +$last.$el.dataset.colId]
        const colLower = Math.min(...colRange)
        const colUpper = Math.max(...colRange)

        const rowRange = [+$first.$el.dataset.rowId, +$last.$el.dataset.rowId] 
        const rowLower = Math.min(...rowRange)
        const rowUpper = Math.max(...rowRange) 

        return [colLower, colUpper, rowLower, rowUpper]
    }
}