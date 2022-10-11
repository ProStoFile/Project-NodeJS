import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Cars from '../../../models/cars.js';

import AddAndList from './add-list.js';

class Edit extends Component {
    static async getData() {
        this.car = await Cars.getCar(this.urlParts.id);

        return this.car;
    }

    static async render(car) {
        let html;

        const { id,
            title,
            description,
            capacity,
            dateInsuranceStart,
            fuelUsed,
            distanceTraveled,
            fuelCost } = car;

        html = `
                <h1 class="page-title">Изменить</h1>              
                <div class="_container">
                    <div class="task-edit">
                        <div class="task-edit__params">
                            <div class="task-edit__params-container">
                                <div>
				                    <img class="params-icon" src="styles/img/icons/params/car.png">
                                    <b>Модель:</b>
                                </div>
                                <div>
                                    <input class="task-edit__title" type="text" value="${title}">
                                </div>
                            </div>
                            <div class="task-edit__params-container">
                                <div>
                                    <img class="params-icon" src="styles/img/icons/params/document.png">
                                    <b>Описание:</b>
                                </div>
                                <div>
                                    <textarea class="task-edit__description">
                                        ${(description === 'No Description') ? '' : description}
                                    </textarea>
                                </div>
                            </div>
                            <div class="task-edit__params-container">
                                <div>
					                <img class="params-icon" src="styles/img/icons/params/calendar.png">
                                    <b>Застрахован:</b>
                                </div>
                                <div>
                                    <input class="task-edit__time" value="${dateInsuranceStart}" type="date" min="1980-01-01" max="2060-12-31">
                                </div>
                            </div>
                            <div class="task-edit__params-container">
                                <div>
				                    <img class="params-icon" src="styles/img/icons/params/car-engine.png">
                                    <b>Объем двигателя (л):</b>
                                </div>
                                <div>
                                    <input class="task-add__capacity" type="number" min="1" max="20" step="0.1" value="${capacity}">
                                </div>
                            </div>
                            <div class="task-edit__params-container">
                                <div>
					                <img class="params-icon" src="styles/img/icons/params/petrol.png">
                                    <b>Расход топлива (л):</b>
                                </div>
                                <div>
                                    <input class="task-add__fuel_used" type="number" min="0" max="50" step="0.1" value="${fuelUsed}">
                                </div>
                            </div>
                            <div class="task-edit__params-container">
                                <div>
					                <img class="params-icon" src="styles/img/icons/params/road.png">
                                    <b>Пройдено (км):</b>
                                </div>
                                <div>
                                    <input class="task-add__distance_traveled" type="number" min="0" max="50" step="0.1" value="${distanceTraveled}">
                                </div>
                            </div>
                            <div class="task-edit__params-container">
                                <div>
				            	    <img class="params-icon" src="styles/img/icons/params/salary.png">
                                    <b>Стоимость топлива (₽):</b>
                                </div>
                                <div>
                                    <input class="task-add__fuel_cost" type="number" min="0" max="50" step="0.1"
                                        value="${fuelCost}">
                                </div>
                            </div>
                            <div class="task-edit__params-container">
                                <div>
				            		<img class="params-icon" src="styles/img/icons/params/wheel.png">
				            	    <b>Установлены шины:</b>
                                </div>
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

        return html;
    }

    static afterRender() {
        this.setActions();
    }

    static setActions() {
        const taskTitleField = document.getElementsByClassName('task-edit__title')[0],
            taskDescriptionField = document.getElementsByClassName('task-edit__description')[0],
            taskTimeInput = document.getElementsByClassName('task-edit__time')[0],
            inputCapacity = document.getElementsByClassName('task-add__capacity')[0],
            fuelUsedInput = document.getElementsByClassName('task-add__fuel_used')[0],
            fuelCostInput = document.getElementsByClassName('task-add__fuel_cost')[0],
            distanceTraveledInput = document.getElementsByClassName('task-add__distance_traveled')[0],
            taskTireTypeSelect = document.getElementsByClassName('task-add__tire_type')[0],

            saveTaskBtn = document.getElementsByClassName('task-edit__btn-save')[0];

        taskTitleField.onkeyup = () => saveTaskBtn.disabled = !taskTitleField.value.trim();
        saveTaskBtn.onclick = () => this.editCar(taskTitleField,
            taskDescriptionField,
            taskTimeInput,
            inputCapacity,
            fuelCostInput,
            fuelUsedInput,
            distanceTraveledInput,
            taskTireTypeSelect);
    }

    static async editCar(taskTitleField,
        taskDescriptionField,
        taskTimeInput,
        inputCapacity,
        fuelCostInput,
        fuelUsedInput,
        distanceTraveledInput,
        taskTireTypeSelect) {
        this.car.title = taskTitleField.value.trim();
        this.car.description = taskDescriptionField.value.trim();
        this.car.dateInsuranceStart = taskTimeInput.value;
        this.car.insuranceStatus = AddAndList.getInsuranceStatus(Date.parse(taskTimeInput.value));
        this.car.capacity = inputCapacity.value;
        this.car.fuelCost = fuelCostInput.value;
        this.car.fuelUsed = fuelUsedInput.value;
        this.car.distanceTraveled = distanceTraveledInput.value;
        this.car.tireType = taskTireTypeSelect.value;
        await Cars.editCar(this.car);

        this.redirectToCarInfo();
    }

    static redirectToCarInfo() {
        location.hash = `#/car/${this.car.id}`;
    }
}

export default Edit;