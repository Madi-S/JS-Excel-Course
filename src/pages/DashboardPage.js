import {$} from '@core/dom'
import {Page} from '@core/Page'

export class DashboardPage extends Page {
    getRoot() {
        const $el = $.create('div', 'db')
        $el.html = `
        <div class="db__header">
            <h1>Excel Dashboard</h1>
        </div>

        <div class="db__new">
            <div class="db__view">
                <a href="#" class="db__create">
                    New <br /> Table
                </a>
            </div>
        </div>

        <div class="db__table db__view">

            <div class="db__list-header">
                <span>Table name</span>
                <span>Last opened</span>
            </div>

            <ul class="db__list">
                <li class="db__record">
                    <a href="#">Some table</a>
                    <strong>09.06.2021</strong>
                </li>
                <li class="db__record">
                    <a href="#">Some table</a>
                    <strong>09.06.2021</strong>
                </li>
                <li class="db__record">
                    <a href="#">Some table</a>
                    <strong>09.06.2021</strong>
                </li>
                <li class="db__record">
                    <a href="#">Some table</a>
                    <strong>09.06.2021</strong>
                </li>
            </ul>

        </div>`
        return $el
    }
}
