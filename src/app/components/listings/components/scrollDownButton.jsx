import React from 'react';
import { canUseDOM } from 'exenv';
import SVG from 'react-inlinesvg';

export default function ScrollDownButton() {
    const handleScrollDownButtonClick = () => {
        // TODO - refactor this to use refs instead
        const companyProfileElement = document.querySelector('.company-profile-section');

        if (canUseDOM && companyProfileElement) {
            window.scrollTo({
                top: companyProfileElement.getBoundingClientRect().top + window.scrollY,
                left: 0,
                behavior: 'smooth'
            });
        }
    };

    return (
        <button type="button" className="scroll-down-button" onClick={handleScrollDownButtonClick}>
            <SVG src="/assets/icons/listings/down-arrow-icon.svg" alt="Scroll down button">
                <img src="/assets/icons/listings/down-arrow-icon.svg" alt="Scroll down button" />
            </SVG>
        </button>
    );
}
