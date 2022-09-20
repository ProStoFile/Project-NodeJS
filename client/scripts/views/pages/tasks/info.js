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
				time,
				capacity,
				fuelUsed,
				distanceTraveled,
				fuelCost,
				totalFuelUsed,
				totalFuelCost } = task;

			html = `
				<h1 class="page-title">Информация об авто</h1>
				
				<div class="task-info">
					<p>
						<b>Модель:</b>
						${title}
					</p>
					<p>
						<b>Описание:</b>
						${description}
					</p>
					<p>
						<b>Статус:</b>
						${status}
					</p>
					<p>
						<b>Начало действия страховки:</b>
						${time}
					</p>
					<p>
						<b>Объем:</b>
						${capacity}
					</p>
					<p>Расчет расхода топлива</p>
					<p>
						<b>Израсходовано:</b>
						${fuelUsed}
					</p>
					<p>
						<b>Пройденное расстояние:</b>
						${distanceTraveled}
					</p>
					<p>
						<b>Стоимость топлива:</b>
						${fuelCost}
					</p>
					<p>
						<b>Израсходовано топлива:</b>
						${totalFuelUsed}
					</p>
					<p>
						<b>Затраты на топливо:</b>
						${totalFuelCost}
					</p>
					
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