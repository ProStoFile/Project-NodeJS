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
            const { id,
                title,
                description,
                capacity,
                dateInsuranceStart,
                fuelUsed,
                distanceTraveled,
                fuelCost,
                totalFuelUsed,
                totalFuelCost,
                insuranceStatus } = task;

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
                        <input class="task-edit__time" value="${dateInsuranceStart}" type="date" min="1980-01-01" max="2060-12-31">
                    </p>
                    <p>
                        <b>Объем:</b>
                        <input class="task-add__capacity" type="number" min="1" max="20" step="0.1" value="${capacity}">
                    </p>
                    <p>
                        <b>Расход топлива:</b>
                        <input class="task-add__fuel_used" type="number" min="0" max="50" step="0.1" value="${fuelUsed}">
                    </p>
                    <p>
                        <b>Пройденное расстояние:</b>
                        <input class="task-add__distance_traveled" type="number" min="0" max="50" step="0.1" value="${distanceTraveled}">
                    </p>
                    <p>
                        <b>Стоимость топлива:</b>
                        <input class="task-add__fuel_cost add" type="number" min="0" max="50" step="0.1" value="${fuelCost}">
                    </p>
                    <p>
                        <b>Израсходовано топлива:</b>
                        <b>${totalFuelUsed}</b>
                    </p>
                    <p>
                        <b>Затраты на топливо:</b>
                        <b>${totalFuelCost}</b>
                    </p>
                    <p>
                        <b>Статус страховки:</b>
                        <b>${insuranceStatus}</b>
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
            taskTimeInput = document.getElementsByClassName('task-edit__time')[0],
            inputCapacity = document.getElementsByClassName('task-add__capacity')[0],
            fuelUsedInput = document.getElementsByClassName('task-add__fuel_used')[0],
            distanceTraveledInput = document.getElementsByClassName('task-add__distance_traveled')[0],

            saveTaskBtn = document.getElementsByClassName('task-edit__btn-save')[0];

        taskTitleField.onkeyup = () => saveTaskBtn.disabled = !taskTitleField.value.trim();
        saveTaskBtn.onclick = () => this.editTask(taskTitleField,
            taskDescriptionField,
            taskTimeInput,
            inputCapacity,
            fuelUsedInput,
            distanceTraveledInput);
    }

    static async editTask(taskTitleField,
        taskDescriptionField,
        taskTimeInput,
        inputCapacity,
        fuelUsedInput,
        distanceTraveledInput) {
        this.task.title = taskTitleField.value.trim();
        this.task.description = taskDescriptionField.value.trim();
        this.task.dateInsuranceStart = taskTimeInput.value;
        this.task.insuranceStatus = this.getInsuranceStatus(Date.parse(taskTimeInput.value));
        this.task.capacity = inputCapacity.value;
        this.task.fuelUsed = fuelUsedInput.value;
        this.task.distanceTraveled = distanceTraveledInput.value;

        await Tasks.editTask(this.task);

        this.redirectToTaskInfo();
    }

    static redirectToTaskInfo() {
        location.hash = `#/task/${this.task.id}`;
    }
}

export default Edit;