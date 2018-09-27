import React, { Component, PropTypes } from 'react';
import DropdownSelect from '../../form/dropdownSelect';

export default class DirectoryFilters extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleFilterChange: PropTypes.func.isRequired,
        handleFilterClear: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,
        locations: PropTypes.array.isRequired,
        selectedCategory: PropTypes.string.isRequired,
        selectedLocation: PropTypes.string.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    render() {
        const {
            categories,
            locations,
            selectedCategory,
            selectedLocation,
            handleSubmit,
            handleFilterChange,
            handleFilterClear,
            isLoading
        } = this.props;

        return (
            <div className="directory-filters">
                <div className="directory-filters__wrapper">
                    <div className="directory-filters__title">
                        <h3 className="directory-filters__title-text">Filter Directories</h3>
                    </div>
                    <form className="directory-filters__form" onSubmit={e => handleSubmit(e)}>
                        <DropdownSelect
                            onChange={value => handleFilterChange(value, 'category')}
                            placeholder="select a category"
                            options={categories}
                            value={selectedCategory}
                            onClear={e => handleFilterClear(e, 'category')}
                            selectedOption={selectedCategory}
                        />
                        <DropdownSelect
                            onChange={value => handleFilterChange(value, 'location')}
                            placeholder="select a location"
                            options={locations}
                            value={selectedLocation}
                            onClear={e => handleFilterClear(e, 'location')}
                            selectedOption={selectedLocation}
                        />
                        <button type="submit" className="button directory-filters__submit-button">
                            {isLoading ? 'loading...' : 'browse'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}
