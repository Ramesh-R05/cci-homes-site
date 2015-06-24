import React, {Component, PropTypes} from 'react';
import {connectToStores} from '@bxm/flux';
import TaggedArticlesStore from '../../stores/facetedStores/taggedArticles';
import * as FacetedModuleActions from '../../actions/facetedModule';
import Group from './group';
import GroupFeatured from './groupFeatured';
import GroupRepeatable from './groupRepeatable';
import SectionHero from './sectionHero';

class Section extends Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        console.log('[Section][componentWillMount]');
        this.context.executeAction(FacetedModuleActions.getPage, {
            page: 0,
            params: {tags: ['Indoor']},
            moduleConfig: this.props.moduleConfig
        });
    }

    render() {
        const {articles, featuredArticles} = this.props;

        if (!articles.length) return null;


        const firstHero = articles.slice(0, 1)[0];
        /*lg breakpoint only*/
        const secondHero = articles.slice(4, 5)[0];
        /* xLarge only */
        const teaser3WithAd = articles.slice(4, 7);
        /* hidden for large bp */
        const teaser4WithAd = articles.slice(7, 11);
        /* 6 teasers with ad - visible for large bp only*/
        const teaser6WithAd = articles.slice(5, 11);
        /* repeatable group max 11 articles */
        const teaser11 = articles.slice(11, articles.length);

        return (
            <div className="container">

                <div className="row">
                    {/*TODO: make this dynamic based on the navigation tag parameter*/}
                    <h1 className="section-heading">Home <b>Inspiration</b></h1>
                </div>

                <div className="row">
                    {/*Heroes*/}
                    <SectionHero firstHero={firstHero} secondHero={secondHero} />
                    {/*Featured articles*/}
                    <GroupFeatured articles={featuredArticles}>
                        <div className="ad ad--mrec">
                            <div className="fake-ad" />
                        </div>
                    </GroupFeatured>
                </div>

                {/* Three teasers with ad - xlarge bp only*/}
                <div className="row hidden-for-large-only">
                    <Group articles={teaser3WithAd} modifier="3-items">
                        <div className="ad ad--mrec">
                            <div className="fake-ad" />
                        </div>
                    </Group>
                </div>

                <div className="row">
                    {/* Four teasers with ad - hidden large bp only*/}
                    <Group
                        articles={teaser4WithAd}
                        className="hidden-for-large-only"
                        modifier="6-or-4-items"
                        teaserModifier="img-top">
                        <div className="ad ad--banner">
                            <div className="fake-ad" />
                        </div>
                    </Group>

                    {/* 6 teasers with ad - visible for large bp only*/}
                    <Group
                        articles={teaser6WithAd}
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
                    <GroupRepeatable articles={teaser11} />
                </div>
            </div>
        );
    }
}


Section.propTypes = {
    articles: PropTypes.array.isRequired,
    featuredArticles: PropTypes.array.isRequired,
    moduleConfig: PropTypes.any
};

Section.defaultProps = {
    articles: [],
    featuredArticles: []
};

Section.contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
};

Section = connectToStores(Section, [TaggedArticlesStore], (stores) => {
    console.log('[Section][connectToStores]');
    return {
        articles: stores.TaggedArticlesStore.getItems(),
        featuredArticles: stores.TaggedArticlesStore.getItems(),
        moduleConfig: stores.TaggedArticlesStore.getConfiguration()
    };
});

export default Section;
