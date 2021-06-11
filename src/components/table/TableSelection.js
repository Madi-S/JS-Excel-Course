import {$} from '@core/dom'

export class TableSelection {
    
    static CLASS_NAME = 'selected'
    
    constructor() {
        this.group = []
    }

    // $el must be DOM instance
    select($el) {
        this.clear()

        $el.addClasses(TableSelection.CLASS_NAME)
        this.group.push($el)
    }

    selectGroup($els) {

    }

    clear() {
        this.group.forEach($el => $el.removeClasses(TableSelection.CLASS_NAME))
        this.group = []
    }
}