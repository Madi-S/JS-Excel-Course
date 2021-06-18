import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'
import {StoreSubscriber} from '@/core/StoreSubscriber'

export class Excel {
    constructor(options) {
        this.store = options.store
        this.emitter = new Emitter()
        this.components = options.components || []
        this.subscriber = new StoreSubscriber(this.store)
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

    init() {
        if (process.env.NODE_ENV === 'production') {
            document.addEventListener('contextmenu', preventDefault)
        }
        this._addEventListeners()
        this.subscriber.subscribeComponents(this.components)
        this.components.forEach(component => component.init())
    }

    _addEventListeners() {
        document.addEventListener('paste', preventFormattedPaste)
    }

    shutDown() {
        this.subscriber.unsubscribeFromStore()
        this.components.forEach(component => component.destroy())
        document.removeEventListener('paste', preventFormattedPaste)
        document.removeEventListener('contextmenu', preventDefault)
    }
}


function preventFormattedPaste(event) {
    event.preventDefault()
    const text = event.clipboardData.getData('text/plain') || ''
    document.execCommand('insertText', false, text.trim())
}

function preventDefault(event) {
    event.preventDefault()
}