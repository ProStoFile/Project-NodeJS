import Component from '../../../views/component.js';

import Error404 from '../../../views/pages/error404.js';

import Cars from '../../../models/cars.js';

import AddAndList from './add-list.js';

class Warning extends Component {
    static async getData() {
        return await Cars.getCarsList();
    }

    static async render(cars) {
        let html;

        if (!cars.error) {

            if (cars.filter(car => this.checkIfInsuranceIsExpired(car.dateInsuranceStart)).length > 0 &&
                cars.filter(car => AddAndList.checkTiresStatus(car.tireType) === 'Да').length > 0) {
                html = `   
                <div class="cars">
                    <div class="_container">
                        <div class="warning-cars__title">
                            <div class="warning-cars__title-text">
                                Авто с просроченной страховкой:
                                ${cars.filter(car => this.checkIfInsuranceIsExpired(car.dateInsuranceStart)).length}
                            </div>
                        </div>           
                        <div class="cars__list">
                            ${cars.filter(car => this.checkIfInsuranceIsExpired(car.dateInsuranceStart)).map(car => this.getCarInsuranceWarningHTML(car)).join('')}
                        </div>                   
                        <div class="warning-cars__title">
                            Авто с неверным типом шин:
                            ${cars.filter(car => AddAndList.checkTiresStatus(car.tireType) === 'Да').length}
                        </div>                  
                        <div class="cars__list">
                            ${cars.filter(car => AddAndList.checkTiresStatus(car.tireType) === 'Да').map(car => this.getCarTireTypeWarningHTML(car)).join('')}
                        </div>
                    </div>        
                </div>
            `
            } else if (cars.filter(car => this.checkIfInsuranceIsExpired(car.dateInsuranceStart)).length == 0 &&
                cars.filter(car => AddAndList.checkTiresStatus(car.tireType) === 'Да').length == 0) {
                html = `
                <div class="cars">
                    <div class="_container">
                        <div class="warning-cars__title">
                            <div class="warning-images">
                            <img class="warning-icon" src="styles/img/icons/congratulations/party.png">
                            <img class="warning-icon" src="styles/img/icons/congratulations/garland.png">
                            <img class="warning-icon" src="styles/img/icons/congratulations/balloons.png">
                            <img class="warning-icon" src="styles/img/icons/congratulations/balloons.png">
                            <img class="warning-icon" src="styles/img/icons/congratulations/garland.png">
                            <img class="warning-icon" src="styles/img/icons/congratulations/party.png">
                            </div>
                                Все Ваши авто в порядке. Так держать!                                       
                            </div>
                        </div>
                    </div>
                `
            } else if (cars.filter(car => this.checkIfInsuranceIsExpired(car.dateInsuranceStart)).length > 0 &&
                cars.filter(car => AddAndList.checkTiresStatus(car.tireType) === 'Да').length == 0) {
                html = `   
                <div class="cars">
                    <div class="_container">
                        <div class="warning-cars__title">
                            <div class="warning-cars__title-text">
                                Авто с просроченной страховкой:
                                ${cars.filter(car => this.checkIfInsuranceIsExpired(car.dateInsuranceStart)).length}
                            </div>
                        </div>           
                        <div class="cars__list">
                            ${cars.filter(car => this.checkIfInsuranceIsExpired(car.dateInsuranceStart)).map(car => this.getCarInsuranceWarningHTML(car)).join('')}
                        </div>                                  
                    </div>        
                </div>
                `
            } else if (cars.filter(car => this.checkIfInsuranceIsExpired(car.dateInsuranceStart)).length == 0 &&
                cars.filter(car => AddAndList.checkTiresStatus(car.tireType) === 'Да').length >> 0) {
                html = `   
                <div class="cars">
                    <div class="_container">
                        <div class="warning-cars__title">
                            Авто с неверным типом шин:
                ${cars.filter(car => AddAndList.checkTiresStatus(car.tireType) === 'Да').length}
                        </div>                  
                        <div class="cars__list">
                ${cars.filter(car => AddAndList.checkTiresStatus(car.tireType) === 'Да').map(car => this.getCarTireTypeWarningHTML(car)).join('')}
                        </div>
                    </div>                                  
                </div>        
            </div>
            `
            };
        } else {
            html = Error404.render();
        }
        return html;
    }

