import {useState} from "react";
import Brokers from "../brokers/Brokers";
import CoverFor from '../coverFor/CoverFor'
import CoverAmount from '../coverAmount/CoverAmount'
import IdentityDetails from "../identityDetails/IdentityDetails";
import ContactDetails from '../contactDetails/ContactDetails';
import InformationHeader from "../informationHeader/InformationHeader";
import Submitted from '../submitted/Submitted'
import './form.css';


function Form() {

    const [currentPage, setCurrentPage] = useState('coverFor')

    const setCoverForHandler = (value: string) => {
        value ? setCurrentPage('coverAmount') : setCurrentPage('coverFor')
    }

    const setCoverAmountHandler = (value: string) => {
        value ? setCurrentPage('identityDetails') : setCurrentPage('coverAmount')
    }

    const setIdentityHandler = (value: string) => {
        value ? setCurrentPage('contactDetails') : setCurrentPage('identityDetails')
    }

    const setSubmitted = (value: string) => {
        value ? setCurrentPage('submitted') : setCurrentPage('contactDetails')
    }

    const renderPage = () => {
        switch (currentPage) {
            case 'coverFor':
                return [<Brokers key={'brokers'}/>, <CoverFor setCoverFor={setCoverForHandler} key={'coverForPage'}/>];
            case "coverAmount":
                return [<Brokers key={'brokers'}/>,
                    <CoverAmount setCoverAmount={setCoverAmountHandler} setCoverFor={setCoverForHandler}
                                 key={'coverAmountPage'}/>];
            case "identityDetails":
                return [<InformationHeader key={'informationHeader'}/>,
                    <IdentityDetails setCoverAmount={setCoverAmountHandler} setIdentity={setIdentityHandler}
                                     key={'identityDetails'}/>];
            case "contactDetails":
                return [<ContactDetails setIdentity={setIdentityHandler} setSubmitted={setSubmitted}
                                        key={'contactDetails'}/>];
            case "submitted":
                return [<Submitted key={'submitted'}/>];
        }
    };
    return (
        <div className={'form-container'}>
            {renderPage()}
        </div>
    )
}

export default Form;