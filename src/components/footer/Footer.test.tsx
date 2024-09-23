import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import Footer from "../../components/footer/Footer";

test('footer components exist', async () => {
    render(<Footer/>);
    const socialMediaLogos = await screen.findAllByTestId('social-media-logo')
    const privacyImage = screen.getByTestId('privacy-image');
    const copyrightText = screen.getByTestId('copyright-text');
    expect(privacyImage).toBeTruthy();
    expect(socialMediaLogos.length).toEqual(3);
    expect(copyrightText).toHaveTextContent('© Copyright 2020 Test. All Rights Reserved.')
})