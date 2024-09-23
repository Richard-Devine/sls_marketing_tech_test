import GreenTick from "../../icons/green-checkbox.svg";
import './informationHeader.css';

function InformationHeader() {
    return (
        <div className={'information-header'}>
            <img src={GreenTick} alt={'Green tick'} data-testid={'information-header-image'}/>
            <p data-testid={'information-header-message'}>Great, we have you test requirements, we just need a few more
                details to get your free quote</p>
        </div>
    )
}

export default InformationHeader;