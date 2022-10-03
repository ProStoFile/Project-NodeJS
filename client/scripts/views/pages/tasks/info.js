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
								<input class="task-edit__title" type="text" value="${title}">
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Описание:</b>
							<div>
								<textarea class="task-edit__description">${(description === 'No Description') ? '' : description}
								</textarea>
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Застрахован:</b>
							<div>
								${AddAndList.changeDateFormat(dateInsuranceStart)}
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Истекает через (дн):</b>
							<div>
								${AddAndList.getDaysInsuranceValidityLeft(dateInsuranceStart)}
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Объем двигателя (л):</b>
							<div>
								${capacity}
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Расход топлива (л):</b>
							<div>
								${fuelUsed}
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Пройдено (км):</b>
							<div>
								${distanceTraveled}
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Стоимость топлива (₽):</b>
							<div>
								${fuelCost}
							</div>
						</div>
		
						<div class="task-edit__params-container">
							<b>Затраты на топливо(₽):</b>
							<div>
								<p>${totalFuelCost}</p>
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
							<div>
								<p>${totalFuelUsed}</p>
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