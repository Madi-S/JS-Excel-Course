import {$} from '@core/dom'
import {DEFAULT_STYLES} from '@/constants'
import {ExcelStateComponent} from '@core/ExcelStateComponent'
import {createToolbar} from '@/components/toolbar/toolbar.template'


export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'
    static name = 'Toolbar'

    constructor($root, options) {
        super($root, {
            name: Toolbar.name,
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        this.initState(DEFAULT_STYLES)
    }
    
    get template() {
        return createToolbar(this.state)
    }
    
    toHTML() {
        return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const css = JSON.parse($target.data.value)
            const btn = $target.closest('.button')
            this._toggleBtn(btn)
            this.$emit('toolbar:applyState', css)
        }
    }

    _toggleBtn(btn) {
        if (btn.classList.contains('active')) {
            btn.classList.remove('active')
        } else btn.classList.add('active')
    }
}