    static checkIfInsuranceIsExpired(date) {
        return AddAndList.getInsuranceStatus(Date.parse(date)) === 'Истекла';
    }

    static getCarInsuranceWarningHTML(car) {
        return `
        <div class="car__item">           
            <div class="car car-redirect" data-id="${car.id}">
                <div class="car__title car-redirect" data-id="${car.id}">
                    <div class="car__title-images car-redirect"></div>
                    ${car.model}
                    <div class="car__title-images car-redirect"></div>  
                </div>                                 
                <div class="car-content car-redirect" data-id="${car.id}">
                    <div class="car__img-container car-redirect" data-id="${car.id}">
                        <img class="car__img car-redirect" data-id="${car.id}" src="styles/img/car__logo.png">
                    </div>
                    <div class="car-content__params car-redirect" data-id="${car.id}">                    
					    <div class="car-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="car__params-values car-redirect" data-id="${car.id}">Оформлена:</b>
					    	<div class="car__params-values car-redirect" data-id="${car.id}">
                            ${AddAndList.changeDateFormat(car.dateInsuranceStart)}
					    	</div>
					    </div>
                        <div class="car-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="car__params-values car-redirect" data-id="${car.id}">Истекла:</b>
					    	<div class="car__params-values car-redirect" data-id="${car.id}">
                                <p class="car__params-values car-redirect" data-id="${car.id}">
                                    ${this.getInsuranceDateEnd(car.dateInsuranceStart)}
                                </p>
					    	</div>
					    </div>
                        <div class="car-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="car__params-values car-redirect" data-id="${car.id}">Опоздание:</b>
					    	<div class="car__params-values car-redirect" data-id="${car.id}">
                            ${Math.abs(AddAndList.getDaysInsuranceValidityLeft(car.dateInsuranceStart))}
					    		<p class="car__params-values car-redirect" data-id="${car.id}">${AddAndList.getWordDaysForm(Math.abs(AddAndList.getDaysInsuranceValidityLeft(car.dateInsuranceStart)))}</p>
					    	</div>
					    </div>                   
					</div>
                </div>                  
            </div>            
        </div>
        `;
    }

    static getCarTireTypeWarningHTML(car) {
        return `
        <div class="car__item">           
            <div class="car car-redirect" data-id="${car.id}">
                <div class="car__title car-redirect" data-id="${car.id}">
                    <div class="car__title-images car-redirect"></div>
                        ${car.model}
                    <div class="car__title-images car-redirect"></div> 
                </div>                                 
                <div class="car-content car-redirect" data-id="${car.id}">
                    <div class="car__img-container car-redirect" data-id="${car.id}">
                        <img class="car__img car-redirect" data-id="${car.id}" src="styles/img/car__logo.png">
                    </div>
                    <div class="car-content__params car-redirect" data-id="${car.id}">                   
                        <div class="car-edit__params-container car-redirect" data-id="${car.id}">
                            <b class="car__params-values car-redirect" data-id="${car.id}">Текущий сезон:</b>
                            <div class="car__params-values car-redirect" data-id="${car.id}">
                                ${this.getCurrentSeason()}
                            </div>
                        </div>
					    <div class="car-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="car__params-values car-redirect" data-id="${car.id}">Установлены шины:</b>
					    	<div class="car__params-values car-redirect" data-id="${car.id}">
                                ${car.tireType}
					    	</div>
					    </div>
                        <div class="car-edit__params-container car-redirect" data-id="${car.id}">
					    	<b class="car__params-values car-redirect" data-id="${car.id}">До смены сезона:</b>
					    	<div class="car__params-values car-redirect" data-id="${car.id}">
                                ${this.getDaysUntilNextSeason()}
                                <p class="car__params-values car-redirect" data-id="${car.id}">${AddAndList.getWordDaysForm(this.getDaysUntilNextSeason())}</p>
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
        const carsContainer = document.getElementsByClassName('cars')[0];

        carsContainer.onclick = event => {
            const target = event.target,
                targetClassList = target.classList;

            switch (true) {
                case targetClassList.contains('car-redirect'):
                    AddAndList.redirectToCarInfo(target.dataset.id);
                    break;
            }
        };
    }
}

export default Warning;
