import {Page} from '@core/Page'

import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {normalzieInitialState} from '@/redux/initialState'
import {saveToLocalStorage, getFromLocalStorage, debounce} from '@core/utils'

import {Table} from '@/components/table/Table'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Formula} from '@/components/formula/Formula'
import {Toolbar} from '@/components/toolbar/Toolbar'

export class ExcelPage extends Page {
    getRoot() {
        const params = this.params ? this.params : Date.now().toString()
        const state = getFromLocalStorage(generateStorageName(params))
        const store = createStore(rootReducer, normalzieInitialState(state))
        
        const stateListener = debounce(state => {
            saveToLocalStorage(generateStorageName(params), state)
        }, 300)
        store.subscribe(stateListener)

        this.excel = new Excel({
            components: [Header, Toolbar, Formula, Table],
            store
        })

        return this.excel.getRoot()
    }

    afterRender() {
        this.excel.init()
    }

    destroy() {
        this.excel.shutDown()
    }
}

function generateStorageName(param) {
    return `excel:${param}`
}