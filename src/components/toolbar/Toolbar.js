import {$} from '@core/dom'
import {ExcelComponent} from '@core/ExcelComponent'
import {createToolbar} from '@/components/toolbar/toolbar.template'

export class Toolbar extends ExcelComponent {
    static className = 'excel__toolbar'
    static name = 'Toolbar'

    constructor($root, options) {
        super($root, {
            name: Toolbar.name,
            listeners: ['click'],
            ...options
        })
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.type === 'button') {
            const css = JSON.parse($target.data.value)
            const $btn = $($target.closest('.button'))

            console.log(css, $target, $btn)
            console.log($btn.clasess)

            // $btn.addClasses('active')
            $btn.removeClasses('active')
        }
    }

    toHTML() {
        return createToolbar()
    }
}