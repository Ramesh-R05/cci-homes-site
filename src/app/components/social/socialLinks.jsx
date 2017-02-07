import React, { Component, PropTypes } from 'react';
import SocialIcons from './socialIcons';

export default class SocialLinks extends Component {

    static propTypes = {
        links: PropTypes.array.isRequired
    };

    static defaultProps = {
        links: []
    };

    render() {
        const { links } = this.props;

        return (
            <section className="get-social">
                <div className="get-social__links">
                    { links.map((link, i) => <SocialIcons key={i} { ...link } />) }
                </div>
            </section>
        );
    }
}
