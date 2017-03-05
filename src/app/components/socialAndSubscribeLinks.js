import React, {Component, PropTypes} from 'react';
import Magazine from './magazine';
import Newsletter from './newsletter';
import SocialContainer from './social/socialContainer';
import getBrand from './brand/utilities/getBrand';

export default class SocialAndSubscribeLinks extends Component {

    static propTypes = {
        content: PropTypes.object.isRequired
    };

    static contextTypes = {
        config: PropTypes.object.isRequired
    };

    render() {
        const {content} = this.props;
        const {config} = this.context;
        let brand = false;

        if (content.nodeType === 'BrandSection') {
           brand = getBrand(config, content.source);
            brand.gtmClass = 'gtm-follow-brand';
        }

        return (
            <div className="social-subscribe-links">
                {content.nodeType === 'BrandSection' && <Magazine {...this.props} />}
                <Newsletter content={content} />

                { brand ?
                    <SocialContainer
                        socialUrls={brand.social}
                        title={brand.title}
                        gtmClass={brand.gtmClass}
                        nodeType={content.nodeType}
                    />
                    :
                    <SocialContainer
                        nodeType={content.nodeType}
                    />
                }

            </div>
        )
    }
}
