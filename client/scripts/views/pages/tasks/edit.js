import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Tasks from '../../../models/tasks.js';

class Edit extends Component {
    static async getData() {
        this.task = await Tasks.getTask(this.urlParts.id);

        return this.task;
    }

    static async render(task) {
        let html;

        if (this.isEditEnable()) {
            const { id, title, description, dateInsuranceStart } = task;

            html = `
                <h1 class="page-title">Изменить</h1>
                
                <div class="task-edit">
                    <p>
                        <b>Task Title:</b>
                        <input class="task-edit__title" type="text" value="${title}">
                    </p>
                    <p>
                        <b>Описание:</b>
                        <textarea class="task-edit__description">${(description === 'No Description') ? '' : description}</textarea>
                    </p>
                    <p>
                        <b>Начало действия страховки:</b>
                        <input class="task-edit__time add" value="${dateInsuranceStart}" type="date" min="1980-01-01" max="2060-12-31">
                    </p>
            
                    <div class="task-edit__buttons">
                        <button class="task-edit__btn-save button">Сохранить</button>
                        <a class="task-edit__btn-back button" href="#/task/${id}">Назад</a>
                    </div>
                </div>
            `;
        } else {
            html = Error404.render();
        }

        return html;
    }

    static afterRender() {
        this.isEditEnable() && this.setActions();
    }

    static isEditEnable() {
        return !this.task.error &&
            this.task.status !== 'Done' &&
            !location.hash.split(this.urlParts.action)[1];
    }

    static getInsuranceStatus(date) {
        const dateNow = Date.parse(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
        const year = 31525200000;

        if (date + year > dateNow) {
            return 'Действительна';
        } else {
            return 'Истекла';
        }
    }

    static setActions() {
        const taskTitleField = document.getElementsByClassName('task-edit__title')[0],
            taskDescriptionField = document.getElementsByClassName('task-edit__description')[0],
            saveTaskBtn = document.getElementsByClassName('task-edit__btn-save')[0],
            taskTimeInput = document.getElementsByClassName('task-edit__time')[0];

        taskTitleField.onkeyup = () => saveTaskBtn.disabled = !taskTitleField.value.trim();
        saveTaskBtn.onclick = () => this.editTask(taskTitleField, taskDescriptionField, taskTimeInput);
    }

    static async editTask(taskTitleField, taskDescriptionField, taskTimeInput) {
        this.task.title = taskTitleField.value.trim();
        this.task.description = taskDescriptionField.value.trim();
        this.task.dateInsuranceStart = taskTimeInput.value;
        this.task.insurance__status = this.getInsuranceStatus(Date.parse(taskTimeInput.value)); // не меняется статус

        await Tasks.editTask(this.task);

        this.redirectToTaskInfo();
    }

    static redirectToTaskInfo() {
        location.hash = `#/task/${this.task.id}`;
    }
}

export default Edit;