import Component from '../../views/component.js';

class About extends Component {
    static async render() {
        return `
        <body>
    <div class="cars__container">
        <img src="img/Cars for Parallax/car7.png" class="car__one translate" data-speed="-0.4" alt="">
        <img src="img/Cars for Parallax/car8.png" class="car__two translate" data-speed="-0.2" alt="">
        <img src="img/Cars for Parallax/car10.png" class="car__three translate" data-speed="-0.1" alt="">
        <img src="img/Cars for Parallax/car2.png" class="car__four translate" data-speed="0.1" alt="">
        <img src="img/garage4.jpg" class="sky translate" data-speed="0.5" alt="">
    </div>

    <section>
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

            <div class="cars__img__container opacity">
            </div>
        </div>
    </section>
    <div class="about"> 
    <h1 class="page-title">Welcome!</h1>                   
    <p class="about__info">
        So, here is an application, where you can manage information about your daily tasks.
        <br>
        Enjoy!
    </p>
    <a class="about__btn-start button" href="#/tasks" title="Click here to get started!">
        Start using
    </a>
</div>
    <script src="app.js"></script>
</body>`;
    }
}

const translate = document.querySelectorAll(".translate");
const cars__container = document.querySelector(".cars__container");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".cars__text");
const section = document.querySelector("section");
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

export default About;