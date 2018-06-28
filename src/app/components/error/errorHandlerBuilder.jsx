import React, { Component } from 'react';
import has from 'lodash/object/has';

const codeMessages = {
    404: {
        title: 'Oops! We\'re sorry!',
        content: [
            'We could not find the page you were looking for.'
        ]
    },
    500: {
        title: 'Oh no! Something has gone wrong.',
        content: [
            'It seems the page you were trying to view is temporarily unavailable.',
            'Please try again shortly.'
        ]
    }
};

export default code => class ErrorHandler extends Component {
    static displayName = 'ErrorHandler';
    static DEFAULT_CODE = 500;

    render() {
        if (!has(codeMessages, code)) return null;

        const { title, content } = codeMessages[code];
        return (
            <section className="error-page container">
                <h1 className="error-page__title">{title}</h1>
                {content.map((item, i) => (
                    <p key={i} className="error-page__body-item">{item}</p>
                ))}
                <p className="error-page__footer">
                    <a href="/" className="error-page__homepage-link">
                        Return to homepage
                    </a>
                </p>
            </section>
        );
    }
};
