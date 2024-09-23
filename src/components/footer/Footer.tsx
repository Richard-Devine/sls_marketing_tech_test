import Locked from '../../icons/locked.svg';
import Facebook from '../../icons/facebook-logo.svg';
import X from '../../icons/x-logo.svg';
import LinkedIn from '../../icons/linkedIn-logo.svg';
import './footer.css';

function Footer() {

    const buildLogoComponent = () => {
        const socialLogos = [
            {logo: Facebook, alt: 'facebook'},
            {logo: X, alt: 'x'},
            {logo: LinkedIn, alt: 'linkedIn'}
        ]
        return socialLogos.map((socialLogo, index) => {
            return <img src={socialLogo.logo} alt={socialLogo.logo.alt} key={index} data-testid={'social-media-logo'}/>
        })
    }

    return (
        <div className={'footer-container'}>
            <div className={'small-text privacy-footer'}>
                <p data-testid={'privacy-text'}>
                    <img src={Locked} alt={'Locked'} data-testid={'privacy-image'}/>
                    &nbsp;Safe & Secure
                    <br/>
                    <br/>
                    Your privacy is extremely important to us
                </p>
            </div>
            <div className={'logo-footer'}>
                <span className={'logo-container'}>{buildLogoComponent()}</span>
                <span className={'small-text copyright-text'}>
                    <p className={'small-text copyright-text'} data-testid={'copyright-text'}>
                        &copy; Copyright 2020 Test. All Rights Reserved.
                    </p>
                </span>
            </div>
        </div>
    )
}

export default Footer;