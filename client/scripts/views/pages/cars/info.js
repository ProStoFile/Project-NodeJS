import Component from '../../component.js';

import Error404 from '../error404.js';

import Cars from '../../../models/cars.js';

import AddAndList from './add-list.js';

class Info extends Component {
	static async getData() {
		return await Cars.getCar(this.urlParts.id);
	}

	static async render(car) {
		let html;

		if (!car.error) {
			const { id,
				model,
				description,
				dateInsuranceStart,
				capacity,
				fuelUsed,
				distanceTraveled,
				fuelCost,
				totalFuelUsed,
				totalFuelCost,
				tireType } = car;

			html = `
					<h1 class="page-title">Информация</h1>
					<div class="_container">
						<div class="car-edit">
							<div class="car-edit__params">
								<div class="car-edit__params-container">
									<div>
										<img class="params-icon" src="styles/img/icons/params/car.png">
										<b>Модель: </b>
									</div>
									<div>${model}</div>
								</div>				
								<div class="car-edit__params-container">
									<div>
										<img class="params-icon" src="styles/img/icons/params/document.png">
										<b>Описание:</b>
									</div>
									<div>${description}</div>
								</div>				
								<div class="car-edit__params-container">
								<div>
									<img class="params-icon" src="styles/img/icons/params/calendar.png">
									<b>Застрахован:</b>
								</div>
									<div>
										${AddAndList.changeDateFormat(dateInsuranceStart)}
									</div>
								</div>

								<div class="car-edit__params-container">
									<div>
										<img class="params-icon" src="styles/img/icons/params/file.png">
										<b>Статус страховки:</b>
									</div>
									${AddAndList.getInsuranceStatus(Date.parse(dateInsuranceStart)) === 'Действительна' ?
					`<div class="green">
							<p>${AddAndList.getInsuranceStatus(Date.parse(dateInsuranceStart))}</p>
						</div>` :
					`<div class="red">
										<p>${AddAndList.getInsuranceStatus(Date.parse(dateInsuranceStart))}</p>
						</div>`}
					</div>
					<div class="car-edit__params-container">
						${AddAndList.getDaysInsuranceValidityLeft(dateInsuranceStart) < 0 ?
					`<div>
							<img class="params-icon" src="styles/img/icons/params/document.png">
								<b>Страховка просрочена:</b>
								</div>
									<div class="car-edit__params-item">
									${Math.abs(AddAndList.getDaysInsuranceValidityLeft(dateInsuranceStart))}
									<p>${AddAndList.getWordDaysForm(Math.abs(AddAndList.getDaysInsuranceValidityLeft(dateInsuranceStart)))} назад</p>
									</div>
										` : `
									<div>
										<img class="params-icon" src="styles/img/icons/params/document.png">
										<b>Истекает через:</b>
									</div>
									<div class="car-edit__params-item">
										${AddAndList.getDaysInsuranceValidityLeft(dateInsuranceStart)}
										<p>${AddAndList.getWordDaysForm(AddAndList.getDaysInsuranceValidityLeft(dateInsuranceStart))}</p>
									</div>`}
								</div>									
								<div class="car-edit__params-container">
								<div>
									<img class="params-icon" src="styles/img/icons/params/car-engine.png">
									<b>Объем двигателя:</b>
								</div>
									<div class="car-edit__params-item">
										${capacity}
										<p>л</p>
									</div>
								</div>									
								<div class="car-edit__params-container">
								<div>
									<img class="params-icon" src="styles/img/icons/params/petrol.png">
									<b>Расход топлива:</b>
								</div>
									<div class="car-edit__params-item">
										${fuelUsed}
										<p>л</p>
									</div>
								</div>									
								<div class="car-edit__params-container">
								<div>
									<img class="params-icon" src="styles/img/icons/params/road.png">
									<b>Пройдено:</b>
								</div>
									<div class="car-edit__params-item">
										${distanceTraveled}
										<p>км</p>
									</div>
								</div>									
								<div class="car-edit__params-container">
									<div>
										<img class="params-icon" src="styles/img/icons/params/salary.png">
										<b>Стоимость топлива:</b>
									</div>
									<div class="car-edit__params-item">
										${fuelCost}
										<p>₽</p>
									</div>									
								</div>									
								<div class="car-edit__params-container">
								<div>
									<img class="params-icon" src="styles/img/icons/params/profits.png">
									<b>Затраты на топливо:</b>
								</div>
									<div class="car-edit__params-item">
										<p>${totalFuelCost}</p>
										<p>₽</p>
									</div>
								</div>									
								<div class="car-edit__params-container">
								<div>
									<img class="params-icon" src="styles/img/icons/params/gasoline.png">
									<b>Израсходовано топлива:</b>
								</div>
									<div class="car-edit__params-item">
										<p>${totalFuelUsed}</p>
										<p>л</p>
									</div>									
								</div>
								<div class="car-edit__params-container">
								<div>
									<img class="params-icon" src="styles/img/icons/params/wheel.png">
									<b>Установлены шины:</b>
								</div>
									<div>
										<p>${tireType}</p>
									</div>
								</div>
								<div class="car-edit__params-container">
									<div>
										<img class="params-icon" src="styles/img/icons/params/wheel2.png">
										<b>Нужна ли замена:</b>
									</div>
									${AddAndList.checkTiresStatus(tireType) === 'Да' ?
					`<div class="red">
							<p>${AddAndList.checkTiresStatus(tireType)}</p>
					</div>` : `<div class="green">
							<p>${AddAndList.checkTiresStatus(tireType)}</p>
					</div>`} 
				</div>
					<div class="car-edit__buttons">
						<div class="car-edit__buttons-container">
							<a class="car-info__btn-back button" href="#/cars">Вернуться</a>
            		    	<a class="car-info__btn-edit button" href="#/car/${id}/edit">Изменить</a>
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