import React, {Component, PropTypes} from 'react';
import breakpoints from '../../breakpoints';
import classnames from 'classnames';
// Components
import Title from '@bxm/article/lib/components/teaser/title';
import Image from '@bxm/article/lib/components/teaser/image';
import Summary from '@bxm/article/lib/components/teaser/summary';
import Tags from './tags';
import Source from './source';
import Icon from './icon';
import theme from './../helpers/theme';


class Teaser extends Component {

    render() {
        if (!this.props.id) return null;

        const {url, modifier, sizes, themeClass} = this.props;
        const gtmClass = `gtm-${this.props.id}`;
        const classNames = classnames('teaser', `teaser--${modifier}`, themeClass);
        let imgSizes = Teaser.imageSizes[sizes] || Teaser.imageSizes[modifier] || Teaser.imageSizes.base;

        return (
            <div className={classNames}>
                <Image
                    alt={this.props.imageAltText}
                    breakpoints={breakpoints}
                    gtmClass={gtmClass}
                    imageUrl={this.props.imageUrl}
                    imageSizes={imgSizes}
                    link={url}>
                    <Icon {...this.props} />
                </Image>
                <div className="teaser__content">
                    <Tags tags={this.props.articleTags} />
                    <Title
                        gtmClass={gtmClass}
                        title={this.props.title}
                        url={url}
                    />
                    <Summary summary={this.props.summary} />
                    <Source source={this.props.source} />
                </div>
            </div>
        );
    }
}

Teaser.propTypes = {
    articleTags: PropTypes.array,
    id: PropTypes.string,
    imageAltText: PropTypes.string,
    imageUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    modifier: PropTypes.string,
    sizes: PropTypes.string,
    source: PropTypes.string,
    summary: PropTypes.string,
    title: PropTypes.string.isRequired,
    themeClass: PropTypes.string
};

Teaser.defaultProps = {
    imageAltText: '',
    modifier: 'img-left',
    sizes: ''
};

Teaser.imageSizes = {
    base: {
        s: {w: 230, h: 190},
        m: {w: 400, h: 330},
        l: {w: 410, h: 340},
        xl: {w: 360, h: 300}
    },
    hero: {
        s: {w: 500, h: 420},
        m: {w: 940, h: 790},
        l: {w: 1140, h: 920},
        xl: {w: 1140, h: 920}
    },
    narrow: {
        s: {w: 300, h: 160},
        m: {w: 300, h: 160},
        l: {w: 300, h: 160},
        xl: {w: 300, h: 160}
    },
    'small-hero': {
        s: {w: 230, h: 190},
        m: {w: 400, h: 330},
        l: {w: 410, h: 340},
        xl: {w: 750, h: 625}
    }
};

export default theme(Teaser, 'source');
