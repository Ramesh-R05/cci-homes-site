import React, { Component, PropTypes } from 'react';
import size from 'lodash/collection/size';
import Teaser from '../teaser/teaser';

export default class SectionHero extends Component {
    static displayName = 'SectionHero';

    static propTypes = {
        firstHero: PropTypes.object,
        secondHero: PropTypes.object
    };

    static defaultProps = {
        firstHero: {},
        secondHero: {}
    };

    render() {
        const { firstHero, secondHero } = this.props;

        if (size(firstHero) === 0) return null;

        return (
            <section className="section--heroes">
                {/* First hero */}
                <Teaser {...firstHero} key={firstHero.id} modifier="hero" lazyload={false} />
                {/* Second hero (lg breakpoint only */}
                <Teaser {...secondHero} key={secondHero.id} modifier="hero" />
            </section>
        );
    }
}
