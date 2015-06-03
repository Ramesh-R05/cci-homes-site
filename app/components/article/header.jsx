import React, {Component, PropTypes} from 'react';
import HeroImage from '@bxm/article/lib/components/hero/image';
import Summary from '@bxm/article/lib/components/header/summary';
import Title from '@bxm/article/lib/components/header/title';
import viewport from '../helpers/viewport';
import breakpoints from '../../breakpoints';

const MOBILE_RANGE = parseInt(breakpoints.smallRangeMax, 10);

class Header extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {title, summary} = this.props;
        const {imageUrl, imageAltText, imageCaption} = this.props.heroItem;
        const {width: windowWidth} = this.props.viewport;

        const titleEl = <Title title={title}/>;
        const summaryEl = <Summary summary={summary}/>
        const heroEl = <HeroImage
            url={imageUrl}
            alt={imageAltText}
            caption={imageCaption}
            breakpoints={breakpoints}/>;

        if (windowWidth > MOBILE_RANGE ) {
            return (
                <header className="article__header">
                    {titleEl}
                    {heroEl}
                    {summaryEl}
                </header>
            );
        }

        return (
            <header className="article__header">
                {heroEl}
                {titleEl}
                {summaryEl}
            </header>
        );
    }

}

Header.propTypes = {
    heroItem: PropTypes.object.isRequired,
    summary: PropTypes.string,
    title: PropTypes.string.isRequired,
    viewport: PropTypes.object.isRequired
};

Header.defaultProps = {
    heroItem: {
        imageUrl: '',
        imageAltText: '',
        imageCaption: ''
    },
    viewport: {}
};

export default viewport(Header);
