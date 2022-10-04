import Component from '../../../views/component.js';

import Tasks from '../../../models/tasks.js';

class AddAndList extends Component {
    static async getData() {
        return await Tasks.getTasksList();
    }

    static async render(tasks) {
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
                    <input class="task-add__fuel_used add" type="number" min="0" max="50" step="0.1"
                  value="8.0">
                </div>

                <div class="task-add__info">
                    <label>Пройденное расстояние (км)</label>
                    <input class="task-add__distance_traveled add" type="number" 
                    min="0" max="50" step="0.1" value="7.0">
                </div>
              
                <div class="task-add__info">
                    <label>Стоимость топлива (руб)</label>
                    <input class="task-add__fuel_cost add" type="number" 
                    min="0" max="50" step="0.1"
                    value="6.0">
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

                    <button class="tasks__btn-add button">
                        Добавить
                    </button>
                                    
                    <button class="tasks__btn-clear button" ${!tasks.length ? 'disabled' : ''}>
                        Очистить
                    </button>
                    
                </div>
                
                <div class="_container">
                    <div class="tasks__list">
                        ${tasks.map(task => this.getTaskHTML(task)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    static afterRender() {
        this.setActions();
    }

    static setActions() {
        const taskTitleField = document.getElementsByClassName('task-add__title')[0],
            taskDescriptionField = document.getElementsByClassName('task-add__description')[0],

            addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
            sortTasksListBtn = document.getElementsByClassName('tasks__btn-sort')[0],
            sortTasksListBydistanceTraveledBtn = document.getElementsByClassName('tasks__btn-sort_by_distanceTraveled')[0],
            sortTasksListByTotalFuelCostBtn = document.getElementsByClassName('tasks__btn-sort_by_totalFuelCost')[0],

            tasksContainer = document.getElementsByClassName('tasks')[0],
            clearTasksListBtn = tasksContainer.getElementsByClassName('tasks__btn-clear')[0],
            tasksList = tasksContainer.getElementsByClassName('tasks__list')[0],
            taskTimeField = document.getElementsByClassName('task-add__time')[0],
            taskCapacityField = document.getElementsByClassName('task-add__capacity')[0],
            taskFuelUsedField = document.getElementsByClassName('task-add__fuel_used')[0],
            taskDistancetraveledField = document.getElementsByClassName('task-add__distance_traveled')[0],
            taskFuelCostField = document.getElementsByClassName('task-add__fuel_cost')[0],
            taskTireTypeSelect = document.getElementsByClassName('task-add__tire_type')[0],

            modalAddTaskWindow = document.getElementsByClassName('modal__window-add__task')[0],
            showAddTaskWindowBtn = document.getElementsByClassName('tasks__btn-add')[0],
            closeModalWindowBtn = document.getElementsByClassName('modal__window-close')[0];

        taskTimeField.valueAsDate = new Date();
        taskTimeField.max = new Date().toISOString().split('T')[0];

        showAddTaskWindowBtn.addEventListener('click', function () {
            modalAddTaskWindow.style.display = 'block';
        })

        closeModalWindowBtn.addEventListener('click', function () {
            modalAddTaskWindow.style.display = 'none';
        })

        window.addEventListener('click', function (event) {
            if (event.target == modalAddTaskWindow) {
                modalAddTaskWindow.style.display = 'none';
            }
        })

        taskTitleField.onkeyup = () => addTaskBtn.disabled = !taskTitleField.value.trim();
        addTaskBtn.onclick = () => this.addTask(
            taskTitleField,
            taskDescriptionField,
            addTaskBtn,
            clearTasksListBtn,
            tasksList,
            taskTimeField,
            taskCapacityField,
            taskFuelUsedField,
            taskDistancetraveledField,
            taskFuelCostField,
            taskTireTypeSelect);

        tasksContainer.onclick = evt => {
            const target = evt.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('tasks__btn-clear'):
                    this.clearTasksList(tasksList, clearTasksListBtn);
                    break;

                case targetClassList.contains('tasks__btn-sort'):
                    this.sortTasksListByModel(tasksList, sortTasksListBtn);
                    break;

                case targetClassList.contains('tasks__btn-sort_by_distanceTraveled'):
                    this.sortTasksListByDistanceTraveled(tasksList, sortTasksListBydistanceTraveledBtn);
                    break;

                case targetClassList.contains('tasks__btn-sort_by_totalFuelCost'):
                    this.sortTasksListByTotalFuelCost(tasksList, sortTasksListByTotalFuelCostBtn);
                    break;

                case targetClassList.contains('task'):
                case targetClassList.contains('task__title'):
                    this.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task'):
                case targetClassList.contains('task__content'):
                case targetClassList.contains('task__img-container'):
                case targetClassList.contains('task__img'):
                    this.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task'):
                case targetClassList.contains('task-content'):
                case targetClassList.contains('task-content__params'):
                case targetClassList.contains('task-edit__params-container'):
                case targetClassList.contains('task__params-values'):

                    this.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task__btn-done'):
                    this.changeTaskStatus(target.parentNode.parentNode,
                        target.previousElementSibling, target);
                    break;

                case targetClassList.contains('task__btn-remove'):
                    this.removeTask(tasksList, target.parentNode.parentNode, clearTasksListBtn);
                    break;
            }
        };
    }

    static async addTask(
        taskTitleField,
        taskDescriptionField,
        addTaskBtn,
        clearTasksListBtn,
        tasksList,
        taskTimeField,
        taskCapacityField,
        taskFuelUsedField,
        taskDistancetraveledField,
        taskFuelCostField,
        taskTireTypeSelect
    ) {
        let newTask = {
            title: taskTitleField.value.trim(),
            description: taskDescriptionField.value.trim(),
            dateInsuranceStart: taskTimeField.value,
            capacity: taskCapacityField.value,
            fuelUsed: taskFuelUsedField.value,
            distanceTraveled: taskDistancetraveledField.value,
            fuelCost: taskFuelCostField.value,
            tireType: taskTireTypeSelect.value,
        };

        newTask = await Tasks.addTask(newTask);

        this.clearAddTask(taskTitleField, taskDescriptionField, addTaskBtn);
        clearTasksListBtn.disabled && (clearTasksListBtn.disabled = false);

        tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(newTask));

        this.countTasksAmount();
    }

    static getTaskHTML(task) {
        return `
        <div class="task__item">
            
            <div class="task" data-id="${task.id}">

            
                <div class="task__title" data-id="${task.id}">
                <div class="task__title-images"></div>
                    ${task.title}
                    <div class="task__title-images">
                    <a class="task__btn-edit" href="#/task/${task.id}/edit"><img class="task__title-img task__btn-edit" href="#/task/${task.id}/edit" src="styles/img/icons/pencil.png"></a>
                        <img class="task__title-img task__btn-remove" data-id="${task.id}" src="styles/img/icons/bin.png">
                    </div>
                    
                </div>                  
                
                <div class="task-content" data-id="${task.id}">
                    <div class="task__img-container" data-id="${task.id}">
                        <img class="task__img" data-id="${task.id}" src="styles/img/task__logo.png">
                    </div>
                    <div class="task-content__params" data-id="${task.id}">
                    
					    <div class="task-edit__params-container" data-id="${task.id}">
					    	<b class="task__params-values" data-id="${task.id}">Описание:</b>
					    	<div class="task__params-values" data-id="${task.id}">
					    		${task.description}
					    	</div>
					    </div>

                        <div class="task-edit__params-container" data-id="${task.id}">
					    	<b class="task__params-values" data-id="${task.id}">Объем двигателя:</b>
					    	<div class="task__params-values" data-id="${task.id}">
					    		${task.capacity}
					    		<p class="task__params-values" data-id="${task.id}">л</p>
					    	</div>
					    </div>
                        <div class="task-edit__params-container" data-id="${task.id}">
					    	<b class="task__params-values" data-id="${task.id}">Расход топлива:</b>
					    	<div class="task__params-values" data-id="${task.id}">
					    		${task.fuelUsed}
					    		<p class="task__params-values" data-id="${task.id}">л</p>
					    	</div>
					    </div>
                        <div class="task-edit__params-container" data-id="${task.id}">
					    	<b class="task__params-values" data-id="${task.id}" data-id="${task.id}">Пройдено:</b>
					    	<div class="task__params-values" data-id="${task.id}">
					    		${task.distanceTraveled}
					    		<p class="task__params-values" data-id="${task.id}">км</p>
					    	</div>
					    </div>

                        
					</div>
                </div>   
                
                
            </div>

            
        </div>
        `;
    }

    static clearAddTask(taskTitleField, taskDescriptionField, addTaskBtn) {
        taskTitleField.value = '';
        taskDescriptionField.value = '';
        addTaskBtn.disabled = true;
    }

    static async sortTasksListByModel(tasksList) {

        tasksList.innerHTML = '';
        await Tasks.sortTasksListByModel();
        const tasks = await Tasks.getTasksList();
        const length = tasks.length;

        for (let i = 0; i < length; i++) {
            tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(tasks[i]));
        }

    }

