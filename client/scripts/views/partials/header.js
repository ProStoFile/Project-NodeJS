import Component from '../../views/component.js';

class Header extends Component {
    static async render() {
        const page = this.urlParts.page;

        return `
            <header class="header">                    
                <a class="header__link ${!page ? 'active' : ''}" href="#/">
                    О нас
                </a>
                <a class="header__link ${page === 'tasks' ? 'active' : ''}" href="#/tasks">
                    Авто
                </a> 
                <a class="header__link ${page === 'warning' ? 'active' : ''}" href="#/warning">
                    Требуют внимания
                </a>                                            
            </header>
        `;
    }
}

export default Header;