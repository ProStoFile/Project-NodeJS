import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Tasks from '../../../models/tasks.js';

import AddAndList from './add-list.js';

class Warning extends Component {
    static async getData() {
        return await Tasks.getTasksList();
    }

    static async render(tasks) {
        return `
        <div class="tasks__container">
        <div class="warning-tasks__title">
            Авто с просроченной страховкой:
            ${tasks.filter(task => AddAndList.getInsuranceStatus(Date.parse(task.dateInsuranceStart)) === 'Истекла').length}
        </div>
        <div class="tasks">
            <div class="tasks__list expired__insurance">
                ${tasks.filter(task => AddAndList.getInsuranceStatus(Date.parse(task.dateInsuranceStart)) ===
            'Истекла').map(task => AddAndList.getTaskHTML(task)).join('')}
            </div>
        </div>
        <div class="warning-tasks__title">
            Авто с неверными типом шин:
            ${tasks.filter(task => AddAndList.checkTiresStatus(task.tireType) === 'Да').length}
        </div>
        <div class="tasks">
            <div class="tasks__list wrong__tire__type">
                ${tasks.filter(task => AddAndList.checkTiresStatus(task.tireType) === 'Да').map(task => AddAndList.getTaskHTML(task)).join('')}
            </div>
        </div>
    </div>
        `;
    }

}




export default Warning;
