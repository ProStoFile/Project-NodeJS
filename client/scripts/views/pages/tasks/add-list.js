import Component from '../../../views/component.js';

import Tasks from '../../../models/tasks.js';

class AddAndList extends Component {
    static async getData() {
        return await Tasks.getTasksList();
    }

    static async render(tasks) {
        return `
        
            <div class="task-add">
                <input class="task-add__title add" type="text" placeholder="Модель">
                <textarea class="task-add__description add" placeholder="Описание"></textarea>
                <input class="task-add__time add" type="date" min="1980-01-01">
                <input class="task-add__capacity add" type="number" min="1" max="20" step="0.1" value="2.2">
                <label>Израсходовано топлива<input class="task-add__fuel_used add" type="number" min="0" max="50" step="0.1" value="8.0"></label>
                <label>Пройденное расстояние<input class="task-add__distance_traveled add" type="number" min="0" max="50" step="0.1" value="7.0"></label>
                <label>Стоимость топлива<input class="task-add__fuel_cost add" type="number" min="0" max="50" step="0.1" value="6.0"></label>
                <button class="task-add__btn-add button" disabled>Добавить</button>
            </div>
     
            <div class="tasks">
                <div class="tasks__additional">
                    <p class="tasks__counter"></p>
                    

                    <div class="dropdown">
                        <button class="dropbtn button">Сортировать</button>
                        <div class="dropdown-content">
                            <button class="tasks__btn-sort dropdown__button">По модели</button>
                            <button class="button__two dropdown__button">По расстоянию</button>
                            <button class="button__three dropdown__button">По затратам<br>на топливо</button>
                        </div>
                    </div>
                
                    
                    
                    <button class="tasks__btn-clear button" ${!tasks.length ? 'disabled' : ''}>
                        Очистить список
                    </button>
                </div>
                
                <div class="tasks__list">
                    ${tasks.map(task => this.getTaskHTML(task)).join('')}
                </div>
            </div>
        `;
    }

    static afterRender() {
        this.setActions();

        this.countTasksAmount();
    }

    static setActions() {
        const taskTitleField = document.getElementsByClassName('task-add__title')[0],
            taskDescriptionField = document.getElementsByClassName('task-add__description')[0],
            addTaskBtn = document.getElementsByClassName('task-add__btn-add')[0],
            sortTasksListBtn = document.getElementsByClassName('tasks__btn-sort')[0],
            tasksContainer = document.getElementsByClassName('tasks')[0],
            clearTasksListBtn = tasksContainer.getElementsByClassName('tasks__btn-clear')[0],
            tasksList = tasksContainer.getElementsByClassName('tasks__list')[0],
            taskTimeField = document.getElementsByClassName('task-add__time')[0],
            taskCapacityField = document.getElementsByClassName('task-add__capacity')[0],
            taskFuelUsedField = document.getElementsByClassName('task-add__fuel_used')[0],
            taskDistancetraveledField = document.getElementsByClassName('task-add__distance_traveled')[0],
            taskFuelCostField = document.getElementsByClassName('task-add__fuel_cost')[0];

        taskTimeField.valueAsDate = new Date();
        taskTimeField.max = new Date().toISOString().split("T")[0];

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
            taskFuelCostField);

        tasksContainer.onclick = evt => {
            const target = evt.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('tasks__btn-clear'):
                    this.clearTasksList(tasksList, clearTasksListBtn);
                    break;

                case targetClassList.contains('tasks__btn-sort'):
                    this.sortTasksList(tasksList, sortTasksListBtn);
                    break;

                case targetClassList.contains('task'):
                case targetClassList.contains('task__title'):
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
        taskFuelCostField
    ) {
        let newTask = {
            title: taskTitleField.value.trim(),
            description: taskDescriptionField.value.trim(),
            dateInsuranceStart: taskTimeField.value.trim(),
            capacity: taskCapacityField.value,
            fuelUsed: taskFuelUsedField.value,
            distanceTraveled: taskDistancetraveledField.value,
            fuelCost: taskFuelCostField.value,
            insuranceStatus: this.getInsuranceStatus(Date.parse(taskTimeField.value)),
        };

        newTask = await Tasks.addTask(newTask);

        this.clearAddTask(taskTitleField, taskDescriptionField, addTaskBtn);
        clearTasksListBtn.disabled && (clearTasksListBtn.disabled = false);

        tasksList.insertAdjacentHTML('beforeEnd', this.getTaskHTML(newTask));

        this.countTasksAmount();
    }

    static getTaskHTML(task) {
        const statusDone = task.status === 'Done';

        return `
            <div class="task ${statusDone ? 'task_done' : ''}" data-id="${task.id}">
                <a class="task__title" data-id="${task.id}">${task.title}</a>
                
                <div class="task__buttons">
                	${!statusDone ?
                `<a class="task__btn-edit button" href="#/task/${task.id}/edit">Edit</a>
                    	 <a class="task__btn-done button">Done</a>`
                : ''}
                    <a class="task__btn-remove button">Удалить</a>   
                </div>                            
            </div>
        `;
    }

    static clearAddTask(taskTitleField, taskDescriptionField, addTaskBtn) {
        taskTitleField.value = '';
        taskDescriptionField.value = '';
        addTaskBtn.disabled = true;
    }

    static countTasksAmount() {
        const tasksCounter = document.getElementsByClassName('tasks__counter')[0],
            totalAmount = document.getElementsByClassName('task').length,
            doneAmount = document.getElementsByClassName('task_done').length,
            toBeVerbForm = (doneAmount === 1) ? 'is' : 'are',
            taskWordForm = (doneAmount === 1) ? 'task' : 'tasks';

        tasksCounter.innerHTML = !totalAmount ?
            'Список пуст' :
            `There ${toBeVerbForm} <span class="tasks__counter-done">${doneAmount}</span> ${taskWordForm} of ` +
            `<span class="tasks__counter-total">${totalAmount}</span> ${toBeVerbForm} done`;
    }

    static async sortTasksList(tasksList) {

        tasksList.innerHTML = '';
        await Tasks.sortTasksList();
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

    static getInsuranceStatus(date) {
        const dateNow = Date.parse(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`);
        const year = 31525200000;

        if (date + year > dateNow) {
            return 'Действительна';
        } else {
            return 'Истекла';
        }
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
}

export default AddAndList;