import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import first from 'lodash/array/first';
import slice from 'lodash/array/slice';
import EntityStore from '../../stores/entity';
import TaggedArticlesStore from '../../stores/facetedStores/taggedArticles';
import * as FacetedModuleActions from '../../actions/facetedModule';
import Header from './header';
import Group from './group';
import InFocus from '../inFocus/inFocus';
import GroupRepeatable from './groupRepeatable';
import Hero from './hero';
import Ad from '@bxm/ad/src/google/components/ad';


class Section extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.context.executeAction(FacetedModuleActions.getPage, {
            page: 0,
            params: { tags: this.props.navigationTags },
            moduleConfig: this.props.moduleConfig
        });
    }

    render() {
        const {articles} = this.props;

        if (!articles.length) return null;

        return (
            <div className="container">

                <div className="row">
                    <Header tags={this.props.navigationTags}>
                        <Ad
                            className="ad--section-top-leaderboard"
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                        />
                    </Header>
                </div>

                <div className="row">
                    {/*Heroes*/}
                    <Hero firstHero={first(articles)} secondHero={articles[4] || {}} />
                    {/*Featured articles*/}
                    <InFocus articles={slice(articles, 1, 4)} className="section--fixed-col">
                        <Ad
                            className="ad--section-mrec"
                            displayFor={['small', 'medium', 'large']}
                            sizes="mrec"
                        />
                    </InFocus>
                </div>

                {/* Three teasers with ad - xlarge bp only*/}
                <div className="row hidden-for-large-only">
                    <Group articles={slice(articles, 4, 7)} modifier="3-items">
                        <Ad
                            className="ad--section-mrec"
                            displayFor={['xlarge']}
                            sizes={['double-mrec', 'mrec']}
                        />
                    </Group>
                </div>

                <div className="row">
                    {/* Four teasers with ad - hidden large bp only*/}
                    <Group
                        articles={slice(articles, 7, 11)}
                        className="hidden-for-large-only"
                        modifier="6-or-4-items"
                        teaserModifier="img-top">
                        <Ad
                            className="ad--section-middle-leaderboard"
                            displayFor={['small', 'medium', 'xlarge']}
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            targets={{
                                position: 2
                            }}
                        />
                    </Group>

                    {/* 6 teasers with ad - visible for large bp only*/}
                    <Group
                        articles={slice(articles, 5, 11)}
                        className="visible-for-large-only"
                        modifier="6-or-4-items"
                        teaserModifier="img-top">
                        <Ad
                            className="ad--section-middle-leaderboard"
                            displayFor="large"
                            sizes={{
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            targets={{
                                position: 2
                            }}
                        />
                    </Group>
                </div>

                {/* Group repeated when paginating */}
                <div className="row">
                    <GroupRepeatable articles={slice(articles, 11, 22)} />
                </div>
            </div>
        );
    }
}


Section.propTypes = {
    articles: PropTypes.array.isRequired,
    moduleConfig: PropTypes.any,
    navigationTags: PropTypes.array.isRequired
};

Section.defaultProps = {
    articles: [],
    navigationTags: []
};

Section.contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
};

export default connectToStores(Section, [TaggedArticlesStore, EntityStore], (stores) => {
    return {
        articles: stores.TaggedArticlesStore.getItems(),
        moduleConfig: stores.TaggedArticlesStore.getConfiguration(),
        navigationTags: stores.EntityStore.getNavigationTags()
    };
});
