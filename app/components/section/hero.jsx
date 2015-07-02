import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';
import {size} from 'lodash/collection';

export default class SectionHero extends Component {
    render() {
        const {firstHero, secondHero} = this.props;

        if ( size(firstHero) === 0 ) return null;

        return (
            <section className="section--heroes">
                {/*First hero*/}
                <Teaser {...firstHero} key={firstHero.id} modifier="hero" />
                {/*Second hero (lg breakpoint only*/}
                <Teaser {...secondHero} key={secondHero.id} modifier="hero" />
            </section>
        );
    }
}

SectionHero.propTypes = {
    firstHero: PropTypes.object.isRequired,
    secondHero: PropTypes.object.isRequired
};

SectionHero.defaultProps = {
    firstHero: {},
    secondHero: {}
};