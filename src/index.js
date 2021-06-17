import './scss/index.scss'

import {STATE_KEY} from '@/constants'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {initialState} from '@/redux/initialState'

import {Table} from '@/components/table/Table'
import {Excel} from '@/components/excel/Excel'
import {Header} from '@/components/header/Header'
import {Formula} from '@/components/formula/Formula'
import {Toolbar} from '@/components/toolbar/Toolbar'

import {saveToLocalStorage, debounce} from '@core/utils'
import {Router} from '@core/routes/Router'

new Router('#app', {

})
// const store = createStore(rootReducer, initialState)
// const stateListener = debounce(state => {
//     console.log('[APP] State:', state)
//     saveToLocalStorage(STATE_KEY, state)
// }, 300)
// store.subscribe(stateListener)

// const excel = new Excel('#app', {
//     components: [Header, Toolbar, Formula, Table],
//     store
// })

// excel.render()
// window.excel = excel