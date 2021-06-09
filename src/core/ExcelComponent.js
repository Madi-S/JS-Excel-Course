import {
    DOMListener
} from '@core/DOMListener'

export class ExcelComponent extends DOMListener {

    constructor($root, options = {}) {
        super($root, options.listeners)
    }

    // Returns component's HTML template
    toHTML() {
        return ''
    }

    // Must be called after HTML DOM is rendered
    init() {
        this.initDOMListeners()
    }
}