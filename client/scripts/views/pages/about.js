import Component from '../../views/component.js';

class About extends Component {
    static async render() {
        return `
            <body>
                <div class="cars__container">
                <h1 class="big-title translate" data-speed="0.9">Максимум преимуществ.</h1>
                    <img src="styles/img/cars/1.png" class="car__one translate" data-speed="-0.9" alt="">
                    <img src="styles/img/cars/2.png" class="car__two translate" data-speed="-0.5" alt="">
                    <img src="styles/img/cars/3.png" class="car__three translate" data-speed="-0.1" alt="">
                    <img src="styles/img/cars/4.png" class="car__four translate" data-speed="0.2" alt="">
                    <img src="styles/img/about-background.jpg" class="cars__background translate" data-speed="0.5" alt="">
                </div>
            
                <section class="cars__section">
                    <div class="shadow"></div>   
                    <div class="cars__container__text">
                        <div class="container__cars opacity">
                            <h3 class="cars__title">
                                Ваше авто - Наша забота 
                                <div class="cars__border"></div>
                            </h3>   
                            <p class="cars__text">
                            Автомобиль - машина на четырех колесах, 
                            позволяющая легко и быстро проезжать места, 
                            в которых вы никогда не были и никогда не будете, 
                            ибо всякий раз, когда вы оказываетесь рядом, негде припарковаться.
                            </p>
                        </div>   
                        <div class="cars__img__container opacity">
                            <img class="cars__image" src="styles/img/cars/5.png">
                        </div>  
                    </div>   
                </section>
            </body>
        `;
    }

    static afterRender() {
        this.setActions();
    }

    static setActions() {
        const translate = document.querySelectorAll('.translate'),

            cars__container = document.querySelector('.cars__container'),
            image__container = document.querySelector('.cars__img__container'),

            big__title = document.querySelector('.big-title'),
            shadow = document.querySelector('.shadow'),
            content = document.querySelector('.cars__text'),
            section = document.querySelector('.cars__section'),
            opacity = document.querySelectorAll('.opacity'),
            border = document.querySelector('.cars__border');

        let cars__container__height = cars__container.offsetHeight,
            section_height = section.offsetHeight;

        window.addEventListener('scroll', () => {
            let scroll = window.pageYOffset,
                sectionY = section.getBoundingClientRect();

            translate.forEach(element => {
                let speed = element.dataset.speed;
                element.style.transform = `translateY(${scroll * speed}px)`;
            });

            opacity.forEach(element => {
                element.style.opacity = scroll / (sectionY.top + section_height);
            })

            big__title.style.opacity = - scroll / (cars__container__height / 2) + 1;
            shadow.style.cars__container__height = `${scroll * 0.5 + 300}px`;

            content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
            image__container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

            border.style.width = `${scroll / (sectionY.top + section_height) * 43.5}%`;
        })
    };
}

export default About;