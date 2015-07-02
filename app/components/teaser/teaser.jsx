import React, {Component, PropTypes} from 'react';
import breakpoints from '../../breakpoints';
import classnames from 'classnames';
import {isUndefined} from 'lodash/lang';
import imageResize from '@bxm/ui/lib/common/ImageResize';
// Components
import Title from '@bxm/article/lib/components/teaser/title';
import Image from '@bxm/article/lib/components/teaser/image';
import Summary from '@bxm/article/lib/components/teaser/summary';
import Tags from './tags';
import Source from './source';
import Icon from './icon';
import theme from './../helpers/theme';
import hoist from 'hoist-non-react-statics';

class Teaser extends Component {

    getImgSizes(sizes, modifier) {
        if ( !isUndefined(Teaser.imageSizes[sizes])) {
            return Teaser.imageSizes[sizes];
        } else if ( !isUndefined(Teaser.imageSizes[modifier])) {
            return Teaser.imageSizes[modifier];
        }
        return Teaser.imageSizes.base;
    }

    render() {
        if ( isUndefined(this.props.id)) return null;

        const {url, modifier, sizes, themeClass} = this.props;
        const gtmClass = `gtm-${this.props.id}`;
        const classNames = classnames('teaser', `teaser--${modifier}`, themeClass);
        const imgSizes = this.getImgSizes(sizes, modifier);

        return (
            <div className={classNames}>
                <Image
                    alt={this.props.imageAltText}
                    breakpoints={breakpoints}
                    gtmClass={gtmClass}
                    imageUrl={this.props.imageUrl}
                    imageSizes={imgSizes}
                    link={url}
                    responsiveConfig={Teaser.imageConfig}>
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
    themeClass: PropTypes.string,
    imageSizes: PropTypes.object
};

Teaser.defaultProps = {
    imageAltText: '',
    modifier: 'img-left',
    sizes: ''
};
Teaser.imageSizes = {
    base: {
        s: {w: 320, h: 264},
        m: {w: 400, h: 330},
        l: {w: 410, h: 340},
        xl: {w: 360, h: 300}
    },
    hero: {
        s: {w: 667, h: 650},
        m: {w: 940, h: 790},
        l: {w: 1140, h: 920},
        xl: {w: 1140, h: 920}
    },
    narrow: {
        s: {w: 640, h: 341},
        m: {w: 640, h: 341},
        l: {w: 300, h: 160},
        xl: {w: 300, h: 160}
    },
    'small-hero': {
        s: {w: 320, h: 264},
        m: {w: 400, h: 330},
        l: {w: 410, h: 340},
        xl: {w: 750, h: 625}
    }
};

Teaser.imageConfig = {
    scale: imageResize.scale.BOTH,
    anchor: imageResize.anchor.MC,
    mode: imageResize.mode.CROP
};

export default hoist( theme( Teaser, 'source'), Teaser);