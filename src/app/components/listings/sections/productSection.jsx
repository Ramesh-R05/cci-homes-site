import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/productCard';
import SectionWrapper from '../components/sectionWrapper';

export default function ProductSection({ businessName, products }) {
    if (!products || !Array.isArray(products) || !products.length) {
        return null;
    }

    return (
        <SectionWrapper sectionClass="product-section" sectionId="product-section">
            <div className="row product-section__title-row">
                <div className="columns small-12 product-section__title-column">
                    <h1 className="heading heading--large">{`Shop At ${businessName}`}</h1>
                </div>
            </div>
            <div className="row product-section__products-row">
                {products.map((product, i) => {
                    const key = `product-${i}`;

                    return (
                        <div key={key} className="columns small-12 medium-6 xlarge-3 product-section__product-column">
                            <ProductCard {...product} />
                        </div>
                    );
                })}
            </div>
        </SectionWrapper>
    );
}

ProductSection.displayName = 'ProductSection';

ProductSection.propTypes = {
    businessName: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            image: PropTypes.object.isRequired
        })
    ).isRequired
};
