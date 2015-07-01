import React, {Component, PropTypes} from 'react';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import TeaserImage from '@bxm/article/lib/components/teaser/image';
import Icon from '../teaser/icon';
import breakpoints from '../../breakpoints';
import {getFirstTagNameForCategory} from '../../utils/tagUtils';

class FeedItem extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {gtmClass, item} = this.props;
        const {url, imageUrl, title, source} = item;
        const sourceClassName = `source-${FeedItem.sourceClassNameMap[source]}`;
        const topic = getFirstTagNameForCategory(this.props.item.articleTags, 'Topic');
        return (
            <li className={`feed-item ${sourceClassName}`}>
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
                        {topic}
                    </span>
                    <a className="feed-item__body-title" href={url}>{title}</a>
                </div>
            </li>
        );
    }

}

FeedItem.propTypes = {
    gtmClass: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired
};

FeedItem.imageQuality = 85;

FeedItem.teaserResponsiveConfig = {
    scale: imageResize.scale.BOTH,
    anchor: imageResize.anchor.MC,
    mode: imageResize.mode.CROP
};

FeedItem.teaserSizes = {
    s: { w: 132, h: 107 },
    m: { w: 132, h: 107 },
    l: { w: 132, h: 107 },
    xl: { w: 132, h: 107 }
};

FeedItem.sourceClassNameMap = {
    'homes+': 'homes-plus',
    'real living': 'real-living',
    'Belle': 'belle',
    'Australian House and Garden': 'house-and-garden'
};

export default FeedItem;
