import Component from '../../views/component.js';

class About extends Component {
    static async render() {
        return `
        <body>
    <div class="cars__container">
        <img src="styles/img/car14.png" class="car__one translate" data-speed="-0.9" alt="">
        <img src="styles/img/car10.png" class="car__two translate" data-speed="-0.5" alt="">
        <img src="styles/img/car9.png" class="car__three translate" data-speed="-0.1" alt="">
        <img src="styles/img/car16.png" class="car__four translate" data-speed="0.2" alt="">
        <img src="styles/img/garage5.jpg" class="cars__background translate" data-speed="0.5" alt="">
    </div>

    <section class="cars__section">
        <div class="shadow"></div>

        <div class="cars__container__text">
            <div class="container__cars opacity">
                <h3 class="cars__title">
                    About
                    <div class="cars__border"></div>
                </h3>
                
                <p class="cars__text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque officiis quos expedita
                    ipsa, a quidem inventore voluptates debitis accusamus tenetur qui et voluptas dicta, culpa earum,
                    doloribus odio consectetur consequuntur soluta quasi nobis! Deserunt voluptatum reiciendis iure
                    expedita sequi quisquam laboriosam temporibus exercitationem.</p>
            </div>
            
            <div class="about"> 
    
    </div>

            <div class="cars__img__container opacity">
                <img class="cars__image" src="styles/img/car1.png">
            </div>
            
            
        </div>
         
    </section>

    
    
    <script src="app.js"></script>
</body>
`;
    }

    static afterRender() {
        this.setActions();
    }

    static setActions() {
        const translate = document.querySelectorAll(".translate");
        const cars__container = document.querySelector(".cars__container");
        const shadow = document.querySelector(".shadow");
        const content = document.querySelector(".cars__text");
        const section = document.querySelector(".cars__section");
        const image_container = document.querySelector(".cars__img__container");
        const opacity = document.querySelectorAll(".opacity");
        const border = document.querySelector(".cars__border");

        let cars__container_height = cars__container.offsetHeight;
        let section_height = section.offsetHeight;

        window.addEventListener('scroll', () => {
            let scroll = window.pageYOffset;
            let sectionY = section.getBoundingClientRect();

            translate.forEach(element => {
                let speed = element.dataset.speed;
                element.style.transform = `translateY(${scroll * speed}px)`;
            });

            opacity.forEach(element => {
                element.style.opacity = scroll / (sectionY.top + section_height);
            })

            shadow.style.cars__container_height = `${scroll * 0.5 + 300}px`;

            content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
            image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

            border.style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
        })
    };
}

export default About;