import React, { Component, PropTypes } from 'react';
import SocialIcons from './socialIcons';

export default class SocialLinks extends Component {

    static propTypes = {
        links: PropTypes.array.isRequired,
        nodeType: PropTypes.string.isRequired,
        title: PropTypes.string
    };

    static defaultProps = {
        links: []
    };

    render() {
        const { links, nodeType, title } = this.props;

        return (
            <section className="get-social">
                <div className="get-social__links">
                    { !nodeType && (nodeType !== 'Homepage' && nodeType !== 'BrandSection') ? null : <p className="social-links__text">{`Follow ${title}`}</p> }
                    { links.map((link, i) => <SocialIcons key={i} {...link} {...this.props} />) }
                </div>
            </section>
        );
    }
}
