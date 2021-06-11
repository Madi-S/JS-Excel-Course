import {$} from '@core/dom'

export class TableSelection {
    constructor() {
        this.group = []
    }

    onClick(event) {
        console.log('clicking', event.target.dataset)
        if (event.target.dataset.id) {
            const $el = $(event.target)
            this.select($el)
        }
    }

    // $el must be DOM instance
    select($el) {
        this.group.push($el)
        $el.addClasses(['selected'])
    }

    selectGroup($els) {

    }
}