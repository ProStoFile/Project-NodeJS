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
            <div class="tasks">
                <div class="tasks__list">
                    ${tasks.filter(task => AddAndList.getInsuranceStatus(Date.parse(task.dateInsuranceStart)) === 'Истекла').map(task => AddAndList.getTaskHTML(task)).join('')}
                </div>
            </div>
        `;
    }
}

export default Warning;
