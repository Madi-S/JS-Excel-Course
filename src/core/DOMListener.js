import {
    capitalize
} from '@core/utils'

export class DOMListener {
    constructor($root, listeners = []) {
        if (!$root) {
            throw new Error('No $root provided for DOMListener')
        }
        this.$root = $root
        this.listeners = listeners
    }

    initDOMListeners() {
        this.listeners.forEach(listener => {
            const callback = getCallbackName(listener)
            if (!this[callback]) {
                throw new Error(`${callback} method is not implemented in ${this.name} component`)
            }
            this[callback] = this[callback].bind(this)
            this.$root.on(listener, this[callback])
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const callback = getCallbackName(listener)
            this.$root.off(listener, this[callback])
        })
    }
}

function getCallbackName(listener) {
    return 'on' + capitalize(listener)
}