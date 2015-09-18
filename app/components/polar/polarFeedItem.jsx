import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import has from 'lodash/object/has';
import FeedItem from '../feed/feedItem';
import Icon from '../teaser/icon';
import polarAd from '@bxm/ad/lib/polar/decorators/polarAd';
import polarConfig from '@bxm/ad/lib/polar/decorators/polarConfig';

@polarConfig
@polarAd
class PolarFeedItem extends Component {
    static propTypes = {
        gtmClass: PropTypes.string.isRequired,
        ad: PropTypes.shape({
            label: PropTypes.string
        }).isRequired,
        item: PropTypes.object.isRequired,
        modifier: PropTypes.string,
        nativeAd: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {ad, item, nativeAd, gtmClass} = this.props;

        if (!has(ad, 'label') || !has(nativeAd, 'response')) {
            const key = 'feed-item-5';

            return (
                <FeedItem
                    key={key}
                    gtmClass={key}
                    item={item}
                />
            );
        }

        const nativeAdModel = nativeAd.response.model;
        const textLink = classNames('feed-item__body-title', gtmClass);

        return (
            <li className="feed-item polar-feed-item">
                <a href={nativeAdModel.link} className={gtmClass}>
                    <img src={nativeAdModel.image.href} alt={nativeAdModel.image.caption} />
                    <Icon icon={nativeAdModel.custom.icon} />
                </a>
                <div className="feed-item__body">
                    <span className="feed-item__body-source">
                        Powered by {nativeAdModel.sponsor.name}
                    </span>
                    <a className={textLink} href={nativeAdModel.link}>{nativeAdModel.title}</a>
                </div>
            </li>
        );
    }
}

export default PolarFeedItem;
