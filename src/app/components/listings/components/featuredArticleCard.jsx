import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import InlineSVG from 'react-inlinesvg';
import Date from '@bxm/datetime/lib/components/Date';
import ImageGallery from './imageGalleryWrapper';
import classNames from 'classnames';

export default class FeaturedArticleCard extends PureComponent {
    static propTypes = {
        articles: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string,
                name: PropTypes.string,
                title: PropTypes.string,
                summary: PropTypes.string,
                urlName: PropTypes.string,
                imageUrl: PropTypes.string,
                dateIndexed: PropTypes.string,
                source: PropTypes.string,
                imageAltText: PropTypes.string
            })
        ).isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            selectedArticle: (props.articles && props.articles[0]) || {}
        };

        this.galleryItems =
            (props.articles &&
                props.articles.map(article => ({
                    url: article.imageUrl,
                    caption: article.imageAltText
                }))) ||
            [];
    }

    onArticleChange = index => {
        const { articles } = this.props;

        this.setState({
            selectedArticle: articles[index]
        });
    };

    render() {
        const { articles } = this.props;
        const { selectedArticle } = this.state;

        if (!articles) {
            return null;
        }

        const featuredArticleLinkClassNames = classNames('featured-article-card__article-details', 'gtm-featured-article-card-link');

        return (
            <article className="featured-article-card">
                <div className="featured-article-card__image-preview">
                    <a className="featured-article-card__link-button" href={selectedArticle.url} title={selectedArticle.urlName} target="_blank">
                        <InlineSVG className="featured-article-card__button-icon" src="/assets/icons/listings/featured-in-arrow.svg" />
                    </a>
                    <ImageGallery size="compact" slideChangeCallback={this.onArticleChange} items={this.galleryItems} />
                </div>
                <a className={featuredArticleLinkClassNames} href={selectedArticle.url} title={selectedArticle.urlName} target="_blank">
                    <h1 className="featured-article-card__heading heading heading--small">Featured In</h1>
                    <h2 className="featured-article-card__article-title">{selectedArticle.title}</h2>
                    <p className="featured-article-card__article-summary">{selectedArticle.summary}</p>
                    <p className="featured-article-card__article-meta">
                        <span className="featured-article-card__article-source">{selectedArticle.source}</span>|
                        <Date
                            className="featured-article-card__date-created"
                            dateCreated={selectedArticle.dateIndexed}
                            showCreated
                            formatType="MMM DD YYYY"
                        />
                    </p>
                </a>
            </article>
        );
    }
}
