import React, { Component, PropTypes } from 'react';
import BrandSwitcher from '@bxm/shared-ui/lib/brandSwitcher';
import Teaser from '../teaser/teaser';

export default class FeaturedBrandsSection extends Component {
    static displayName = 'FeaturedBrandsSection';

    constructor(props) {
        super(props);
        this.state = {
            selectedBrand: props.featuredBrands && !!props.featuredBrands.items ? this.props.featuredBrands.items[0].id : null
        };

        this.displayLatestItems = this.displayLatestItems.bind(this);
    }

    static propTypes = {
        featuredBrands: PropTypes.object.isRequired,
        latestBrandItems: PropTypes.object.isRequired
    };

    shouldComponentUpdate(nextProps, nextState) {
        const { selectedBrand } = this.state;
        return selectedBrand !== nextState.selectedBrand;
    }

    displayLatestItems(e, brand) {
        this.setState({ selectedBrand: brand.id });
    }

    render() {
        const { featuredBrands, latestBrandItems } = this.props;
        const { selectedBrand } = this.state;
        return (
            <div className="latest-content">
                <section>
                    <h1 className="latest-content__title-container">THE LATEST FROM YOUR FAVOURITE BRANDS</h1>
                    <ul className="latest-content__list">
                        {selectedBrand &&
                            latestBrandItems[selectedBrand].map(item => (
                                <li className="latest-content__item">
                                    <Teaser {...item} key={item.id} sizes="brand-list" modifier="img-top" />
                                </li>
                            ))}
                    </ul>
                </section>
                <BrandSwitcher brands={featuredBrands.items} linkType="button" onClickHandler={(e, brand) => this.displayLatestItems(e, brand)} />{' '}
            </div>
        );
    }
}
