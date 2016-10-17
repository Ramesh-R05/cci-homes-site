import React, {Component, PropTypes} from 'react';
import first from 'lodash/array/first';
import slice from 'lodash/array/slice';
import cx from 'classnames';
import Header from './header';
import Group from './group';
import InFocus from '../inFocus/inFocus';
import GroupRepeatable from './groupRepeatable';
import Hero from './hero';
import Ad from '@bxm/ad/lib/google/components/ad';
import LoadMore from '../loadMore/loadMore';
import Recommendations from '@bxm/recommendations/lib/components/recommendations';
import {getTagName} from '@bxm/tags/lib/utils';

export default class Section extends Component {

    static displayName = 'GenericSection';

    static contextTypes = {
        config: PropTypes.object
    };

    static propTypes = {
        articles: PropTypes.array.isRequired,
        content: PropTypes.object.isRequired,
        currentPage: PropTypes.number.isRequired,
        inlineGalleries: PropTypes.element,
        isLoading: PropTypes.bool.isRequired,
        isSideMenuOpen: PropTypes.bool,
        nbLoadMoreClicks: PropTypes.number.isRequired,
        pagination: PropTypes.object.isRequired,
        paging: PropTypes.object.isRequired,
        tags: PropTypes.array.isRequired
    };

    static defaultProps = {
        articles: [],
        currentPage: 0,
        isSideMenuOpen: false,

        pagination: {},
        paging: {
            pages: 0,
            isLoading: false
        },
        tags: []
    };

    getGroupRepeatableItemLength() {
        const nbFirstPageItems = this.props.pagination.nbFirstPageItems;
        const nbLoadMoreItems = this.props.pagination.nbLoadMoreItems;

        if (!this.props.nbLoadMoreClicks || this.props.currentPage + 1 === this.props.paging.pages) {
            return this.props.articles.length;
        }
        return nbFirstPageItems + nbLoadMoreItems * this.props.nbLoadMoreClicks;
    }

    render() {
        const {articles, content} = this.props;
        let loadMoreBtn;

        if (!articles.length) return null;

        if (this.context.config.isFeatureEnabled('loadMoreBtn') === true) {
            loadMoreBtn = <LoadMore currentPage={this.props.currentPage} totalPages={this.props.paging.pages} isLoading={this.props.isLoading}/>;
        }

        const sectionClassName = cx('section-landing', 'side-menu-slider', {
            'side-menu-slider--side-menu-open': this.props.isSideMenuOpen
        });

        const kingtag = getTagName(this.props.tags[0]);

        return (
            <div className={sectionClassName}>
                <div className="container">
                    <div className="row">
                        <Header tags={this.props.tags} sponsorName={content.sponsor || 'homes_sponsor'}>
                            <Ad
                                className="ad--section-top-leaderboard"
                                sizes={{
                                    small: 'banner',
                                    leaderboard: 'leaderboard',
                                    billboard: ['billboard', 'leaderboard']
                                }}
                                targets={{position: 1, kingtag}}
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
                                    targets={{position: 1, kingtag}}
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
                                targets={{position: 1, kingtag}}
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
                        <div className="columns small-12">
                            <Ad
                                className="ad--section-middle-leaderboard"
                                sizes={{
                                    small: 'banner',
                                    leaderboard: 'leaderboard',
                                    billboard: ['billboard', 'leaderboard']
                                }}
                                targets={{position: 2, kingtag}}
                            />
                        </div>
                    </div>
                </div>

                {this.props.inlineGalleries}

                <div className="container">
                    {/* Group repeated when paginating */}
                    <div className="row">
                        <GroupRepeatable kingtag={kingtag} articles={slice(articles, 11, this.getGroupRepeatableItemLength())} />
                    </div>
                    {/* LoadMore btn*/}
                    {loadMoreBtn}

                    {/* Recommendations */}
                    <Recommendations
                        nodeType={content.nodeType}
                        nodeId={content.id}
                    />

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
                                targets={{position: 3, kingtag}}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
