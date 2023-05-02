import { css } from 'styled-components';

export const mobile = (props) => {
    return css`
        @media only screen and (max-width: 380px) {
            ${props}
        }
    `;
};

export const mobileOrPc = (defaultValue, mobileValue) => {
    const value = window.innerWidth >= 1113 ? defaultValue : mobileValue;
    return parseInt(value);
};
