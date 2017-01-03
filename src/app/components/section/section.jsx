import React, {Component, PropTypes} from 'react';
import first from 'lodash/array/first';
import slice from 'lodash/array/slice';
import cx from 'classnames';
import loadList from '../../actions/loadList';
import Header from './header';
import Group from './group';
import InFocus from '../inFocus/inFocus';
import RepeatableGroup from './repeatableGroup';
import Repeatable from '../repeatable';
import Hero from './hero';
import Ad from '@bxm/ad/lib/google/components/ad';
import Recommendations from '@bxm/recommendations/lib/components/recommendations';

export default class Section extends Component {

    static displayName = 'GenericSection';

    static contextTypes = {
        config: PropTypes.object
    };

    static propTypes = {
        articles: PropTypes.array.isRequired,
        content: PropTypes.object.isRequired,
        inlineGalleries: PropTypes.element,
        isSideMenuOpen: PropTypes.bool,
        list: PropTypes.object.isRequired,
        listNextParams: PropTypes.object.isRequired
    };

    static defaultProps = {
        articles: [],
        isSideMenuOpen: false,
        list: {}
    };

    render() {
        const {articles, list, content} = this.props;

        if (!articles.length) return null;
        if (!list && !list.items && !list.items.length) return null;

        const sectionClassName = cx('section-landing', 'side-menu-slider', {
            'side-menu-slider--side-menu-open': this.props.isSideMenuOpen
        });

        let kingtag = content.title;
        if (content.tagsDetails && content.tagsDetails.length > 0) {
            kingtag = content.tagsDetails[0].displayName;
        }

        return (
            <div className={sectionClassName}>
                <div className="container">
                    <div className="row">
                        <Header title={content.title} sponsorName={content.sponsor || 'homes_sponsor'}>
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
                    <Repeatable
                        component={RepeatableGroup}
                        action={loadList}
                        dataSource={this.props.list}
                        nextParams={this.props.listNextParams}
                        className="news-feed bottom-news-feed"
                        adTargets={{ position: 3, kingtag }}
                    />

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
