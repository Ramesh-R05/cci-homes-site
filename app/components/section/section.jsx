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
        this.context.executeAction(FacetedModuleActions.getPage, {
            page: 0,
            params: {tags: ['Indoor']},
            moduleConfig: this.props.moduleConfig
        });
    }

    render() {
        let sliceUp;
        const {articles} = this.props;

        if (!articles.length) return null;

        const firstHero = articles.slice(0, 1)[0];
        /*lg breakpoint only*/
        const secondHero = articles.length >= 5 ? articles.slice(4, 5)[0] : {};
        /* xLarge only */
        sliceUp = articles.length >= 7 ? 7 : articles.length;
        const teaser3WithAd = articles.length > 4 ? articles.slice(4, sliceUp) : [];
        /* Featured Article slice 1,4 */
        sliceUp = articles.length >= 4 ? 4 : articles.length;
        const featuredArticles = articles.length > 1 ? articles.slice(1, sliceUp) : [];
        /* hidden for large bp */
        sliceUp = articles.length >= 11 ? 11 : articles.length;
        const teaser4WithAd = articles.length > 7 ? articles.slice(7, sliceUp) : [];
        /* 6 teasers with ad - visible for large bp only*/
        sliceUp = articles.length >= 11 ? 11 : articles.length;
        const teaser6WithAd = articles.length > 5 ? articles.slice(5, sliceUp) : [];
        /* repeatable group max 11 articles */
        sliceUp = articles.length >= 22 ? 22 : articles.length;
        const teaser11 = articles.length > 11 ? articles.slice(11, sliceUp) : [];

        return (
            <div className="container">

                <div className="row">
                    {/*TODO: make this dynamic based on the navigation tag parameter*/}
                    {/*<h1 className="section-heading">Home <b>Inspiration</b></h1>*/}
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
    moduleConfig: PropTypes.any
};

Section.defaultProps = {
    articles: []
};

Section.contextTypes = {
    getStore: PropTypes.func,
    executeAction: PropTypes.func
};

Section = connectToStores(Section, [TaggedArticlesStore], (stores) => {
    return {
        articles: stores.TaggedArticlesStore.getItems(),
        moduleConfig: stores.TaggedArticlesStore.getConfiguration()
    };
});

export default Section;
