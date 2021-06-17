import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/ActiveRoute'

export class Router {
    constructor(selector, routes) {
        if (!selector) {
            throw new Error('Selector is missing in Router')
        }

        this.$placeholder = $(selector)
        this.routes = routes

        this.changePageHandler = this.changePageHandler.bind(this)
        this.init()
    }

    init() {
        window.addEventListener('hashchange', this.changePageHandler)
        this.changePageHandler()
    }

    destroy() {
        window.removeEventListener('hashchange', this.changePageHandler)
    }
    
    changePageHandler() {
        this.clearPage()

        const path = ActiveRoute.path
        let Page = null
        if (path === 'excel') {
            Page = this.routes.excel
        } else if (path === 'dashboard') {
            Page = this.routes.dashboard
        }

        if (Page) {
            const page = new Page()
            this.$placeholder.append(page.getRoot())        
            page.afterRender()
        }

    }

    clearPage() {
        this.$placeholder.clear()
    }
}