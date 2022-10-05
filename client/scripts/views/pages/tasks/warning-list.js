import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Tasks from '../../../models/tasks.js';

import AddAndList from './add-list.js';

class Warning extends Component {
    static async getData() {
        return await Tasks.getTasksList();
    }

    static async render(tasks) {
        return `
        <div class="tasks">
            <div class="_container">
                <div class="warning-tasks__title">
                    <div class="warning-tasks__title-text">
                        Авто с просроченной страховкой:
                        ${tasks.filter(task => AddAndList.getInsuranceStatus(Date.parse(task.dateInsuranceStart)) === 'Истекла').length}
                    </div>
                </div>
            
        
            <div class="tasks__list">
                ${tasks.filter(task => AddAndList.getInsuranceStatus(Date.parse(task.dateInsuranceStart)) ===
            'Истекла').map(task => this.getTaskInsuranceWarningHTML(task)).join('')}
            </div>
        
            <div class="warning-tasks__title">
                Авто с неверными типом шин:
                ${tasks.filter(task => AddAndList.checkTiresStatus(task.tireType) === 'Да').length}
            </div>
        
            <div class="tasks__list">
                ${tasks.filter(task => AddAndList.checkTiresStatus(task.tireType) === 'Да').map(task => this.getTaskTireTypeWarningHTML(task)).join('')}
            </div>
            </div>
        
        </div>
        `;
    }

    static getTaskInsuranceWarningHTML(task) {
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
					    	<b class="task__params-values" data-id="${task.id}">Оформлена:</b>
					    	<div class="task__params-values" data-id="${task.id}">
                            ${AddAndList.changeDateFormat(task.dateInsuranceStart)}
					    	</div>
					    </div>

                        <div class="task-edit__params-container" data-id="${task.id}">
					    	<b class="task__params-values" data-id="${task.id}">Истекла:</b>
					    	<div class="task__params-values" data-id="${task.id}">
                                <p class="task__params-values" data-id="${task.id}">
                                    ${this.getInsuranceDateEnd(task.dateInsuranceStart)}
                                </p>
					    	</div>
					    </div>

                        <div class="task-edit__params-container" data-id="${task.id}">
					    	<b class="task__params-values" data-id="${task.id}">Опоздание:</b>
					    	<div class="task__params-values" data-id="${task.id}">
                            ${Math.abs(AddAndList.getDaysInsuranceValidityLeft(task.dateInsuranceStart))}
					    		<p class="task__params-values" data-id="${task.id}">дней</p>
					    	</div>
					    </div>                   
					</div>
                </div>                  
            </div>            
        </div>
        `;
    }

    static getTaskTireTypeWarningHTML(task) {
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
                            <b class="task__params-values" data-id="${task.id}">Текущий сезон:</b>
                            <div class="task__params-values" data-id="${task.id}">
                                ${this.getCurrentSeason()}
                            </div>
                        </div>

					    <div class="task-edit__params-container" data-id="${task.id}">
					    	<b class="task__params-values" data-id="${task.id}">Установлены шины:</b>
					    	<div class="task__params-values" data-id="${task.id}">
                                ${task.tireType}
					    	</div>
					    </div>

                        <div class="task-edit__params-container" data-id="${task.id}">
					    	<b class="task__params-values" data-id="${task.id}">До смены сезона:</b>
					    	<div class="task__params-values" data-id="${task.id}">
                                ${this.getDaysUntilNextSeason()}
                                <p class="task__params-values" data-id="${task.id}">дней</p>
					    	</div>
					    </div>
                  
					</div>
                </div>                  
            </div>            
        </div>
        `;
    }

    static getInsuranceDateEnd(date) {
        const stringDate = date.split('-');
        stringDate[0] = +stringDate[0] + 1;
        return stringDate.reverse().join('.');
    }

    static getCurrentSeason() {
        return (new Date().getMonth() > 10 || new Date().getMonth() < 2) ? 'Зимний' : 'Летний';
    }

    static getDaysUntilNextSeason() {
        const yearNow = new Date().getFullYear(),
            winter = new Date(`${yearNow}-12-1`),
            summer = new Date(`${yearNow}-06-01`),
            oneDay = 1000 * 60 * 60 * 24;

        return (this.getCurrentSeason() === 'Летний') ?
            Math.trunc((winter.getTime() - new Date().getTime()) / oneDay) :
            Math.trunc((summer.getTime() - new Date().getTime()) / oneDay)
    }

    static afterRender() {
        this.setActions();
    }

    static setActions() {
        const taskTitleField = document.getElementsByClassName('task-add__title')[0],


            tasksContainer = document.getElementsByClassName('tasks')[0],


            tasksList = tasksContainer.getElementsByClassName('tasks__list')[0],
            taskElements = tasksList.getElementsByClassName('task__item'),

            modalAddTaskWindow = document.getElementsByClassName('modal__window-add__task')[0],
            showAddTaskWindowBtn = document.getElementsByClassName('tasks__btn-add')[0],
            closeModalWindowBtn = document.getElementsByClassName('modal__window-close')[0];

        tasksContainer.onclick = event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {

                case targetClassList.contains('task'):
                case targetClassList.contains('task__title'):
                    AddAndList.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task'):
                case targetClassList.contains('task__content'):
                case targetClassList.contains('task__img-container'):
                case targetClassList.contains('task__img'):
                    AddAndList.redirectToTaskInfo(target.dataset.id);
                    break;

                case targetClassList.contains('task'):
                case targetClassList.contains('task-content'):
                case targetClassList.contains('task-content__params'):
                case targetClassList.contains('task-edit__params-container'):
                case targetClassList.contains('task__params-values'):

                    AddAndList.redirectToTaskInfo(target.dataset.id);
                    break;
            }
        };
    }

}




export default Warning;
