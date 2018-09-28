import React, { Component, PropTypes } from 'react';
import Ad from '@bxm/ad/lib/google/components/ad';
import StickyAd from '@bxm/ad/lib/google/components/stickyAd';
import { connectToStores } from '@bxm/flux';
import loadDirectoriesContent from '../../../actions/loadDirectoriesContent';
import DirectoryFilters from './directoryFilters';
import Featured from '../featured';
import Rail from '../rail';
import List from '../list';

export class Directories extends Component {
    static displayName = 'DirectoriesSection';

    static propTypes = {
        content: PropTypes.object.isRequired,
        topItems: PropTypes.array.isRequired,
        remainingItems: PropTypes.array.isRequired,
        filters: PropTypes.object.isRequired
    };

    static contextTypes = {
        executeAction: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            activeFilters: {
                category: null,
                location: null
            },
            locationFilters: [],
            categoryFilters: [],
            isLoading: false
        };
    }

    componentDidMount() {
        const { filters } = this.props;

        const { locationFilters, categoryFilters } = Object.keys(filters).reduce(
            (prev, curr) => {
                const newprev = { ...prev };

                newprev[`${curr}Filters`] = filters[curr].map(filter => ({
                    value: filter.fullName,
                    label: filter.displayName
                }));

                return newprev;
            },
            {
                locationFilters: [],
                categoryFilters: []
            }
        );

        this.setState({
            locationFilters,
            categoryFilters
        });
    }

    componentWillReceiveProps() {
        this.setState({ isLoading: false });
    }

    handleFilterChange = (event, filter) => {
        const { value } = event;

        this.setState(prevState => ({
            activeFilters: {
                ...prevState.activeFilters,
                [filter]: value
            }
        }));
    };

    getFilterParamsFromState = activeFilters =>
        Object.keys(activeFilters)
            .reduce((accum, key) => {
                const newArr = [...accum];
                if (activeFilters[key]) {
                    newArr.push(activeFilters[key]);
                }
                return newArr;
            }, [])
            .join(',');

    handleFilterClear = (event, filter) => {
        event.preventDefault();
        this.setState(
            prevState => ({
                activeFilters: {
                    ...prevState.activeFilters,
                    [filter]: null
                },
                isLoading: true
            }),
            this.getUpdatedDirectories
        );
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ isLoading: true }, this.getUpdatedDirectories);
    };

    getUpdatedDirectories = () => {
        const { executeAction } = this.context;
        const { activeFilters } = this.state;
        const filters = this.getFilterParamsFromState(activeFilters);
        const includeOnline =
            !activeFilters.category &&
            activeFilters.location &&
            (activeFilters.location.startsWith('location_australian_state') ||
                activeFilters.location.startsWith('location_australianstate') ||
                activeFilters.location.startsWith('location_australian_territory') ||
                activeFilters.location.startsWith('location_australianterritory'));

        const apiQuery = {
            filters,
            includeOnline
        };

        executeAction(loadDirectoriesContent, {
            query: { ...apiQuery }
        });
    };

    renderNoResults = () => (
        <div className="directories__no-results">
            <h3 className="directories__no-results-text">No results found</h3>
        </div>
    );

    render() {
        const { content, remainingItems, topItems } = this.props;
        const {
            categoryFilters,
            locationFilters,
            activeFilters: { location, category },
            isLoading
        } = this.state;

        if (!topItems && !topItems.length) {
            return null;
        }

        const stickyAdProps = {
            className: 'ad--section-bottom-leaderboard',
            displayFor: ['small', 'medium', 'large', 'xlarge'],
            sizes: {
                banner: 'banner',
                leaderboard: 'leaderboard',
                billboard: ['billboard', 'leaderboard']
            },
            pageLocation: Ad.pos.outside,
            lazyLoad: true
        };

        return (
            <div className="section__landing directories">
                <div className="container">
                    <div className="row collapse">
                        <div className="columns small-12">
                            <DirectoryFilters
                                handleSubmit={this.handleSubmit}
                                handleFilterChange={this.handleFilterChange}
                                handleFilterClear={this.handleFilterClear}
                                locations={locationFilters}
                                categories={categoryFilters}
                                selectedCategory={category}
                                selectedLocation={location}
                                isLoading={isLoading}
                            />
                        </div>
                    </div>
                    <div className="section__row directories__top-items">
                        {topItems.length > 0 ? <Featured articles={topItems} polarTargets={[]} /> : this.renderNoResults()}
                        <Rail adPosition={1} marginBottom={60} yPosition={95} />
                    </div>
                    <div className="section__row section__middle">
                        <Ad
                            className="ad--section-middle-leaderboard section__ad"
                            sizes={{
                                small: 'banner',
                                leaderboard: 'leaderboard',
                                billboard: ['billboard', 'leaderboard']
                            }}
                            label={{ active: false }}
                            pageLocation={Ad.pos.outside}
                        />
                    </div>
                    <List items={remainingItems} content={content} polarTargets={[]} className="directories__remaining-items" />
                    <StickyAd adProps={stickyAdProps} minHeight={450} stickyAtViewPort="mediumRangeMax" stickyDelay={5500} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = context => {
    const DirectoriesStore = context.getStore('DirectoriesStore');

    return {
        content: DirectoriesStore.getContent(),
        topItems: DirectoriesStore.getTopDirectories(),
        remainingItems: DirectoriesStore.getRemainingDirectories(),
        filters: DirectoriesStore.getDirectoryFilters()
    };
};

const ConnectedDirectories = connectToStores(Directories, ['DirectoriesStore'], mapStateToProps);

export default ConnectedDirectories;
