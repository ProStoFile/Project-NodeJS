import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Tasks from '../../../models/tasks.js';

import AddAndList from './add-list.js';

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
                tireType } = task;

            html = `
                <h1 class="page-title">Изменить</h1>
                
    <div class="_container">
        <div class="task-edit">
            <div class="task-edit__params">
                <div class="task-edit__params-container">
                    <b>Модель:</b>
                    <div>
                        <input class="task-edit__title" type="text" value="${title}">
                    </div>
                </div>

                <div class="task-edit__params-container">
                    <b>Описание:</b>
                    <div>
                        <textarea class="task-edit__description">${(description === 'No Description') ? '' : description}
                        </textarea>
                    </div>
                </div>

                <div class="task-edit__params-container">
                    <b>Застрахован:</b>
                    <div>
                        <input class="task-edit__time" value="${dateInsuranceStart}" type="date" min="1980-01-01"
                            max="2060-12-31">
                    </div>
                </div>

                <div class="task-edit__params-container">
                    <b>Объем двигателя (л):</b>
                    <div>
                        <input class="task-add__capacity" type="number" min="1" max="20" step="0.1" value="${capacity}">
                    </div>
                </div>

                <div class="task-edit__params-container">
                    <b>Расход топлива (л):</b>
                    <div>
                        <input class="task-add__fuel_used" type="number" min="0" max="50" step="0.1"
                            value="${fuelUsed}">
                    </div>
                </div>

                <div class="task-edit__params-container">
                    <b>Пройдено (км):</b>
                    <div>
                        <input class="task-add__distance_traveled" type="number" min="0" max="50" step="0.1"
                            value="${distanceTraveled}">
                    </div>
                </div>

                <div class="task-edit__params-container">
                    <b>Стоимость топлива (₽):</b>
                    <div>
                        <input class="task-add__fuel_cost" type="number" min="0" max="50" step="0.1"
                            value="${fuelCost}">
                    </div>
                </div>

                <div class="task-edit__params-container">
					<b>Установлены шины:</b>
                    <select class="task-add__tire_type">
                        <option>Летние</option>
                        <option>Зимние</option>
                    </select>
				</div>

                <div class="task-edit__buttons">
                    <div class="task-edit__buttons-container">
                        <a class="task-edit__btn-back button" href="#/task/${id}">Вернуться</a>
                        <button class="task-edit__btn-save button">Сохранить</button>
                    </div>
                </div>

            </div>

            

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

    // static getInsuranceStatus(date) {
    //     const dateNow = Date.parse(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
    //     const year = 31525200000;

    //     if (date + year > dateNow) {
    //         return 'Действительна';
    //     } else {
    //         return 'Истекла';
    //     }
    // }

    // static getDaysInsuranceValidityLeft(date) {
    //     const dateStart = new Date(date),
    //         dateEnd = new Date(`
    //         ${dateStart.getFullYear() + 1}-
    //         ${dateStart.getMonth() + 1}-
    //         ${dateStart.getDate()}
    //         `),
    //         dateNow = new Date(`
    //         ${new Date().getFullYear()}-
    //         ${new Date().getMonth() + 1}-
    //         ${new Date().getDate()}
    //         `),
    //         oneDay = 1000 * 60 * 60 * 24,
    //         diffInTime = dateEnd.getTime() - dateNow.getTime(),
    //         diffInDays = Math.round(diffInTime / oneDay);
    //     return diffInDays;
    // }

    static setActions() {
        const taskTitleField = document.getElementsByClassName('task-edit__title')[0],
            taskDescriptionField = document.getElementsByClassName('task-edit__description')[0],
            taskTimeInput = document.getElementsByClassName('task-edit__time')[0],
            inputCapacity = document.getElementsByClassName('task-add__capacity')[0],
            fuelUsedInput = document.getElementsByClassName('task-add__fuel_used')[0],
            distanceTraveledInput = document.getElementsByClassName('task-add__distance_traveled')[0],
            taskTireTypeSelect = document.getElementsByClassName('task-add__tire_type')[0],

            saveTaskBtn = document.getElementsByClassName('task-edit__btn-save')[0];

        taskTitleField.onkeyup = () => saveTaskBtn.disabled = !taskTitleField.value.trim();
        saveTaskBtn.onclick = () => this.editTask(taskTitleField,
            taskDescriptionField,
            taskTimeInput,
            inputCapacity,
            fuelUsedInput,
            distanceTraveledInput,
            taskTireTypeSelect);
    }

    static async editTask(taskTitleField,
        taskDescriptionField,
        taskTimeInput,
        inputCapacity,
        fuelUsedInput,
        distanceTraveledInput,
        taskTireTypeSelect) {
        this.task.title = taskTitleField.value.trim();
        this.task.description = taskDescriptionField.value.trim();
        this.task.dateInsuranceStart = taskTimeInput.value;
        this.task.insuranceStatus = AddAndList.getInsuranceStatus(Date.parse(taskTimeInput.value));
        this.task.capacity = inputCapacity.value;
        this.task.fuelUsed = fuelUsedInput.value;
        this.task.distanceTraveled = distanceTraveledInput.value;
        this.task.tireType = taskTireTypeSelect.value;
        await Tasks.editTask(this.task);

        this.redirectToTaskInfo();
    }

    static redirectToTaskInfo() {
        location.hash = `#/task/${this.task.id}`;
    }
}

export default Edit;