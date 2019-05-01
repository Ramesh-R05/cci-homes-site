import React from 'react';
import PropTypes from 'prop-types';
import FeaturedArticleCard from '../components/featuredArticleCard';
import SectionWrapper from '../components/sectionWrapper';

export default function FeaturedArticleSection({ featuredInArticles }) {
    if (!featuredInArticles) {
        return null;
    }

    return (
        <SectionWrapper sectionClass="featured-article-section">
            <div className="featured-article-section__main-row row collapse">
                <div className="featured-article-section__main-column columns small-12 xlarge-8 small-centered">
                    <FeaturedArticleCard articles={featuredInArticles} />
                </div>
            </div>
        </SectionWrapper>
    );
}

FeaturedArticleSection.displayName = 'FeatureArticleSection';

FeaturedArticleSection.propTypes = {
    featuredInArticles: PropTypes.arrayOf(PropTypes.object).isRequired
};
