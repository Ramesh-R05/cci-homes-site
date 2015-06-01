import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import ArticleStore from '../../stores/article';
import Teaser from '../teaser/teaser';
import Group from './group';
import GroupFeatured from './groupFeatured';
import GroupRepeatable from './groupRepeatable';

class Section extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {articles, featuredArticles} = this.props;

        if (!articles.length) return null;

        return (
            <div className="container">

                <div className="row">
                    {/*TODO: make this dynamic based on the navigation tag parameter*/}
                    <h1 className="section-heading">Home <b>Inspiration</b></h1>
                </div>

                <div className="row">
                    {/*Heroes*/}
                    <section className="section--heroes">
                        {/*First hero*/}
                        {articles.slice(0, 1).map(item => <Teaser {...item} key={item.id} modifier="hero" />)}
                        {/*Second hero (lg breakpoint only*/}
                        {articles.slice(4, 5).map(item => <Teaser {...item} key={item.id} modifier="hero" />)}
                    </section>
                    {/*Featured articles*/}
                    <GroupFeatured articles={featuredArticles}>
                        <div className="ad ad--mrec">
                            <div className="fake-ad" />
                        </div>
                    </GroupFeatured>
                </div>

                {/* Three teasers with ad - xlarge bp only*/}
                <div className="row hidden-for-large-only">
                    <Group articles={articles.slice(4, 7)} modifier="3-items">
                        <div className="ad ad--mrec">
                            <div className="fake-ad" />
                        </div>
                    </Group>
                </div>

                <div className="row">
                    {/* Four teasers with ad - hidden large bp only*/}
                    <Group
                        articles={articles.slice(7, 11)}
                        className="hidden-for-large-only"
                        modifier="6-or-4-items"
                        teaserModifier="img-top">
                        <div className="ad ad--banner">
                            <div className="fake-ad" />
                        </div>
                    </Group>

                    {/* 6 teasers with ad - visible for large bp only*/}
                    <Group
                        articles={articles.slice(5, 11)}
                        className="visible-for-large-only"
                        modifier="6-or-4-items"
                        teaserModifier="img-top">
                        <div className="ad ad--banner">
                            <div className="fake-ad" />
                        </div>
                    </Group>
                </div>

                {/* Group repeated when paginating */}
                <div className="row">
                    <GroupRepeatable articles={articles.slice(11, articles.length)} />
                </div>
            </div>
        );
    }
}


Section.propTypes = {
    articles: PropTypes.array.isRequired,
    featuredArticles: PropTypes.array.isRequired
};

Section.defaultProps = {
    articles: [],
    featuredArticles: []
};

Section.contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
};

Section = connectToStores(Section, [ArticleStore], (stores) => {
    return {
        articles: stores.ArticleStore.getArticles(),
        featuredArticles: stores.ArticleStore.getFeaturedArticles()
    };
});

export default Section;
