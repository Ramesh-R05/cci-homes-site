import React, { Component, PropTypes } from 'react';
import SocialIcon from './socialIcon';

export default class Social extends Component {
    static displayName = 'Social';

    static propTypes = {
        brand: PropTypes.string.isRequired,
        social: PropTypes.object
    };

    static defaultProps = {
        social: {}
    };

    static getSocialIcons(social) {
        return Object.keys(social).map((item, i) => {
            const key = `social-${i}-${social[item]}`;
            return <SocialIcon key={key} name={item} url={social[item]} />;
        });
    }

    render() {
        const { brand, social } = this.props;

        if (!brand) return null;

        return (
            <section className="brand-social">
                <p>
                    Follow <b>{brand}</b>
                </p>
                <div className="brand-social__links">{Social.getSocialIcons(social)}</div>
            </section>
        );
    }
}
