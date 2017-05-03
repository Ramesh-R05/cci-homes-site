import React, { Component, PropTypes } from 'react';
import SocialIcon from './socialIcon';

export default class Social extends Component {
    static propTypes = {
        brand: PropTypes.string.isRequired,
        social: PropTypes.object.isRequired
    };

    static defaultProps = {
        social: {}
    };

    constructor(...args) {
        super(...args);
    }

    getSocialIcons(social) {
        const icons = [];
        let key;

        for (key in social) {
            if (social.hasOwnProperty(key)) {
                const icon = <SocialIcon key={key} name={key} url={social[key]} />;
                icons.push(icon);
            }
        }

        return icons;
    }

    render() {
        const { brand, social } = this.props;

        if (!brand) return null;

        return (
            <section className="brand-social">
                <p>
                    Follow <b>{brand}</b>
                </p>
                <div className="brand-social__links">
                    {this.getSocialIcons(social)}
                </div>
            </section>
        );
    }
}
