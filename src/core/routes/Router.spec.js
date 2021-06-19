import {Router} from './Router'


class DashboardMockPage extends Page {}
class ExcelMockPage extends Page {}

describe('Router class', () => {

    let router

    beforeEach(() => {
        router = new Router('#app', {
            excel: 'ExcelPage',
            dashboard: 'DashboardPage',
        })
    })

    test('should be defined', () => {
        expect(router).toBeDefined()
    })

})