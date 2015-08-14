import React, {Component, PropTypes} from 'react';
import {canUseDOM} from 'react/lib/ExecutionEnvironment';
import {connectToStores} from '@bxm/flux';
import first from 'lodash/array/first';
import slice from 'lodash/array/slice';
import cx from 'classnames';
import EntityStore from '../../stores/entity';
import TaggedArticlesStore from '../../stores/facetedStores/taggedArticles';
import * as FacetedModuleActions from '../../actions/facetedModule';
import Header from './header';
import Group from './group';
import InFocus from '../inFocus/inFocus';
import GroupRepeatable from './groupRepeatable';
import Hero from './hero';
import Ad from '@bxm/ad/lib/google/components/ad';
import LoadMore from '../loadMore/loadMore';
import {load} from '@bxm/config';
const config = load();

class Section extends Component {

    static contextTypes = {
        getStore: PropTypes.func,
        executeAction: PropTypes.func
    };

    static propTypes = {
        articles: PropTypes.array.isRequired,
        paging: PropTypes.object.isRequired,
        moduleConfig: PropTypes.object,
        navigationTags: PropTypes.array.isRequired,
        currentPage: PropTypes.number.isRequired,
        isLoading: PropTypes.bool.isrequired,
        isSideMenuOpen: PropTypes.bool
    };

    static defaultProps = {
        articles: [],
        paging: {
            pages: 0,
            isLoading: false
        },
        currentPage: 0,
        moduleConfig: {},
        navigationTags: [],
        isSideMenuOpen: false
    };

    constructor(props, context) {
        super(props, context);
        this.nbLoadMoreClicks = 0;
    }

    getGroupRepeatableItemLength() {
        const nbFirstPageItems = config.pagination.nbFirstPageItems;
        const nbLoadMoreItems = config.pagination.nbLoadMoreItems;

        if ((this.props.currentPage + 1) === this.props.paging.pages) {
            return this.props.articles.length;
        }
        if ( this.nbLoadMoreClicks === 0) {
            return this.props.articles.length;
        }
        return nbFirstPageItems + nbLoadMoreItems * this.nbLoadMoreClicks;
    }

    getAsyncData() {
        const page = this.props.currentPage ? this.props.currentPage : 0;
        let params;

        // SEO Task : params = { pagestart: 0, pageend: page };
        params = {
            page: page,
            tags: this.props.navigationTags
        };

        this.context.executeAction(FacetedModuleActions.getPage, {
            params: params,
            moduleConfig: this.props.moduleConfig
        });
    }

    componentWillMount() {
        if (!canUseDOM) this.getAsyncData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentPage !== this.props.currentPage) {
            this.nbLoadMoreClicks++;
            this.getAsyncData();
        }
    }

    render() {
        const {articles} = this.props;
        let loadMoreBtn;

        if (!articles.length) return null;

        if (config.isFeatureEnabled('loadMoreBtn') === true) {
            loadMoreBtn = <LoadMore currentPage={this.props.currentPage} totalPages={this.props.paging.pages} isLoading={this.props.isLoading}/>;
        }

        const menuSliderClassName = cx('side-menu-slider', {
            'side-menu-slider--side-menu-open': this.props.isSideMenuOpen
        });

        return (
            <div className={cx('container section-landing', menuSliderClassName)}>
                <div className="row">
                    <Header tags={this.props.navigationTags}>
                        <Ad
                            className="ad--section-top-leaderboard"
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            targets={{position: 1}}
                        />
                    </Header>
                </div>

                <div className="row">
                    {/*Heroes*/}
                    <Hero firstHero={first(articles)} secondHero={articles[4] || {}} />
                    {/* In Focus articles */}
                    <div className="fixed-column fixed-column--in-focus">
                        <InFocus articles={slice(articles, 1, 4)} modifier="right">
                            <Ad
                                className="ad--section-mrec"
                                displayFor={['small', 'medium', 'large']}
                                sizes="mrec"
                                targets={{position: 1}}
                            />
                        </InFocus>
                    </div>
                </div>
                {/* Three teasers with ad - xlarge bp only*/}
                <div className="row hidden-for-large-only">
                    <Group
                        articles={slice(articles, 4, 7)}
                        modifier="3-items"
                        polarAd={{
                            label: 'section_teaser_1',
                            index: 1
                        }}>
                        <Ad
                            className="ad--section-mrec"
                            displayFor={['xlarge']}
                            sizes={['double-mrec', 'mrec']}
                            targets={{position: 1}}
                        />
                    </Group>
                </div>
                <div className="row">
                    {/* Four teasers with ad - hidden large bp only*/}
                    <Group
                        articles={slice(articles, 7, 11)}
                        className="hidden-for-large-only"
                        modifier="6-or-4-items"
                        teaserModifier="img-top"
                    />
                    {/* 6 teasers with ad - visible for large bp only*/}
                    <Group
                        articles={slice(articles, 5, 11)}
                        className="visible-for-large-only"
                        modifier="6-or-4-items"
                        polarAd={{
                            label: 'section_teaser_1',
                            index: 0
                        }}
                        teaserModifier="img-top"
                    />
                </div>
                {/* Group repeated when paginating */}
                <div className="row">
                    <GroupRepeatable articles={slice(articles, 11, this.getGroupRepeatableItemLength())} />
                </div>
                {/* LoadMore btn*/}
                {loadMoreBtn}
                {/* Bottom ad */}
                <div className="row">
                    <div className="columns small-12">
                        <Ad
                            className="ad--section-bottom-leaderboard"
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            targets={{position: 3}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default connectToStores(Section, [TaggedArticlesStore, EntityStore], (stores) => {
    return {
        articles: stores.TaggedArticlesStore.getItems(),
        moduleConfig: stores.TaggedArticlesStore.getConfiguration(),
        navigationTags: stores.EntityStore.getNavigationTags(),
        paging: stores.TaggedArticlesStore.getPaging(),
        currentPage: stores.TaggedArticlesStore.getCurrentPage(),
        isLoading: stores.TaggedArticlesStore.getIsLoading()
    };
});
