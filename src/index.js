import './scss/index.scss'

import {rootReducer } from '@/redux/rootReducer'
import {createStore} from '@core/createStore'

import {Table} from '@/components/table/Table'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'

const store = createStore(rootReducer, {
    tableTitle: 'New Table',
    colState: {},
    rowState: {},
})

const excel = new Excel('#app', {
    components: [Header, Toolbar, Formula, Table],
    store
})

excel.render()
window.excel = excel