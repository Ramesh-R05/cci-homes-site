import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';


export default class GroupFeatured extends Component {
    render() {
        const {firstHero, secondHero} = this.props;

        if (!firstHero || !secondHero) return null;

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

GroupFeatured.propTypes = {
    firstHero: PropTypes.object.isRequired,
    secondHero: PropTypes.object.isRequired
};

GroupFeatured.defaultProps = {
    firstHero: [],
    secondHero: []
};
