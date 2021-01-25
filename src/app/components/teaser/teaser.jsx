import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { canUseDOM } from 'exenv';
import classNames from 'classnames';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import get from 'lodash/object/get';
// Components
import Title from '@bxm/article/lib/components/teaser/title';
import Image from '@bxm/article/lib/components/teaser/image';
import Summary from '@bxm/article/lib/components/teaser/summary';
import Ad from '@bxm/ad/lib/google/components/ad';
import GoogleNativeAdTeaserHomes from '@bxm/teaser/lib/components/native/googleNativeAdTeaserHomes';
import breakpoints from '../../breakpoints';
import Source from './source';
import theme from '../helpers/theme';

const LOGO_PATH = '/assets/images/source';
const HERO_LOGO_PATH = '/assets/images/brand-pages/herologos';
class Teaser extends Component {
    static displayName = 'Teaser';

    constructor(props, context) {
        super(props, context);

        this.adSlotName = `/${get(context, 'config.ads.networkId', '')}/${get(context, 'config.site.adTaggingId', '')}/${get(
            props,
            'googleNativeAds.adUnitPath',
            ''
        )}`;
        this.googleNativeAdUnitPath = get(props, 'googleNativeAds.adUnitPath', null);

        this.state = {
            nativeAdHasContentReady: false,
            nativeAdContent: false
        };
    }

