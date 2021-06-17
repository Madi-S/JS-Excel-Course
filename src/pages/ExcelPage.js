import {Page} from '@core/Page'

import {STATE_KEY} from '@/constants'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {initialState} from '@/redux/initialState'
import {saveToLocalStorage, debounce} from '@core/utils'

import {Table} from '@/components/table/Table'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Formula} from '@/components/formula/Formula'
import {Toolbar} from '@/components/toolbar/Toolbar'


export class ExcelPage extends Page {
    getRoot() {
        const store = createStore(rootReducer, initialState)
        const stateListener = debounce(state => {
            console.log('[APP] State:', state)
            saveToLocalStorage(STATE_KEY, state)
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
        this.excel.destroy()
    }
}