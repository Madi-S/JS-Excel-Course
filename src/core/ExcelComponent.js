import {DOMListener} from '@core/DOMListener'

export class ExcelComponent extends DOMListener {

    constructor($root, options = {}) {
        super($root, options.listeners)
        this.emitter = options.emitter
        this.name = options.name
        this.unsubs = []

        this.prepare()
    }

    // Configures component before init
    prepare() {}

    // Returns component's HTML template
    toHTML() {
        return ''
    }

    // Notifying subscribers of occurred event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }
    
    // Subscribing on event
    $on(event, func) {
        const unsub = this.emitter.subscribe(event, func)
        this.unsubs.push(unsub)
    }

    // Initializes component (must be called after HTML DOM is rendered)
    // Adding DOM listeners
    init() {
        this.initDOMListeners()
    }

    // Destroying component
    // Removing DOM listeners
    destroy() {
        this.unsubs.forEach(unsub => unsub())
        this.removeDOMListeners()
    }
}