    componentDidMount() {
        if (canUseDOM) {
            this.addEvents();
        }
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.onMessage);
    }

    static contextTypes = {
        config: PropTypes.object
    };

    static propTypes = {
        id: PropTypes.string,
        imageAltText: PropTypes.string,
        imageUrl: PropTypes.string,
        url: PropTypes.string,
        modifier: PropTypes.string,
        sizes: PropTypes.string,
        source: PropTypes.string,
        dateCreated: PropTypes.string,
        summary: PropTypes.string,
        title: PropTypes.string,
        className: PropTypes.string,
        lazyload: PropTypes.bool,
        onClick: PropTypes.func,
        gtmClass: PropTypes.string,
        googleNativeAds: PropTypes.oneOfType([
            PropTypes.shape({
                targets: PropTypes.shape({
                    kw: PropTypes.string
                }),
                label: PropTypes.string,
                adUnitPath: PropTypes.string,
                adPositionClassName: PropTypes.string
            }),
            PropTypes.bool
        ])
    };

    static defaultProps = {
        id: null,
        source: null,
        summary: null,
        dateCreated: null,
        className: '',
        imageUrl: '',
        url: '',
        title: '',
        gtmClass: '',
        imageAltText: '',
        modifier: 'img-left',
        sizes: '',
        lazyload: true,
        onClick: function onClick() {},
        googleNativeAds: false
    };

    static imageConfig = {
        scale: imageResize.scale.BOTH,
        anchor: imageResize.anchor.MC,
        mode: imageResize.mode.CROP
    };

    static imageQuality = 75;

    // These sizes match the native ad size ratio of 432 x 267
    // TODO - Review if all of these sizes are still used and clean up any unused items
    static imageSizes = {
        base: {
            s: { w: 320, h: 198 },
            m: { w: 400, h: 247 },
            l: { w: 410, h: 253 },
            xl: { w: 360, h: 222 }
        },
        hero: {
            s: { w: 667, h: 412 },
            m: { w: 940, h: 580 },
            l: { w: 1140, h: 704 },
            xl: { w: 1140, h: 704 }
        },
        narrow: {
            s: { w: 640, h: 396 },
            m: { w: 640, h: 396 },
            l: { w: 400, h: 247 },
            xl: { w: 300, h: 185 }
        },
        large: {
            s: { w: 320, h: 198 },
            m: { w: 705, h: 435 },
            l: { w: 563, h: 347 },
            xl: { w: 750, h: 463 }
        },
        'small-hero': {
            s: { w: 320, h: 198 },
            m: { w: 400, h: 247 },
            l: { w: 410, h: 253 },
            xl: { w: 750, h: 463 }
        },
        'img-top': {
            s: { w: 690, h: 426 },
            m: { w: 467, h: 288 },
            l: { w: 301, h: 186 },
            xl: { w: 301, h: 186 }
        },
        'img-left-to-hero': {
            s: { w: 320, h: 198 },
            m: { w: 940, h: 581 },
            l: { w: 750, h: 464 },
            xl: { w: 750, h: 464 }
        },
        'base-to-narrow': {
            s: { w: 320, h: 197 },
            m: { w: 400, h: 247 },
            l: { w: 410, h: 253 },
            xl: { w: 300, h: 185 }
        },
        'home-hero': {
            s: { w: 690, h: 426 },
            m: { w: 963, h: 595 },
            l: { w: 633, h: 391 },
            xl: { w: 633, h: 391 }
        },
        'brand-list': {
            s: { w: 322, h: 199 },
            m: { w: 420, h: 260 },
            l: { w: 300, h: 185 },
            xl: { w: 300, h: 185 }
        },
        recommendations: {
            s: { w: 322, h: 199 },
            m: { w: 420, h: 260 },
            l: { w: 356, h: 220 },
            xl: { w: 273, h: 168 }
        },
        'latest-real-homes': {
            l: { w: 218, h: 135 },
            xl: { w: 218, h: 135 }
        }
    };

    addEvents() {
        window.addEventListener('message', this.onMessage);
    }

    onMessage = e => {
        const { data } = e;

        if (data && data.message === 'adContentAvailable' && data.adID === this.adSlotName) {
            this.setState({
                nativeAdHasContentReady: true,
                nativeAdContent: data.content
            });
            window.removeEventListener('message', this.onMessage);
        }
    };

    getGTMClass = () => {
        const { id } = this.props;

        return id ? `gtm-${id}` : '';
    };

    static getImgSizes(sizes, modifier) {
        if (Teaser.imageSizes[sizes]) {
            return Teaser.imageSizes[sizes];
        }

        if (Teaser.imageSizes[modifier]) {
            return Teaser.imageSizes[modifier];
        }

        return Teaser.imageSizes.base;
    }

    render() {
        const { config } = this.context;
        const {
            url,
            modifier,
            sizes,
            lazyload,
            dateCreated,
            source,
            className,
            id,
            gtmClass,
            imageAltText,
            imageUrl,
            title,
            summary,
            googleNativeAds,
            onClick
        } = this.props;
        const { nativeAdHasContentReady, nativeAdContent } = this.state;

        if (!id) {
            return null;
        }

        const rootClass = classNames('teaser', {
            [`teaser--${modifier}`]: !!modifier,
            [`${className}`]: !!className
        });

        const imgSizes = Teaser.getImgSizes(sizes, modifier);

        const sourceLogo = source ? config.get(`article.sources.${source.toLowerCase()}.logo`) : '';
        let sourceId = '';
        let sourceImgUrl = '';

        if (sourceLogo) {
            sourceImgUrl = `${LOGO_PATH}/${sourceLogo}`;
        }

        if (modifier === 'hero') {
            const siteBrands = config.get('brands.site') || [];
            const brandSource = siteBrands.filter(brand => brand.title === source);
            sourceImgUrl = `${HERO_LOGO_PATH}/${sourceLogo}`;
            sourceId = brandSource.length && brandSource[0].id;
        }

        const brandImage = sourceImgUrl ? (
            <img className={`teaser__brand-image teaser__brand-image--${sourceId}`} alt={source} src={sourceImgUrl} />
        ) : null;

        const showGoogleNativeAds = config.isFeatureEnabled('googleNativeAds');

        return (
            <article className={rootClass}>
                {!googleNativeAds && !nativeAdHasContentReady && !nativeAdContent && (
                    <div>
                        <Image
                            alt={imageAltText}
                            breakpoints={breakpoints}
                            gtmClass={gtmClass || `gtm-${id}`}
                            imageUrl={imageUrl}
                            imageSizes={imgSizes}
                            link={url}
                            responsiveConfig={Teaser.imageConfig}
                            quality={Teaser.imageQuality}
                            lazyload={lazyload}
                            className={gtmClass}
                        />

                        {sizes === 'home-hero' ? <div className="hero__background"> {brandImage} </div> : null}
                        <div className="teaser__content">
                            <Title gtmClass={gtmClass || `gtm-${id}`} title={title} url={url} />
                            <Summary summary={summary} />
                            <Source source={source} dateCreated={dateCreated} />
                        </div>
                    </div>
                )}

                {showGoogleNativeAds && googleNativeAds && (
                    <Ad
                        className="ad--slot-google-native"
                        sizes="googleNativeAd"
                        isGoogleNativeAd
                        nativeAdPath={this.googleNativeAdUnitPath}
                        label={googleNativeAds.label}
                        targets={googleNativeAds.targets}
                        pageLocation={Ad.pos.body}
                    />
                )}

                {showGoogleNativeAds && googleNativeAds && nativeAdHasContentReady && nativeAdContent && (
                    <div id={`GoogleNativeAd-${googleNativeAds.label}`} className="google-native-ad-teaser-container">
                        <GoogleNativeAdTeaserHomes
                            nativeAdContent={nativeAdContent}
                            gtmClassName={this.getGTMClass()}
                            googleNativeAds={googleNativeAds}
                            onClick={onClick}
                        />
                    </div>
                )}
            </article>
        );
    }
}

export default theme(Teaser, 'source');
