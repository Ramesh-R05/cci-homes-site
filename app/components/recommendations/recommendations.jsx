import React, {Component, PropTypes} from 'react';
import Teaser from '../teaser/teaser';
import Ad from '@bxm/ad/lib/google/components/ad';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';

export default class Recommendations extends Component {

    static contextTypes = {
        config: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    displayItem(item) {
        if (item.showAd) {
            return (
                <Ad
                    className="teaser ad--recommendations"
                    displayFor={item.displayFor}
                    sizes={['mrec']}
                    targets={{position: item.position}}
                    />
            );
        }

        return <Teaser {...item} key={item.id} modifier="img-top" sizes="recommendations" />;
    }

    render() {
        if (!this.context.config.isFeatureEnabled('recommendations')) return null;
        if (!canUseDOM) return null;

        // used for testing, data will come from GTM tag when available
        let testItems;
        try {
            testItems = window.App.context.dispatcher.stores.HomeArticles.items;
        } catch(e) {
            testItems = [];
        }

        const recommendationItems = testItems.slice(0, 10);
        if (testItems.length > 0) {
            recommendationItems.splice(4, 0, {showAd: true, position: 1, displayFor: ['small', 'medium', 'large', 'xlarge']});
            recommendationItems.splice(9, 0, {showAd: true, position: 2, displayFor: ['small', 'medium', 'large']});
            recommendationItems.splice(11, 0, {showAd: true, position: 3, displayFor: ['xlarge']});
        }
        // end test data

        return (
            <div className="recommendations">
                <h2>
                    <span className="recommendations__heading">YOU MAY <b>ALSO LIKE</b></span>
                </h2>

                <div className="dacrm-recommendations__teaser-list">
                    {recommendationItems.map(item => this.displayItem(item))}
                </div>
            </div>
        );
    }

}
