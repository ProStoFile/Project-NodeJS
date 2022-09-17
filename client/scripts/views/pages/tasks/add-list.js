import Component from '../../../views/component.js';

import Tasks from '../../../models/tasks.js';

class AddAndList extends Component {
    static async getData() {
        return await Tasks.getTasksList();
    }

    static async render(tasks) {
        return `
            <h1 class="page-title">Tasks List</h1>
        
            <div class="task-add">
                <input class="task-add__title" type="text" placeholder="Task title">
                <textarea class="task-add__description" placeholder="Task description"></textarea>
             
                <button class="task-add__btn-add button" disabled>Add Task</button>
            </div>
     
            <div class="tasks">
                <div class="tasks__additional">
                    <p class="tasks__counter"></p>
                    
                    <button class="tasks__btn-sort button">Sort</button>
                    
                    <button class="tasks__btn-clear button" ${!tasks.length ? 'disabled' : ''}>
                        Clear Tasks List
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
            tasksList = tasksContainer.getElementsByClassName('tasks__list')[0];

        taskTitleField.onkeyup = () => addTaskBtn.disabled = !taskTitleField.value.trim();
        addTaskBtn.onclick = () => this.addTask(taskTitleField, taskDescriptionField, addTaskBtn,
            clearTasksListBtn, tasksList);

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

    static async addTask(taskTitleField, taskDescriptionField, addTaskBtn, clearTasksListBtn, tasksList) {
        let newTask = {
            title: taskTitleField.value.trim(),
            description: taskDescriptionField.value.trim()
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
                    <a class="task__btn-remove button">Remove</a>   
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
            'Tasks list is empty' :
            `There ${toBeVerbForm} <span class="tasks__counter-done">${doneAmount}</span> ${taskWordForm} of ` +
            `<span class="tasks__counter-total">${totalAmount}</span> ${toBeVerbForm} done`;
    }

    static sortTasksList(tasksList, sortTasksBtn) {

        tasksList.innerHTML = '';
        Tasks.sortTasksList();

        const tasks = Tasks.getTasksList();
        const length = tasks.length;

        for (let i = 0; i < length; i++){
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