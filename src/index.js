import './scss/index.scss'

import {Router} from '@core/routes/Router'
import {ExcelPage} from '@/pages/ExcelPage'
import {DashboardPage} from '@/pages/DashboardPage'


new Router('#app', {
    excel: ExcelPage,
    dashboard: DashboardPage,
})