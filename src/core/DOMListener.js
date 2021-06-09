import {capitalize} from '@core/utils'

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
            const callback = this._getCallback(listener)
            this.$root.on(listener, callback)
        })
    }

    removeDOMListeners() {
        this.listeners.forEach(listener => {
            const callback = this._getCallback(listener)
            this.$root.off(listener, callback)
        })
    }

    _getCallback(listener) {
        const callback = getCallbackName(listener)
            if (!this[callback]) {
                throw new Error(`${callback} method is not implemented in ${this.__proto__.constructor.name} component`)
        }
        return this[callback].bind(this)
    }
}

function getCallbackName(listener) {
    return 'on' + capitalize(listener)
}