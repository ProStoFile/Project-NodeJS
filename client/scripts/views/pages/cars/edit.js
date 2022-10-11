import Component from '../../../views/component.js';

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
            model,
            description,
            capacity,
            dateInsuranceStart,
            fuelUsed,
            distanceTraveled,
            fuelCost } = car;

        html = `
                <h1 class="page-title">Изменить</h1>              
                <div class="_container">
                    <div class="car-edit">
                        <div class="car-edit__params">
                            <div class="car-edit__params-container">
                                <div>
				                    <img class="params-icon" src="styles/img/icons/params/car.png">
                                    <b>Модель:</b>
                                </div>
                                <div>
                                    <input class="car-edit__title" type="text" value="${model}">
                                </div>
                            </div>
                            <div class="car-edit__params-container">
                                <div>
                                    <img class="params-icon" src="styles/img/icons/params/document.png">
                                    <b>Описание:</b>
                                </div>
                                <div>
                                    <textarea class="car-edit__description">
                                        ${(description === 'No Description') ? '' : description}
                                    </textarea>
                                </div>
                            </div>
                            <div class="car-edit__params-container">
                                <div>
					                <img class="params-icon" src="styles/img/icons/params/calendar.png">
                                    <b>Застрахован:</b>
                                </div>
                                <div>
                                    <input class="car-edit__time" value="${dateInsuranceStart}" type="date" min="1980-01-01" max="2060-12-31">
                                </div>
                            </div>
                            <div class="car-edit__params-container">
                                <div>
				                    <img class="params-icon" src="styles/img/icons/params/car-engine.png">
                                    <b>Объем двигателя (л):</b>
                                </div>
                                <div>
                                    <input class="car-add__capacity" type="number" min="1" max="20" step="0.1" value="${capacity}">
                                </div>
                            </div>
                            <div class="car-edit__params-container">
                                <div>
					                <img class="params-icon" src="styles/img/icons/params/petrol.png">
                                    <b>Расход топлива (л):</b>
                                </div>
                                <div>
                                    <input class="car-add__fuel_used" type="number" min="0" max="50" step="0.1" value="${fuelUsed}">
                                </div>
                            </div>
                            <div class="car-edit__params-container">
                                <div>
					                <img class="params-icon" src="styles/img/icons/params/road.png">
                                    <b>Пройдено (км):</b>
                                </div>
                                <div>
                                    <input class="car-add__distance_traveled" type="number" min="0" max="50" step="0.1" value="${distanceTraveled}">
                                </div>
                            </div>
                            <div class="car-edit__params-container">
                                <div>
				            	    <img class="params-icon" src="styles/img/icons/params/salary.png">
                                    <b>Стоимость топлива (₽):</b>
                                </div>
                                <div>
                                    <input class="car-add__fuel_cost" type="number" min="0" max="50" step="0.1"
                                        value="${fuelCost}">
                                </div>
                            </div>
                            <div class="car-edit__params-container">
                                <div>
				            		<img class="params-icon" src="styles/img/icons/params/wheel.png">
				            	    <b>Установлены шины:</b>
                                </div>
                                <select class="car-add__tire_type">
                                    <option>Летние</option>
                                    <option>Зимние</option>
                                </select>
				            </div>
                            <div class="car-edit__buttons">
                                <div class="car-edit__buttons-container">
                                    <a class="car-edit__btn-back button" href="#/car/${id}">Вернуться</a>
                                    <button class="car-edit__btn-save button">Сохранить</button>
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
        const carModelInput = document.getElementsByClassName('car-edit__title')[0],
            carDescriptionField = document.getElementsByClassName('car-edit__description')[0],
            dateInsuranceStartInput = document.getElementsByClassName('car-edit__time')[0],
            carCapacityInput = document.getElementsByClassName('car-add__capacity')[0],
            carFuelUsedInput = document.getElementsByClassName('car-add__fuel_used')[0],
            carFuelCostInput = document.getElementsByClassName('car-add__fuel_cost')[0],
            carDistancetraveledInput = document.getElementsByClassName('car-add__distance_traveled')[0],
            carTireTypeSelect = document.getElementsByClassName('car-add__tire_type')[0],

            saveCarBtn = document.getElementsByClassName('car-edit__btn-save')[0];

        dateInsuranceStartInput.max = new Date().toISOString().split('T')[0];

        carModelInput.onkeyup = () => saveCarBtn.disabled = !carModelInput.value.trim();
        saveCarBtn.onclick = () => this.editCar(
            carModelInput,
            carDescriptionField,
            dateInsuranceStartInput,
            carCapacityInput,
            carFuelCostInput,
            carFuelUsedInput,
            carDistancetraveledInput,
            carTireTypeSelect
        );
    }

    static async editCar(carModelInput,
        carDescriptionField,
        dateInsuranceStartInput,
        carCapacityInput,
        carFuelCostInput,
        carFuelUsedInput,
        carDistancetraveledInput,
        carTireTypeSelect) {
        this.car.model = carModelInput.value.trim();
        this.car.description = carDescriptionField.value.trim();
        this.car.dateInsuranceStart = dateInsuranceStartInput.value;
        this.car.insuranceStatus = AddAndList.getInsuranceStatus(Date.parse(dateInsuranceStartInput.value));
        this.car.capacity = carCapacityInput.value;
        this.car.fuelCost = carFuelCostInput.value;
        this.car.fuelUsed = carFuelUsedInput.value;
        this.car.distanceTraveled = carDistancetraveledInput.value;
        this.car.tireType = carTireTypeSelect.value;
        await Cars.editCar(this.car);

        this.redirectToCarInfo();
    }

    static redirectToCarInfo() {
        location.hash = `#/car/${this.car.id}`;
    }
}

export default Edit;