import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'

export class Excel {
    constructor(selector, options) {
        this.$el = $(selector)
        this.store = options.store
        this.emitter = new Emitter()
        this.components = options.components || []
    }

    getRoot() {
        const $root = $.create('div', 'excel')
        const componentOptions = {
            emitter: this.emitter,
            store: this.store
        }

        this.components = this.components.map(Component => {
            const $el = $.create('div', Component.className)
            const component = new Component($el, componentOptions)
            
            $el.html = component.toHTML()
            $root.append($el)
            return component
        })
        return $root
    }

    render() {
        this.$el.append(this.getRoot())
        this._init()
        this.components.forEach(component => component.init())
    }

    _init() {
        this.$el.on('paste', this._preventFormattedPaste)
    }

    _preventFormattedPaste(event) {
        document.addEventListener('paste', event => {
            event.preventDefault()
            const text = event.clipboardData.getData('text/plain') || ''
            document.execCommand('insertText', false, text.trim())
        })
    }

    shutDown() {
        this.components.forEach(component => component.destroy())
        this.$el.off('paste')
    }
}