import React, {Component, PropTypes} from 'react';
import imageResize from '@bxm/ui/lib/common/ImageResize';
import TeaserImage from '@bxm/article/lib/components/teaser/image';
import TeaserIcon from './teaserIcon';
import breakpoints from '../../breakpoints';

class FeedItem extends Component {

    constructor(props, context) {
        super(props, context);
    }

    static getTeaserIconType(item) {
        const nodeType = (item.nodeType || '').toLowerCase();
        if (item.video) {
            return 'video';
        } else if (nodeType === 'gallery') {
            return 'gallery';
        }
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
                    <TeaserIcon type={FeedItem.getTeaserIconType(item)}/>
                </TeaserImage>
                <div className="feed-item__body">
                    <a className="feed-item__body-topic" href="#">{topic}</a>
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
