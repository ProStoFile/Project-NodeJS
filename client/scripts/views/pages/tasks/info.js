import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Tasks from '../../../models/tasks.js';

class Info extends Component {
	static async getData() {
		return await Tasks.getTask(this.urlParts.id);
	}

	static async render(task) {
		let html;

		if (!task.error) {
			const { id,
				title,
				description,
				status,
				dateInsuranceStart,
				daysInsuranceValidityLeft,
				capacity,
				fuelUsed,
				distanceTraveled,
				fuelCost,
				totalFuelUsed,
				totalFuelCost,
				insuranceStatus,
				tireType } = task;

			html = `
				<h1 class="page-title">Информация об авто</h1>
				
				<div class="task-info">
        	<div class="task-info__params">
        	    <p class="task-info__text">
        	        <b>Модель:</b>
        	        ${title}
        	    </p>
        	    <p class="task-info__text">
        	        <b>Описание:</b>
        	        ${description}
        	    </p>
        	    <p class="task-info__text">
        	        <b>Статус:</b>
        	        ${status}
        	    </p>
        	    <p class="task-info__text">
        	        <b>Застрахован:</b>
        	        ${dateInsuranceStart}
        	    </p>
        	    <p class="task-info__text">
        	        <b>Дней до окончания действия:</b>
        	        ${daysInsuranceValidityLeft}
        	    </p>
        	    <p class="task-info__text">
        	        <b>Объем:</b>
        	        ${capacity}
        	    </p>
        	    <p>Расчет расхода топлива</p>
        	    <p class="task-info__text">
        	        <b>Расход топлива:</b>
        	        ${fuelUsed}
        	    </p>
        	    <p class="task-info__text">
        	        <b>Пройденное расстояние:</b>
        	        ${distanceTraveled}
        	    </p>
        	    <p class="task-info__text">
        	        <b>Стоимость топлива:</b>
        	        ${fuelCost}
        	    </p>
        	    <p class="task-info__text">
        	        <b>Израсходовано топлива:</b>
        	        ${totalFuelUsed}
        	    </p>
        	    <p class="task-info__text">
        	        <b>Затраты на топливо:</b>
        	        ${totalFuelCost}
        	    </p>

        	    <p class="task-info__text">
        	        <b>Статус страховки:</b>
        	        ${insuranceStatus}
        	    </p>

        	    <p class="task-info__text">
        	        <b>Установлены шины:</b>
        	        ${tireType}
        	    </p>
        	</div>

        <div class="task-info__buttons">
            ${status !== 'Выполнено' ?
					`<a class="task-info__btn-edit button" href="#/task/${id}/edit">Изменить</a>`
					: ''}
            <a class="task-info__btn-back button" href="#/tasks">Назад</a>
        </div>
    </div>
			`;
		} else {
			html = Error404.render();
		}

		return html;
	}
}

export default Info;