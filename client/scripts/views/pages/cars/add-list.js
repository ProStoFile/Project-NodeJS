import Component from '../../component.js';

import Cars from '../../../models/cars.js';

class AddAndList extends Component {
    static async getData() {
        return await Cars.getCarsList();
    }

    static async render(cars) {
        return `
        
        <div class="modal__window-add__car">
            <div class="modal__window-add__car-content">
                <div class="modal__window-add__car-header">
                    <span class="modal__window-close">&times;</span>
                    <h2>Информация о Вашем авто</h2>
                </div>
                <div class="modal__window-add__car-body">
                    <div class="car-add">
                        <input class="car-add__title add" type="text" placeholder="Модель">
                        <textarea class="car-add__description add" placeholder="Описание"></textarea>
                        <div class="car-add__info">
                            <label>Застрахован</label>
                            <input class="car-add__time add" type="date" min="1980-01-01">
                        </div>
                        <div class="car-add__info">
                            <label>Объем двигателя (л)</label>
                            <input class="car-add__capacity add" type="number" min="1" max="20" step="0.1" value="2.2">   
                        </div>
                        <div class="car-add__info">
                            <label>Израсходовано топлива (л)</label>
                            <input class="car-add__fuel_used add" type="number" min="0" max="50" step="0.1" value="8.0">
                        </div>
                        <div class="car-add__info">
                            <label>Пройденное расстояние (км)</label>
                            <input class="car-add__distance_traveled add" type="number" min="0" max="50" step="0.1" value="7.0">
                        </div>
                        <div class="car-add__info">
                            <label>Стоимость топлива (руб)</label>
                            <input class="car-add__fuel_cost add" type="number" min="0" max="50" step="0.1" value="6.0">
                        </div>
                        <div class="car-add__info">
                            <label>Установлены шины</label>
                            <select class="car-add__tire_type add">
                                <option>Летние</option>
                                <option>Зимние</option>
                            </select>
                        </div>               
                        <button class="car-add__btn-add button" disabled>Добавить</button>
                    </div>
                </div>
            </div>   
        </div> 

        <div class="modal__window-remove__car">
            <div class="modal__window-add__car-content">
                <div class="modal__window-add__car-header">
                    <h2>Желаете удалить?</h2>
                </div>
                <div class="modal__window-remove__car-body">
                    <button class="car-add__btn-cancel button">Нет, отмена</button>
                    <button class="car-add__btn-delete button">Да, удалить</button>
                </div>
            </div>   
        </div> 

        <div class="modal__window-clear__car">
            <div class="modal__window-add__car-content">
                <div class="modal__window-add__car-header">
                    <h2>Очистить весь список?</h2>
                </div>
                <div class="modal__window-remove__car-body">
                    <button class="car-add__btn-back button">Нет, отмена</button>
                    <button class="car-add__btn-clear button">Да, очистить</button>
                </div>
            </div>   
        </div>
    
        <div class="cars">
            <div class="cars__additional">
                <div class="dropdown">
                    <button class="dropbtn button">Сортировать</button>
                        <div class="dropdown-content">
                            <button class="cars__btn-sort dropdown__button">По модели</button>
                            <button class="cars__btn-sort_by_distanceTraveled dropdown__button">По расстоянию</button>
                            <button class="cars__btn-sort_by_totalFuelCost dropdown__button">По затратам<br>на топливо</button>
                        </div>
                    </div>
                    <button class="cars__btn-add button">Добавить</button>                                   
                    <button class="cars__btn-clear button" ${!cars.length ? 'disabled' : ''}>Очистить</button>                  
                </div>               
                <div class="_container">
                    <div class="cars__list">
                        ${cars.map(car => this.getCarHTML(car)).join('')}
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    static afterRender() {
        this.setActions();
    }

    static setActions() {
        const carModelInput = document.getElementsByClassName('car-add__title')[0],
            carDescriptionField = document.getElementsByClassName('car-add__description')[0],

            addCarBtn = document.getElementsByClassName('car-add__btn-add')[0],

            sortCarsListByModelBtn = document.getElementsByClassName('cars__btn-sort')[0],
            sortCarsListBydistanceTraveledBtn = document.getElementsByClassName('cars__btn-sort_by_distanceTraveled')[0],
            sortCarsListByTotalFuelCostBtn = document.getElementsByClassName('cars__btn-sort_by_totalFuelCost')[0],

            carsContainer = document.getElementsByClassName('cars')[0],
            clearCarsListBtn = carsContainer.getElementsByClassName('cars__btn-clear')[0],
            carsList = carsContainer.getElementsByClassName('cars__list')[0],
            carElements = carsList.getElementsByClassName('car__item'),

            dateInsuranceStartInput = document.getElementsByClassName('car-add__time')[0],
            carCapacityInput = document.getElementsByClassName('car-add__capacity')[0],
            carFuelUsedInput = document.getElementsByClassName('car-add__fuel_used')[0],
            carDistancetraveledInput = document.getElementsByClassName('car-add__distance_traveled')[0],
            carFuelCostInput = document.getElementsByClassName('car-add__fuel_cost')[0],
            carTireTypeSelect = document.getElementsByClassName('car-add__tire_type')[0],

            modalAddCarWindow = document.getElementsByClassName('modal__window-add__car')[0],
            modalRemoveCarWindow = document.getElementsByClassName('modal__window-remove__car')[0],
            modalClearCarsListWindow = document.getElementsByClassName('modal__window-clear__car')[0],

            showAddCarWindowBtn = document.getElementsByClassName('cars__btn-add')[0],
            closeModalWindowBtn = document.getElementsByClassName('modal__window-close')[0],
            closeModalWindowRemoveBtn = document.getElementsByClassName('car-add__btn-cancel')[0],
            deledeCarConfirmBtn = document.getElementsByClassName('car-add__btn-delete')[0],
            closeModalWindowClearBtn = document.getElementsByClassName('car-add__btn-back')[0],
            clearCarsListConfirmBtn = document.getElementsByClassName('car-add__btn-clear')[0];

        dateInsuranceStartInput.valueAsDate = new Date();
        dateInsuranceStartInput.max = new Date().toISOString().split('T')[0];

        /* ---------------- Add Modal Window ---------------- */

        showAddCarWindowBtn.addEventListener('click', () => {
            modalAddCarWindow.classList.add('display-block');
        })

        closeModalWindowBtn.addEventListener('click', () => {
            modalAddCarWindow.classList.remove('display-block');
        })

        window.addEventListener('click', (event) => {
            if (event.target == modalAddCarWindow) {
                modalAddCarWindow.classList.remove('display-block');
            }
        })

        /* ---------------- Remove Modal Window ---------------- */

        closeModalWindowRemoveBtn.addEventListener('click', () => {
            modalRemoveCarWindow.classList.remove('display-block');
        })

        deledeCarConfirmBtn.addEventListener('click', () => {
            this.removeTask();
        })

        window.addEventListener('click', (event) => {
            if (event.target == modalRemoveCarWindow) {
                modalRemoveCarWindow.classList.remove('display-block');
            }
        })

        /* ---------------- Clear Modal Window ---------------- */

        closeModalWindowClearBtn.addEventListener('click', () => {
            modalClearCarsListWindow.classList.remove('display-block');
        })

        deledeCarConfirmBtn.addEventListener('click', () => {
            this.clearCarsList();
        })

        window.addEventListener('click', (event) => {
            if (event.target == modalClearCarsListWindow) {
                modalClearCarsListWindow.classList.remove('display-block');
            }
        })

        /* ---------------- Drag'n'Drop ---------------- */

        for (const car of carElements) {
            car.draggable = true;
        }

        carsList.addEventListener('dragstart', (event) => {
            event.target.classList.add('selected');
        });

        carsList.addEventListener('dragend', (event) => {
            this.setCarsOrder();
            event.target.classList.remove('selected');

        });

        carsList.addEventListener('dragover', (event) => {
            event.preventDefault();

            const activeElement = carsList.querySelector('.selected'),
                currentElement = event.target,
                isMoveable = activeElement !== currentElement && currentElement.classList.contains('car__item'),
                nextElement = this.getNextElement(event.clientY, currentElement);

            if (!isMoveable) { return; }

            if (nextElement &&
                activeElement === nextElement.previousElementSibling ||
                activeElement === nextElement
            ) { return; }

            carsList.insertBefore(activeElement, nextElement);
        });

        carModelInput.onkeyup = () => addCarBtn.disabled = !carModelInput.value.trim();
        addCarBtn.onclick = () => this.addCar(
            carModelInput,
            carDescriptionField,
            addCarBtn,
            clearCarsListBtn,
            carsList,
            dateInsuranceStartInput,
            carCapacityInput,
            carFuelUsedInput,
            carDistancetraveledInput,
            carFuelCostInput,
            carTireTypeSelect,
            sortCarsListByModelBtn);

        carsContainer.onclick = event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('cars__btn-clear'):
                    modalClearCarsListWindow.classList.add('display-block');
                    this.clearCarsList(carsList, clearCarsListBtn, clearCarsListConfirmBtn);
                    break;

                case targetClassList.contains('cars__btn-sort'):
                    this.sortCarsListByModel(carsList, sortCarsListByModelBtn);
                    break;

                case targetClassList.contains('cars__btn-sort_by_distanceTraveled'):
                    this.sortCarsListByDistanceTraveled(carsList, sortCarsListBydistanceTraveledBtn);
                    break;

                case targetClassList.contains('cars__btn-sort_by_totalFuelCost'):
                    this.sortCarsListByTotalFuelCost(carsList, sortCarsListByTotalFuelCostBtn);
                    break;

                case targetClassList.contains('car-redirect'):
                    this.redirectToCarInfo(target.dataset.id);
                    break;

                case targetClassList.contains('car__btn-remove'):
                    modalRemoveCarWindow.classList.add('display-block');
                    this.removeCar(carsList, target.parentNode.parentNode, clearCarsListBtn, deledeCarConfirmBtn, closeModalWindowRemoveBtn);
                    break;
            }
        };
    }

    static async addCar(
        carModelInput,
        carDescriptionField,
        addCarBtn,
        clearCarsListBtn,
        carsList,
        dateInsuranceStartInput,
        carCapacityField,
        carFuelUsedField,
        carDistancetraveledField,
        carFuelCostField,
        carTireTypeSelect
    ) {
        let newCar = {
            model: carModelInput.value.trim(),
            description: carDescriptionField.value.trim(),
            dateInsuranceStart: dateInsuranceStartInput.value,
            capacity: carCapacityField.value,
            fuelUsed: carFuelUsedField.value,
            distanceTraveled: carDistancetraveledField.value,
            fuelCost: carFuelCostField.value,
            tireType: carTireTypeSelect.value,
        };

        newCar = await Cars.addCar(newCar);

        this.clearAddCar(carModelInput, carDescriptionField, addCarBtn);
        clearCarsListBtn.disabled && (clearCarsListBtn.disabled = false);

        carsList.insertAdjacentHTML('beforeEnd', this.getCarHTML(newCar));
    }

    static getCarHTML(car) {
        return `
        <div class="car__item">
            
            <div class="car car-redirect" data-id="${car.id}">

            
                <div class="car__title car-redirect" data-id="${car.id}">
                    <div class="car__title-images car-redirect"></div>
                    ${car.model}
                    <div class="car__title-images car-redirect">
                        <a class="car__btn-edit" href="#/car/${car.id}/edit"><img class="car__title-img car__btn-edit" href="#/car/${car.id}/edit" src="styles/img/icons/pencil.png"></a>
                        <img class="car__title-img car__btn-remove" data-id="${car.id}" src="styles/img/icons/bin.png">
                    </div>
   
                </div>                  
                
                <div class="car-content car-redirect" data-id="${car.id}">
                    <div class="car__img-container car-redirect" data-id="${car.id}">
                        <img class="car__img car-redirect" data-id="${car.id}" src="styles/img/car__logo.png">
                    </div>
                    <div class="car-content__params car-redirect" data-id="${car.id}">
                    
					    <div class="car-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="car__params-values car-redirect" data-id="${car.id}">Описание:</b>
					    	<div class="car__params-values car-redirect" data-id="${car.id}">
					    		${car.description}
					    	</div>
					    </div>

                        <div class="car-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="car__params-values car-redirect" data-id="${car.id}">Объем двигателя:</b>
					    	<div class="car__params-values car-redirect" data-id="${car.id}">
					    		${car.capacity}
					    		<p class="car__params-values car-redirect" data-id="${car.id}">л</p>
					    	</div>
					    </div>
                        <div class="car-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="car__params-values car-redirect" data-id="${car.id}">Расход топлива:</b>
					    	<div class="car__params-values car-redirect" data-id="${car.id}">
					    		${car.fuelUsed}
					    		<p class="car__params-values car-redirect" data-id="${car.id}">л</p>
					    	</div>
					    </div>
                        <div class="car-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="car__params-values car-redirect" data-id="${car.id}" data-id="${car.id}">Пройдено:</b>
					    	<div class="car__params-values car-redirect" data-id="${car.id}">
					    		${car.distanceTraveled}
					    		<p class="car__params-values car-redirect" data-id="${car.id}">км</p>
					    	</div>
					    </div>                       
					</div>
                </div>                  
            </div>            
        </div>
        `;
    }

    static getNextElement(cursorPosition, currentElement) {
        const currentElementCoord = currentElement.getBoundingClientRect(),
            currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2,
            nextElement = (cursorPosition < currentElementCenter) ?
                currentElement :
                currentElement.nextElementSibling;

        return nextElement;
    };

    static clearAddTask(carModelInput, carDescriptionField, addCarBtn, clearCarsListConfirmBtn) {

        clearCarsListConfirmBtn.addEventListener('click', () => {
            this.clearCarsList();
        })


        carModelInput.value = '';
        carDescriptionField.value = '';
        addCarBtn.disabled = true;
    }

    static async sortCarsListByModel(carsList) {

        carsList.innerHTML = '';
        await Cars.sortCarsListByModel();
        const cars = await Cars.getCarsList();
        const length = cars.length;

        for (let i = 0; i < length; i++) {
            carsList.insertAdjacentHTML('beforeEnd', this.getCarHTML(cars[i]));
        }

    }

    static async sortCarsListByDistanceTraveled(carsList) {

        carsList.innerHTML = '';
        await Cars.sortCarsListByDistanceTraveled();
        const cars = await Cars.getCarsList();
        const length = cars.length;

        for (let i = 0; i < length; i++) {
            carsList.insertAdjacentHTML('beforeEnd', this.getCarHTML(cars[i]));
        }

    }

    static async sortCarsListByTotalFuelCost(carsList) {

        carsList.innerHTML = '';
        await Cars.sortCarsListByTotalFuelCost();
        const cars = await Cars.getCarsList();
        const length = cars.length;

        for (let i = 0; i < length; i++) {
            carsList.insertAdjacentHTML('beforeEnd', this.getCarHTML(cars[i]));
        }

    }

    static async setCarsOrder() {
        const carsElements = document.getElementsByClassName('car'),
            carsOrder = [];
        for (const id of carsElements) {
            carsOrder.push(id.getAttribute('data-id'));
        }
        await Cars.setCarsOrder(carsOrder);
    }


    static clearCarsList(carsList, clearCarsListBtn, clearCarsListConfirmBtn) {

        clearCarsListConfirmBtn.addEventListener('click', () => {
            clearCarsListBtn.disabled = true;
            carsList.innerHTML = '';

            Cars.clearCarsList();
        })
    }

    static redirectToCarInfo(id) {
        location.hash = `#/car/${id}`;
    }

