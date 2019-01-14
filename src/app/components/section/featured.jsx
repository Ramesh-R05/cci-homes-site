import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import Teaser from '../teaser/teaser';
import SearchBar from '../search/searchBar';

export default class Featured extends Component {
    static displayName = 'Featured';

    static propTypes = {
        articles: PropTypes.array.isRequired,
        polarTargets: PropTypes.array,
        hero: PropTypes.object,
        showSearchBar: PropTypes.bool
    };

    static defaultProps = {
        polarTargets: [],
        hero: null,
        showSearchBar: false
    };

    render() {
        const { articles, polarTargets, hero, showSearchBar } = this.props;
        const className = 'section__featured gtm-topteaserlist-index';

        if (articles.length === 0 && showSearchBar) {
            return (
                <section className={className}>
                    <SearchBar />
                </section>
            );
        }

        const item = articles[0];
        const teaserProps = {
            sizes: 'brand-list',
            modifier: 'img-top',
            gtmClass: 'gtm-topteaserlist-index'
        };

        return (
            <section className={className}>
                {showSearchBar && <SearchBar />}
                <div>{hero ? <Teaser {...hero} gtmClass="gtm-hero-section" key={`${hero.id}-xl`} modifier="hero" sizes="home-hero" /> : null}</div>
                <div>
                    <Ad
                        className="ad--section-mrec teaser"
                        displayFor="medium"
                        sizes={['double-mrec', 'mrec']}
                        label={{ active: false }}
                        pageLocation={Ad.pos.body}
                    />
                    <Teaser key={item.id} {...item} {...teaserProps} polar={polarTargets[0]} />
                    <Ad
                        className="ad--section-mrec"
                        displayFor="small"
                        sizes={['double-mrec', 'mrec']}
                        updatePageOffset
                        label={{ active: false }}
                        pageLocation={Ad.pos.body}
                    />
                    {articles.slice(1, 6).map((article, i) => {
                        const polarProps = {};

                        if (i === 4) {
                            polarProps.polar = polarTargets[1];
                        }

                        return <Teaser {...article} {...teaserProps} {...polarProps} key={article.id} />;
                    })}
                    <Ad
                        className="ad--section-mrec teaser"
                        displayFor="medium"
                        sizes={{
                            medium: 'mrec'
                        }}
                        label={{ active: false }}
                        pageLocation={Ad.pos.body}
                    />
                </div>
            </section>
        );
    }
}
