import React, {Component, PropTypes} from 'react';
import breakpoints from '../../breakpoints';
import classnames from 'classnames';
import isUndefined from 'lodash/lang/isUndefined';
import imageResize from '@bxm/ui/lib/common/ImageResize';
// Components
import Title from '@bxm/article/lib/components/teaser/title';
import Image from '@bxm/article/lib/components/teaser/image';
import Summary from '@bxm/article/lib/components/teaser/summary';
import Tags from './tags';
import Source from './source';
import Icon from './icon';
import theme from './../helpers/theme';

class Teaser extends Component {
    static displayName = 'Teaser';

    static propTypes = {
        id: PropTypes.string,
        imageAltText: PropTypes.string,
        imageUrl: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        modifier: PropTypes.string,
        sizes: PropTypes.string,
        source: PropTypes.string,
        summary: PropTypes.string,
        tags: PropTypes.array,
        title: PropTypes.string.isRequired,
        className: PropTypes.string,
        imageSizes: PropTypes.object,
        lazyload: PropTypes.bool
    };

    static defaultProps = {
        imageAltText: '',
        modifier: 'img-left',
        sizes: '',
        lazyload: true
    };

    static imageConfig = {
        scale: imageResize.scale.BOTH,
        anchor: imageResize.anchor.MC,
        mode: imageResize.mode.CROP
    };

    static imageQuality = 80;

    static imageSizes = {
        base: {
            s: {w: 320, h: 264},
            m: {w: 400, h: 330},
            l: {w: 410, h: 340},
            xl: {w: 360, h: 300}
        },
        hero: {
            s: {w: 667, h: 556},
            m: {w: 940, h: 790},
            l: {w: 1140, h: 1100},
            xl: {w: 1140, h: 1070}
        },
        narrow: {
            s: {w: 640, h: 341},
            m: {w: 640, h: 341},
            l: {w: 400, h: 213},
            xl: {w: 300, h: 160}
        },
        'large': {
            s: {w: 320, h: 264},
            m: {w: 705, h: 593},
            l: {w: 563, h: 470},
            xl: {w: 750, h: 625}
        },
        'small-hero': {
            s: {w: 320, h: 264},
            m: {w: 400, h: 330},
            l: {w: 410, h: 340},
            xl: {w: 750, h: 625}
        },
        'img-left-to-hero': {
            s: {w: 320, h: 264},
            m: {w: 940, h: 790},
            l: {w: 750, h: 700},
            xl: {w: 750, h: 700}
        },
        'base-to-narrow': {
            s: {w: 320, h: 264},
            m: {w: 400, h: 330},
            l: {w: 410, h: 340},
            xl: {w: 300, h: 160}
        },
        'home-hero': {
            s: {w: 667, h: 556},
            m: {w: 940, h: 790},
            l: {w: 750, h: 625},
            xl: {w: 750, h: 625}
        },
        recommendations: {
            s: {w: 322, h: 256},
            m: {w: 420, h: 347},
            l: {w: 356, h: 295},
            xl: {w: 273, h: 238}
        }
    };

    getImgSizes(sizes, modifier) {
        if (!isUndefined(Teaser.imageSizes[sizes])) {
            return Teaser.imageSizes[sizes];
        } else if (!isUndefined(Teaser.imageSizes[modifier])) {
            return Teaser.imageSizes[modifier];
        }
        return Teaser.imageSizes.base;
    }

    render() {
        if (isUndefined(this.props.id)) return null;

        const {url, modifier, sizes, className, lazyload} = this.props;
        const gtmClass = `gtm-${this.props.id}`;
        const classNames = classnames('teaser', `teaser--${modifier}`, className);
        const imgSizes = this.getImgSizes(sizes, modifier);

        return (
            <article className={classNames}>
                <Image
                    alt={this.props.imageAltText}
                    breakpoints={breakpoints}
                    gtmClass={gtmClass}
                    imageUrl={this.props.imageUrl}
                    imageSizes={imgSizes}
                    link={url}
                    responsiveConfig={Teaser.imageConfig}
                    quality={Teaser.imageQuality}
                    lazyload={lazyload}
                >
                    <Icon {...this.props} />
                </Image>
                <div className="teaser__content">
                    <Tags tags={this.props.tags} />
                    <Title
                        gtmClass={gtmClass}
                        title={this.props.title}
                        url={url}
                    />
                    <Summary summary={this.props.summary} />
                    <Source source={this.props.source} />
                </div>
            </article>
        );
    }
}

export default theme(Teaser, 'source');
