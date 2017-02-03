import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import loadList from '../../actions/loadList';
import Repeatable from '../repeatable';
import Ad from '@bxm/ad/lib/google/components/ad';
import Featured from './featured';
import Rail from './rail';
import List from './list';

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
        const {articles, list, content, listNextParams, isSideMenuOpen} = this.props;

        if (!articles.length) return null;
        if (!list && !list.items && !list.items.length) return null;

        const sectionClassName = cx('section__landing', 'side-menu-slider', {
            'side-menu-slider--side-menu-open': isSideMenuOpen
        });

        let title = content.title;
        if (content.tagsDetails && content.tagsDetails.length > 0) {
            title = content.tagsDetails[0].displayName;
        }

        return (
            <div className={sectionClassName}>
                <div className="container">
                    <div className="section__row">
                       <Featured articles={articles} />
                        <Rail
                            adPosition={1}
                            marginBottom={60}
                            yPosition={95}
                        />
                    </div>

                    <div className="section__row section__middle">
                        <Ad
                            className="ad--section-middle-leaderboard section__ad"
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            targets={{position: 2, kingtag: title}}
                        />
                    </div>
                    <div className="section__row">
                        <Repeatable
                            component={List}
                            action={loadList}
                            dataSource={list}
                            nextParams={listNextParams}
                            className="news-feed bottom-news-feed"
                            adTargets={{ position: 3, kingtag: title }}
                        />

                    </div>

                    <div className="section__row section__bottom">
                            <Ad
                                className="ad--section-bottom-leaderboard section__ad"
                                sizes={{
                                    small: 'banner',
                                    leaderboard: 'leaderboard',
                                    billboard: ['billboard', 'leaderboard']
                                }}
                                targets={{position: 3, kingtag: title}}
                            />
                    </div>
                </div>
            </div>
        );
    }
}
