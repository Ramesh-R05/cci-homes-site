import React from 'react';
import PropTypes from 'prop-types';
import DirectoryCategoryItem from './directoryCategoryItem';

export default function DirectoryHome({ content }) {
    if (!content) {
        return null;
    }

    const { categories } = content;

    return (
        <div className="directory-home container">
            <ul className="directory-home__list row collapse">
                {categories &&
                    Array.isArray(categories) &&
                    categories.length &&
                    categories.map((category, i) => {
                        const key = `directory-category-item-${i}`;

                        return (
                            <li className="directory-home__list-item small-12 medium-4 columns" key={key}>
                                <DirectoryCategoryItem category={category} />
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}

DirectoryHome.displayName = 'DirectoryHome';

DirectoryHome.propTypes = {
    content: PropTypes.shape({
        categories: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                imageUrl: PropTypes.string.isRequired
            }).isRequired
        )
    }).isRequired
};
