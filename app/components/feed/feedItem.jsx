import React, {Component, PropTypes} from 'react';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import TeaserImage from '@bxm/article/lib/components/teaser/image';
import Icon from '../teaser/icon';
import breakpoints from '../../breakpoints';

class FeedItem extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {gtmClass, item} = this.props;
        const {url, imageUrl, title, topic} = item;

        return (
            <li className={`feed-item topic-${topic}`}>
                <TeaserImage
                    link={url}
                    imageUrl={imageUrl}
                    alt={title}
                    gtmClass={gtmClass}
                    breakpoints={breakpoints}
                    imageSizes={FeedItem.teaserSizes}
                    responsiveConfig={FeedItem.teaserResponsiveConfig}
                >
                    <Icon nodeType={item.nodeType} video={item.video} />
                </TeaserImage>
                <div className="feed-item__body">
                    <span className="feed-item__body-topic">{topic}</span>
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

export default FeedItem;
