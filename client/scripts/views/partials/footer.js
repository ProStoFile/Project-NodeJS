import Component from '../../views/component.js';

class Footer extends Component {
    static async render() {
        return `
            <footer class="footer">                   
                <p class="footer__info">
                    &copy; Все права защищены, 2022
                </p>                  
            </footer>
        `;
    }
}

export default Footer;