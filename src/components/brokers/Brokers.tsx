import Zurich from '../../icons/zurich-logo.svg';
import Aig from '../../icons/aig.svg';
import LiverpoolVictoria from '../../icons/liverpool-victoria.svg';
import LegalAndGeneral from '../../icons/legal-and-general.svg';
import Aviva from '../../icons/aviva.svg';
import Exeter from '../../icons/exeter.svg';
import './brokers.css';
import {useEffect, useState} from "react";

function Brokers() {
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(document.documentElement.clientWidth);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    const buildBrokerImages = () => {
        const brokers = [
            {logo: Zurich, alt: 'Zurich'},
            {logo: Aig, alt: 'AIG'},
            {logo: LiverpoolVictoria, alt: 'Liverpool Victoria'},
            {logo: LegalAndGeneral, alt: 'Legal & General'},
            {logo: Aviva, alt: 'Aviva'},
            {logo: Exeter, alt: 'The Exeter'}
        ]
        const requiredNumberOfLogos = windowWidth <= 375 ? 4 : 5
        for (let i = requiredNumberOfLogos; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [brokers[i], brokers[j]] = [brokers[j], brokers[i]];
        }
        return brokers.slice(0, requiredNumberOfLogos).map((broker, index) => {
            return <img src={broker.logo} alt={broker.alt} key={index} data-testid={'broker-logo'}/>
        })
    }

    return (
        <div className={'broker-container'}>
            <span data-testid={'broker-title'}><h2>Compare <span className={'highlight'}>Test</span> Quotes</h2></span>
            <span className={'broker-logos'}>{buildBrokerImages()}</span>
        </div>
    )
}

export default Brokers;