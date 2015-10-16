import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import TeaserImage from '@bxm/article/lib/components/teaser/image';
import Icon from '../teaser/icon';
import TagLink from '@bxm/tags/lib/components/link';
import breakpoints from '../../breakpoints';
import getFirstTagNameForCategory from '@bxm/tags/lib/utils/getFirstTagNameForCategory';
import theme from '../helpers/theme';


class FeedItem extends Component {

    static propTypes = {
        gtmClass: PropTypes.string.isRequired,
        item: PropTypes.object.isRequired,
        themeClass: PropTypes.string
    };

    static imageQuality = 85;

    static teaserResponsiveConfig = {
        scale: imageResize.scale.BOTH,
        anchor: imageResize.anchor.MC,
        mode: imageResize.mode.CROP
    };

    static teaserSizes = {
        s: { w: 132, h: 107 },
        m: { w: 132, h: 107 },
        l: { w: 132, h: 107 },
        xl: { w: 132, h: 107 }
    };

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {gtmClass, item, themeClass} = this.props;
        const {url, imageUrl, title} = item;
        const classNames = classnames('feed-item', themeClass);
        const tagName = getFirstTagNameForCategory(this.props.item.tags, 'Topic');
        const textLink = classnames('feed-item__body-title', gtmClass);
        return (
            <li className={classNames}>
                <TeaserImage
                    link={url}
                    imageUrl={imageUrl}
                    alt={title}
                    gtmClass={gtmClass}
                    breakpoints={breakpoints}
                    imageSizes={FeedItem.teaserSizes}
                    responsiveConfig={FeedItem.teaserResponsiveConfig}
                    quality={FeedItem.imageQuality}
                >
                    <Icon nodeType={item.nodeType} video={item.video} />
                </TeaserImage>
                <div className="feed-item__body">
                    <span className="feed-item__body-source">
                        <TagLink name={tagName} className="feed-item__body-source" />
                    </span>
                    <a className={textLink} href={url}>{title}</a>
                </div>
            </li>
        );
    }
}

export default theme(FeedItem, 'item.source');