    static async sortTasksListByDistanceTraveled(tasksList) {

        tasksList.innerHTML = '';
        await Tasks.sortTasksListByDistanceTraveled();
        const tasks = await Tasks.getTasksList();
        const length = tasks.length;

        for (let i = 0; i < length; i++) {
            tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(tasks[i]));
        }

    }

    static async sortTasksListByTotalFuelCost(tasksList) {

        tasksList.innerHTML = '';
        await Tasks.sortTasksListByTotalFuelCost();
        const tasks = await Tasks.getTasksList();
        const length = tasks.length;

        for (let i = 0; i < length; i++) {
            tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(tasks[i]));
        }

    }


    static clearTasksList(tasksList, clearTasksListBtn) {
        if (confirm('Are you sure?')) {
            clearTasksListBtn.disabled = true;
            tasksList.innerHTML = '';

            Tasks.clearTasksList();

            this.countTasksAmount();
        }
    }

    static redirectToTaskInfo(id) {
        location.hash = `#/task/${id}`;
    }

    static changeDateFormat(date) {
        return date.split('-').reverse().join('.');
    }

    static getInsuranceStatus(date) {
        const dateNow = Date.parse(`
        ${new Date().getFullYear()}-
        ${new Date().getMonth() + 1}-
        ${new Date().getDate()}
        `),
            year = 31525200000;

        // if (date + year > dateNow) {
        //     return 'Действительна';
        // } else {
        //     return 'Истекла';
        // }

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

    static changeTaskStatus(taskContainer, editTaskBtn, doneTaskBtn) {
        taskContainer.classList.add('task_done');
        editTaskBtn.remove();
        doneTaskBtn.remove();

        Tasks.setTaskStatus(taskContainer.dataset);

        this.countTasksAmount();
    }

    static removeTask(tasksList, taskContainer, clearTasksListBtn) {
        if (confirm('Are you sure?')) {
            taskContainer.remove();
            !tasksList.children.length && (clearTasksListBtn.disabled = true);

            Tasks.removeSelectedTask(taskContainer.dataset);

            this.countTasksAmount();
        }
    }

    static getNowDate() {
        return new Date();
    }

    static updateDateValues() {
        const tasks = Tasks.getTasksList();
        const length = tasks.length;

        for (let i = 0; i < length; i++) {
            if (tasks[i].dateAdded.getFullYear() !== new Date().getFullYear() &&
                tasks[i].dateAdded.getMonth() !== new Date().getMonth() &&
                tasks[i].dateAdded.getDate() !== new Date().getDate()) {

                tasks.daysInsuranceValidityLeft(tasks[i].dateInsuranceStart);
                tasks.getInsuranceStatus(Date.parse(tasks[i].dateInsuranceStart));
            }
        }
    }

    static checkTiresStatus(tireType) {
        return (
            new Date().getMonth() > 10 && tireType === 'Зимние' ||
            new Date().getMonth() < 2 && tireType === 'Зимние' ||
            new Date().getMonth() < 11 && tireType === 'Летние' ||
            new Date().getMonth() > 1 && tireType === 'Летние') ? 'Нет' : 'Да';
    }


}

export default AddAndList;