    static changeDateFormat(date) {
        return date.split('-').reverse().join('.');
    }

    static getInsuranceStatus(date) {
        const dateNow = Date.parse(`
        ${new Date().getFullYear()}-
        ${new Date().getMonth() + 1}-
        ${new Date().getDate()}`),
            year = 31525200000;
        return (date + year > dateNow) ? 'Действительна' : 'Истекла';
    }

    static getDaysInsuranceValidityLeft(date) {
        const dateStart = new Date(date),
            dateEnd = new Date(`
            ${dateStart.getFullYear() + 1}-
            ${dateStart.getMonth() + 1}-
            ${dateStart.getDate()}
            `),
            dateNow = new Date(`
            ${new Date().getFullYear()}-
            ${new Date().getMonth() + 1}-
            ${new Date().getDate()}
            `),
            oneDay = 1000 * 60 * 60 * 24,
            diffInTime = dateEnd.getTime() - dateNow.getTime(),
            diffInDays = Math.round(diffInTime / oneDay);

        return diffInDays;
    }

    static getWordDaysForm(number) {

        if (number % 100 > 10 &&
            number % 100 < 20 ||
            number % 10 == 0) {
            return 'дней';
        } else if (number % 10 == 1) {
            return 'день';
        } else if (number % 10 > 1 &&
            number % 10 < 5) {
            return 'дня';
        } else {
            return 'дней';
        }
    }

    static removeCar(
        carsList,
        taskContainer,
        clearCarsListBtn,
        deledeCarConfirmBtn,
        closeModalWindowRemoveBtn
    ) {
        deledeCarConfirmBtn.addEventListener('click', () => {
            taskContainer.remove();
            !carsList.children.length && (clearCarsListBtn.disabled = true);
            Cars.removeSelectedCar(taskContainer.dataset);
        })

        closeModalWindowRemoveBtn.addEventListener('click', () => {
            modalAddCarWindow.classList.remove('display-block');
        })

    }

    static checkTiresStatus(tireType) {
        return (new Date().getMonth() > 10 && tireType === 'Зимние' ||
            new Date().getMonth() < 2 && tireType === 'Зимние' ||
            new Date().getMonth() < 11 && tireType === 'Летние' ||
            new Date().getMonth() > 1 && tireType === 'Летние') ? 'Нет' : 'Да';
    }
}

export default AddAndList;