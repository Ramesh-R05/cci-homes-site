import React, {Component, PropTypes} from 'react';
import slice from 'lodash/array/slice';
import Teaser from '../teaser/teaser';
import Ad from '@bxm/ad/lib/google/components/ad';

export default class Featured extends Component {

    static propTypes = {
        articles: PropTypes.array.isRequired,
        nodeType: PropTypes.string.isRequired
    };

    static defaultProps = {
        articles: []
    };

    render() {
        const {articles, nodeType} = this.props;

        if (articles.length === 0) return null;
        const item = articles[0];

        return (
            <section className="section__featured gtm-topteaserlist-index">
                        <Ad
                            className="ad--section-mrec teaser"
                            displayFor='medium'
                            sizes={['double-mrec', 'mrec']}
                            targets={{position: 1}}
                        />
                        <Teaser {...item} key={item.id} sizes="brand-list" modifier="img-top" gtmClass="gtm-topteaserlist-index" />
                        <Ad
                            className="ad--section-mrec"
                            displayFor='small'
                            sizes={['double-mrec', 'mrec']}
                            targets={{position: 1}}
                        />
                        {slice(articles, 1, 6).map(item => <Teaser {...item} key={item.id} sizes="brand-list" modifier="img-top" gtmClass="gtm-topteaserlist-index" />)}
                        <Ad
                            className="ad--section-mrec teaser"
                            displayFor="medium"
                            sizes={{
                                medium: 'mrec'
                            }}
                            targets={{position: 2}}
                        />
            </section>
        );
    }
}
