import Component from '../../component.js';

import Cars from '../../../models/cars.js';

class AddAndList extends Component {
    static async getData() {
        return await Cars.getCarsList();
    }

    static async render(cars) {
        return `
        
        <div class="modal__window-add__task">
            <div class="modal__window-add__task-content">
                <div class="modal__window-add__task-header">
                    <span class="modal__window-close">&times;</span>
                    <h2>Информация о Вашем авто</h2>
                </div>
                <div class="modal__window-add__task-body">
                    <div class="task-add">
                        <input class="task-add__title add" type="text" placeholder="Модель">
                        <textarea class="task-add__description add" placeholder="Описание"></textarea>
                        <div class="task-add__info">
                            <label>Застрахован</label>
                            <input class="task-add__time add" type="date" min="1980-01-01">
                        </div>
                        <div class="task-add__info">
                            <label>Объем двигателя (л)</label>
                            <input class="task-add__capacity add" type="number" min="1" max="20" step="0.1" value="2.2">   
                        </div>
                        <div class="task-add__info">
                            <label>Израсходовано топлива (л)</label>
                            <input class="task-add__fuel_used add" type="number" min="0" max="50" step="0.1" value="8.0">
                        </div>
                        <div class="task-add__info">
                            <label>Пройденное расстояние (км)</label>
                            <input class="task-add__distance_traveled add" type="number" min="0" max="50" step="0.1" value="7.0">
                        </div>
                        <div class="task-add__info">
                            <label>Стоимость топлива (руб)</label>
                            <input class="task-add__fuel_cost add" type="number" min="0" max="50" step="0.1" value="6.0">
                        </div>
                        <div class="task-add__info">
                            <label>Установлены шины</label>
                            <select class="task-add__tire_type add">
                                <option>Летние</option>
                                <option>Зимние</option>
                            </select>
                        </div>               
                        <button class="task-add__btn-add button" disabled>Добавить</button>
                    </div>
                </div>
            </div>   
        </div> 

        <div class="modal__window-remove__task">
            <div class="modal__window-add__task-content">
                <div class="modal__window-add__task-header">
                    <h2>Желаете удалить?</h2>
                </div>
                <div class="modal__window-remove__task-body">
                    <button class="task-add__btn-cancel button">Нет, отмена</button>
                    <button class="task-add__btn-delete button">Да, удалить</button>
                </div>
            </div>   
        </div> 

        <div class="modal__window-clear__task">
            <div class="modal__window-add__task-content">
                <div class="modal__window-add__task-header">
                    <h2>Очистить весь список?</h2>
                </div>
                <div class="modal__window-remove__task-body">
                    <button class="task-add__btn-back button">Нет, отмена</button>
                    <button class="task-add__btn-clear button">Да, очистить</button>
                </div>
            </div>   
        </div>
    
        <div class="tasks">
            <div class="tasks__additional">
                <div class="dropdown">
                    <button class="dropbtn button">Сортировать</button>
                        <div class="dropdown-content">
                            <button class="tasks__btn-sort dropdown__button">По модели</button>
                            <button class="tasks__btn-sort_by_distanceTraveled dropdown__button">По расстоянию</button>
                            <button class="tasks__btn-sort_by_totalFuelCost dropdown__button">По затратам<br>на топливо</button>
                        </div>
                    </div>
                    <button class="tasks__btn-add button">Добавить</button>                                   
                    <button class="tasks__btn-clear button" ${!cars.length ? 'disabled' : ''}>Очистить</button>                  
                </div>               
                <div class="_container">
                    <div class="tasks__list">
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
        const carModelField = document.getElementsByClassName('task-add__title')[0],
            carDescriptionField = document.getElementsByClassName('task-add__description')[0],

            addCarBtn = document.getElementsByClassName('task-add__btn-add')[0],

            sortCarsListByModelBtn = document.getElementsByClassName('tasks__btn-sort')[0],
            sortCarsListBydistanceTraveledBtn = document.getElementsByClassName('tasks__btn-sort_by_distanceTraveled')[0],
            sortCarsListByTotalFuelCostBtn = document.getElementsByClassName('tasks__btn-sort_by_totalFuelCost')[0],

            carsContainer = document.getElementsByClassName('tasks')[0],
            clearCarsListBtn = carsContainer.getElementsByClassName('tasks__btn-clear')[0],
            carsList = carsContainer.getElementsByClassName('tasks__list')[0],
            carElements = carsList.getElementsByClassName('task__item'),

            carTimeField = document.getElementsByClassName('task-add__time')[0],
            carCapacityField = document.getElementsByClassName('task-add__capacity')[0],
            carFuelUsedField = document.getElementsByClassName('task-add__fuel_used')[0],
            carDistancetraveledField = document.getElementsByClassName('task-add__distance_traveled')[0],
            carFuelCostField = document.getElementsByClassName('task-add__fuel_cost')[0],
            carTireTypeSelect = document.getElementsByClassName('task-add__tire_type')[0],

            modalAddCarWindow = document.getElementsByClassName('modal__window-add__task')[0],
            modalRemoveCarWindow = document.getElementsByClassName('modal__window-remove__task')[0],
            modalClearTasksListWindow = document.getElementsByClassName('modal__window-clear__task')[0],

            showAddCarWindowBtn = document.getElementsByClassName('tasks__btn-add')[0],
            closeModalWindowBtn = document.getElementsByClassName('modal__window-close')[0],
            closeModalWindowRemoveBtn = document.getElementsByClassName('task-add__btn-cancel')[0],
            deledeCarConfirmBtn = document.getElementsByClassName('task-add__btn-delete')[0],
            closeModalWindowClearBtn = document.getElementsByClassName('task-add__btn-back')[0],
            clearCarsListConfirmBtn = document.getElementsByClassName('task-add__btn-clear')[0];

        carTimeField.valueAsDate = new Date();
        carTimeField.max = new Date().toISOString().split('T')[0];

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
            modalClearTasksListWindow.classList.remove('display-block');
        })

        deledeCarConfirmBtn.addEventListener('click', () => {
            this.clearCarsList();
        })

        window.addEventListener('click', (event) => {
            if (event.target == modalClearTasksListWindow) {
                modalClearTasksListWindow.classList.remove('display-block');
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
                isMoveable = activeElement !== currentElement && currentElement.classList.contains('task__item'),
                nextElement = this.getNextElement(event.clientY, currentElement);

            if (!isMoveable) { return; }

            if (nextElement &&
                activeElement === nextElement.previousElementSibling ||
                activeElement === nextElement
            ) { return; }

            carsList.insertBefore(activeElement, nextElement);
        });

        carModelField.onkeyup = () => addCarBtn.disabled = !carModelField.value.trim();
        addCarBtn.onclick = () => this.addCar(
            carModelField,
            carDescriptionField,
            addCarBtn,
            clearCarsListBtn,
            carsList,
            carTimeField,
            carCapacityField,
            carFuelUsedField,
            carDistancetraveledField,
            carFuelCostField,
            carTireTypeSelect,
            sortCarsListByModelBtn);

        carsContainer.onclick = event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('tasks__btn-clear'):
                    modalClearTasksListWindow.classList.add('display-block');
                    this.clearCarsList(carsList, clearCarsListBtn, clearCarsListConfirmBtn);
                    break;

                case targetClassList.contains('tasks__btn-sort'):
                    this.sortCarsListByModel(carsList, sortCarsListByModelBtn);
                    break;

                case targetClassList.contains('tasks__btn-sort_by_distanceTraveled'):
                    this.sortCarsListByDistanceTraveled(carsList, sortCarsListBydistanceTraveledBtn);
                    break;

                case targetClassList.contains('tasks__btn-sort_by_totalFuelCost'):
                    this.sortCarsListByTotalFuelCost(carsList, sortCarsListByTotalFuelCostBtn);
                    break;

                case targetClassList.contains('car-redirect'):
                    this.redirectToCarInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task__btn-remove'):
                    modalRemoveCarWindow.classList.add('display-block');
                    this.removeCar(carsList, target.parentNode.parentNode, clearCarsListBtn, deledeCarConfirmBtn, closeModalWindowRemoveBtn);
                    break;
            }
        };
    }

    static async addCar(
        carModelField,
        carDescriptionField,
        addCarBtn,
        clearCarsListBtn,
        carsList,
        carTimeField,
        carCapacityField,
        carFuelUsedField,
        carDistancetraveledField,
        carFuelCostField,
        carTireTypeSelect
    ) {
        let newCar = {
            model: carModelField.value.trim(),
            description: carDescriptionField.value.trim(),
            dateInsuranceStart: carTimeField.value,
            capacity: carCapacityField.value,
            fuelUsed: carFuelUsedField.value,
            distanceTraveled: carDistancetraveledField.value,
            fuelCost: carFuelCostField.value,
            tireType: carTireTypeSelect.value,
        };

        newCar = await Cars.addCar(newCar);

        this.clearAddCar(carModelField, carDescriptionField, addCarBtn);
        clearCarsListBtn.disabled && (clearCarsListBtn.disabled = false);

        carsList.insertAdjacentHTML('beforeEnd', this.getCarHTML(newCar));
    }

    static getCarHTML(car) {
        return `
        <div class="task__item">
            
            <div class="task car-redirect" data-id="${car.id}">

            
                <div class="task__title car-redirect" data-id="${car.id}">
                    <div class="task__title-images car-redirect"></div>
                    ${car.model}
                    <div class="task__title-images car-redirect">
                        <a class="task__btn-edit" href="#/car/${car.id}/edit"><img class="task__title-img task__btn-edit" href="#/car/${car.id}/edit" src="styles/img/icons/pencil.png"></a>
                        <img class="task__title-img task__btn-remove" data-id="${car.id}" src="styles/img/icons/bin.png">
                    </div>
   
                </div>                  
                
                <div class="task-content car-redirect" data-id="${car.id}">
                    <div class="task__img-container car-redirect" data-id="${car.id}">
                        <img class="task__img car-redirect" data-id="${car.id}" src="styles/img/task__logo.png">
                    </div>
                    <div class="task-content__params car-redirect" data-id="${car.id}">
                    
					    <div class="task-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="task__params-values car-redirect" data-id="${car.id}">Описание:</b>
					    	<div class="task__params-values car-redirect" data-id="${car.id}">
					    		${car.description}
					    	</div>
					    </div>

                        <div class="task-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="task__params-values car-redirect" data-id="${car.id}">Объем двигателя:</b>
					    	<div class="task__params-values car-redirect" data-id="${car.id}">
					    		${car.capacity}
					    		<p class="task__params-values car-redirect" data-id="${car.id}">л</p>
					    	</div>
					    </div>
                        <div class="task-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="task__params-values car-redirect" data-id="${car.id}">Расход топлива:</b>
					    	<div class="task__params-values car-redirect" data-id="${car.id}">
					    		${car.fuelUsed}
					    		<p class="task__params-values car-redirect" data-id="${car.id}">л</p>
					    	</div>
					    </div>
                        <div class="task-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="task__params-values car-redirect" data-id="${car.id}" data-id="${car.id}">Пройдено:</b>
					    	<div class="task__params-values car-redirect" data-id="${car.id}">
					    		${car.distanceTraveled}
					    		<p class="task__params-values car-redirect" data-id="${car.id}">км</p>
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

    static clearAddTask(carModelField, carDescriptionField, addCarBtn, clearCarsListConfirmBtn) {

        clearCarsListConfirmBtn.addEventListener('click', () => {
            this.clearCarsList();
        })


        carModelField.value = '';
        carDescriptionField.value = '';
        addCarBtn.disabled = true;
    }

    static async sortCarsListByModel(carsList) {

        carsList.innerHTML = '';
        await Cars.sortCarsListByModel();
        const cars = await Cars.getCarsList();
        const length = cars.length;

        for (let i = 0; i < length; i++) {
            carsList.insertAdjacentHTML('beforeEnd', this.getCarsHTML(cars[i]));
        }

    }

    static async sortCarsListByDistanceTraveled(carsList) {

        carsList.innerHTML = '';
        await Cars.sortCarsListByDistanceTraveled();
        const cars = await Cars.getCarsList();
        const length = cars.length;

        for (let i = 0; i < length; i++) {
            carsList.insertAdjacentHTML('beforeEnd', this.getCarsHTML(cars[i]));
        }

    }

    static async sortCarsListByTotalFuelCost(carsList) {

        carsList.innerHTML = '';
        await Cars.sortCarsListByTotalFuelCost();
        const cars = await Cars.getCarsList();
        const length = cars.length;

        for (let i = 0; i < length; i++) {
            carsList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(cars[i]));
        }

    }

    static async setCarsOrder() {
        const tasksElements = document.getElementsByClassName('task'),
            carsOrder = [];
        for (const id of tasksElements) {
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