import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import BrandSwitcher from '@bxm/shared-ui/lib/brandSwitcher';
import Teaser from '../teaser/teaser';

export default class FeaturedBrandsSection extends Component {
    static displayName = 'FeaturedBrandsSection';

    constructor(props) {
        super(props);

        this.state = {
            selectedBrand:
                props.featuredBrands && Array.isArray(props.featuredBrands.items) && props.featuredBrands.items.length
                    ? props.featuredBrands.items[0]
                    : null
        };

        this.displayLatestItems = this.displayLatestItems.bind(this);
    }

    static propTypes = {
        featuredBrands: PropTypes.shape({
            items: PropTypes.array
        }).isRequired,
        latestBrandItems: PropTypes.object.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        const { selectedBrand } = this.state;

        return selectedBrand !== nextState.selectedBrand;
    }

    displayLatestItems(e, brand) {
        this.setState({ selectedBrand: brand });
    }

    render() {
        const { featuredBrands, latestBrandItems } = this.props;
        const { selectedBrand } = this.state;
        let featuredBrandsSection = null;

        const selectedBrandTitle = selectedBrand.title === 'Australian House and Garden' ? 'house and garden' : selectedBrand.title;

        if (selectedBrand) {
            featuredBrandsSection = (
                <div className="latest-content">
                    <section>
                        <h1 className="latest-content__title-container">THE LATEST FROM YOUR FAVOURITE BRANDS</h1>
                        <ul className="latest-content__list">
                            {latestBrandItems[selectedBrand.id].map(item => (
                                <li className="latest-content__item">
                                    <Teaser {...item} key={item.id} sizes="brand-list" modifier="img-top" />
                                </li>
                            ))}
                        </ul>
                    </section>
                    <BrandSwitcher
                        classModifier="in-latest-content-section"
                        brands={featuredBrands.items}
                        linkType="button"
                        onClickHandler={(e, brand) => this.displayLatestItems(e, brand)}
                        activeBrand={selectedBrand}
                    />{' '}
                    <div className="latest-content__selected-brand-footer">
                        MORE FROM{' '}
                        <a href={selectedBrand.url} className="latest-content__selected-brand-footer-link">
                            {selectedBrandTitle}
                            &nbsp;
                            <span className="latest-content__link-arrow">
                                <SVG src="/assets/icons/arrow-right.svg">
                                    <img src="/assets/icons/arrow-right.svg" alt="icon arrow right" />
                                </SVG>
                            </span>
                        </a>
                    </div>
                </div>
            );
        }

        return featuredBrandsSection;
    }
}
