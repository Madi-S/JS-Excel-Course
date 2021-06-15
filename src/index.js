import './scss/index.scss'

import {rootReducer} from '@/redux/rootReducer'
import {createStore} from '@core/createStore'

import {Table} from '@/components/table/Table'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'

import {saveToLocalStorage, getFromLocalStorage} from '@core/utils'


const STATE_KEY = 'excel-state'
const initialState = getFromLocalStorage(STATE_KEY)
const store = createStore(rootReducer, initialState)

store.subscribe(state => {
    console.log('[APP] State:', state)
    saveToLocalStorage(STATE_KEY, state)
})

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()
window.excel = excel