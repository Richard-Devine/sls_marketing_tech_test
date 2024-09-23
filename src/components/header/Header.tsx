import Title from '../../icons/title.svg'
import './header.css'

function Header() {
    return (
        <div className={'header-container'} data-testid={'header-container'}>
            <img src={Title} alt={'Title'} data-testid={'header-image'}/>
        </div>
    )
}

export default Header