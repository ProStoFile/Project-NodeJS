import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Tasks from '../../../models/tasks.js';

import AddAndList from './add-list.js';

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
				dateInsuranceStart,
				capacity,
				fuelUsed,
				distanceTraveled,
				fuelCost,
				totalFuelUsed,
				totalFuelCost,
				tireType } = task;

			html = `
			<h1 class="page-title">Информация</h1>

			<div class="_container">
				<div class="task-edit">
					<div class="task-edit__params">
						<div class="task-edit__params-container">
							<b>Модель:</b>
							<div>
								${title}
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Описание:</b>
							<div>
								${description}
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Застрахован:</b>
							<div>
								${AddAndList.changeDateFormat(dateInsuranceStart)}
							</div>
						</div>
		
						<div class="task-edit__params-container">
								${AddAndList.getDaysInsuranceValidityLeft(dateInsuranceStart) < 0 ?
								`<b>Страховка просрочена:</b>
								<div class="task-edit__params-item">
								${Math.abs(AddAndList.getDaysInsuranceValidityLeft(dateInsuranceStart))}
								<p>дней назад</p>
							</div>
								` : `

						<b>Истекает через:</b>
							<div class="task-edit__params-item">
								${AddAndList.getDaysInsuranceValidityLeft(dateInsuranceStart)}
								<p>дней</p>
							</div>`}
						</div>
		
						<div class="task-edit__params-container">
							<b>Объем двигателя:</b>
							<div class="task-edit__params-item">
								${capacity}
								<p>л</p>
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Расход топлива:</b>
							<div class="task-edit__params-item">
								${fuelUsed}
								<p>л</p>
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Пройдено:</b>
							<div class="task-edit__params-item">
								${distanceTraveled}
								<p>л</p>
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Стоимость топлива:</b>
							<div class="task-edit__params-item">
								${fuelCost}
								<p>₽</p>
							</div>
							
						</div>
		
						<div class="task-edit__params-container">
							<b>Затраты на топливо:</b>
							<div class="task-edit__params-item">
								<p>${totalFuelCost}</p>
								<p>₽</p>
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Статус страховки:</b>
							${AddAndList.getInsuranceStatus(Date.parse(dateInsuranceStart)) === 'Действительна' ?

					`<div class="green">
							<p>${AddAndList.getInsuranceStatus(Date.parse(dateInsuranceStart))}</p>
							</div>` :
					`<div class="red">
							<p>${AddAndList.getInsuranceStatus(Date.parse(dateInsuranceStart))}</p>
						</div>`

				}
							
						</div>
		
						<div class="task-edit__params-container">
							<b>Израсходовано топлива:</b>
							<div class="task-edit__params-item">
								<p>${totalFuelUsed}</p>
								<p>л</p>
							</div>
							
						</div>

						<div class="task-edit__params-container">
							<b>Установлены шины:</b>
							<div>
								<p>${tireType}</p>
							</div>
						</div>

						<div class="task-edit__params-container">
							<b>Нужна ли замена:</b>
							<div>
								<p>${AddAndList.checkTiresStatus(tireType)}</p>
							</div>
						</div>

						<div class="task-edit__buttons">
							<div class="task-edit__buttons-container">
								<a class="task-info__btn-back button" href="#/tasks">Вернуться</a>
                    			<a class="task-info__btn-edit button" href="#/task/${id}/edit">Изменить</a>
                			</div>
						</div>
					</div>
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