import { shallow } from 'enzyme';
import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';

noCallThru();
const Context = betterMockComponentContext();
const { React } = Context;

const AdStub = Context.createStubComponent();
const StickyAdStub = Context.createStubComponent();
const loadDirectoriesContentStub = sinon.stub();
const DirectoryFiltersStub = Context.createStubComponent();
const FeaturedStub = Context.createStubComponent();
const RailStub = Context.createStubComponent();
const ListStub = Context.createStubComponent();

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

const executeActionStub = sinon.stub();

const { Directories } = proxyquire('../../../../app/components/section/directories/index', {
    react: React,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyAdStub,
    '../../../actions/loadDirectoriesContent': loadDirectoriesContentStub,
    './directoryFilters': DirectoryFiltersStub,
    '../featured': FeaturedStub,
    '../rail': RailStub,
    '../list': ListStub
});

const createMock = (count, keys) =>
    Array.from(Array(count), (x, i) => {
        const currentIndex = i + 1;
        return {
            id: `item${currentIndex}`
        };
    }).reduce((prev, curr, i) => {
        const keyMap = keys
            .map(k => ({
                [k]: `${k}-${i + 1}`
            }))
            .reduce((prevObj, currObj) => ({ ...prevObj, ...currObj }), {});
        prev.push(keyMap);
        return prev;
    }, []);

const testWrapper = (props = {}, context = {}) => {
    return shallow(<Directories {...props} />, { context, lifecycleExperimental: true });
};

const mockProps = {
    content: { title: 'directories' },
    topItems: createMock(8, ['title']),
    remainingItems: createMock(8, ['title']),
    filters: {
        location: createMock(12, ['fullName', 'displayName']),
        category: createMock(6, ['fullName', 'displayName'])
    }
};

const mockContext = {
    executeAction: executeActionStub
};

describe('Directories component', () => {
    describe('rendering', () => {
        describe('with valid props', () => {
            let wrapper;
            beforeEach(() => {
                wrapper = testWrapper(mockProps, mockContext);
            });

            it('renders to the page', () => {
                expect(wrapper.find('.section__landing.directories')).to.have.length(1);
            });

            it('renders a <DirectoryFilters/> component', () => {
                expect(wrapper.find(DirectoryFiltersStub)).to.have.length(1);
            });

            it('renders a <Featured/> component', () => {
                expect(wrapper.find(FeaturedStub)).to.have.length(1);
            });

            it('renders a <StickyAd/> component', () => {
                expect(wrapper.find(StickyAdStub)).to.have.length(1);
            });

            it('renders a <List/> component', () => {
                expect(wrapper.find(ListStub)).to.have.length(1);
            });

            it('renders a <Ad/> component', () => {
                expect(wrapper.find(AdStub)).to.have.length(1);
            });
        });
    });
    describe('passing props', () => {
        describe('through to <DirectoryFilters/>', () => {
            let wrapper;
            let NestedComponent;

            beforeEach(() => {
                wrapper = testWrapper(mockProps, mockContext);
                NestedComponent = wrapper.find(DirectoryFiltersStub);
            });

            it('receives the correct methods', () => {
                expect(NestedComponent.prop('handleSubmit')).to.eq(wrapper.instance().handleSubmit);
                expect(NestedComponent.prop('handleFilterChange')).to.eq(wrapper.instance().handleFilterChange);
                expect(NestedComponent.prop('handleFilterClear')).to.eq(wrapper.instance().handleFilterClear);
            });

            it('receives the correct state', () => {
                expect(NestedComponent.prop('locations')).to.eq(wrapper.state('locationFilters'));
                expect(NestedComponent.prop('categories')).to.eq(wrapper.state('categoryFilters'));
                expect(NestedComponent.prop('selectedCategory')).to.eq(wrapper.state('activeFilters').category);
                expect(NestedComponent.prop('selectedLocation')).to.eq(wrapper.state('activeFilters').location);
                expect(NestedComponent.prop('loading')).to.eq(wrapper.state('loading'));
            });
        });
        describe('through to <Featured/>', () => {
            let wrapper;
            let NestedComponent;

            beforeEach(() => {
                wrapper = testWrapper(mockProps, mockContext);
                NestedComponent = wrapper.find(FeaturedStub);
            });

            it('recieves the correct data', () => {
                expect(NestedComponent.prop('articles')).to.eq(wrapper.instance().props.topItems);
            });
        });
        describe('through to <List/>', () => {
            let wrapper;
            let NestedComponent;

            beforeEach(() => {
                wrapper = testWrapper(mockProps, mockContext);
                NestedComponent = wrapper.find(ListStub);
            });

            it('recieves the correct data', () => {
                expect(NestedComponent.prop('items')).to.eq(wrapper.instance().props.remainingItems);
            });
        });
    });
    describe('lifecycle', () => {
        describe('componentDidMount', () => {
            let wrapper;
            const componentDidMountSpy = sinon.spy(Directories.prototype, 'componentDidMount');

            beforeEach(() => {
                const mockFilters = {
                    location: createMock(2, ['fullName', 'displayName']),
                    category: createMock(2, ['fullName', 'displayName'])
                };

                wrapper = testWrapper({ ...mockProps, filters: mockFilters }, mockContext);
            });

            it('gets called', () => {
                expect(componentDidMountSpy).to.be.called;
            });

            it('sets the initial state for the filters', () => {
                const expectedState = {
                    locationFilters: [
                        {
                            value: `fullName-1`,
                            label: `displayName-1`
                        },
                        {
                            value: `fullName-2`,
                            label: `displayName-2`
                        }
                    ],
                    categoryFilters: [
                        {
                            value: `fullName-1`,
                            label: `displayName-1`
                        },
                        {
                            value: `fullName-2`,
                            label: `displayName-2`
                        }
                    ]
                };

                expect(wrapper.state().locationFilters).to.eql(expectedState.locationFilters);
                expect(wrapper.state().categoryFilters).to.eql(expectedState.categoryFilters);
            });
        });
        describe('componentWillReceiveProps', () => {
            let wrapper;
            const componentWillReceivePropsSpy = sinon.spy(Directories.prototype, 'componentWillReceiveProps');

            beforeEach(() => {
                wrapper = testWrapper({ ...mockProps }, mockContext);
                wrapper.setProps({ topItems: [], remainingItems: [] });
            });

            it('gets called', () => {
                expect(componentWillReceivePropsSpy).to.have.been.called;
            });

            it('sets loading state to false', () => {
                wrapper.setState({ isLoading: true });
                wrapper.setProps({ topItems: [], remainingItems: [] });
                expect(wrapper.state('isLoading')).to.be.false;
            });
        });
    });
    describe('methods', () => {
        describe('handleFilterChange', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = testWrapper({ ...mockProps }, mockContext);
                wrapper.setState({ activeFilters: { category: 'test-category', location: 'test-location' } });
            });

            it('updates the active filter state for the changed filter', () => {
                wrapper.instance().handleFilterChange({ value: 'new-test-location' }, 'location');

                expect(wrapper.state().activeFilters).to.deep.eq({
                    category: 'test-category',
                    location: 'new-test-location'
                });
            });
        });

        describe('getFilterParamsFromState', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = testWrapper({ ...mockProps }, mockContext);
                wrapper.setState({ activeFilters: { category: 'test-category', location: 'test-location' } });
            });

            it('creates the param string correctly', () => {
                expect(wrapper.instance().getFilterParamsFromState(wrapper.state().activeFilters)).to.eq('test-category,test-location');
            });
        });

        describe('handleFilterClear', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = testWrapper({ ...mockProps }, mockContext);
                wrapper.setState({ activeFilters: { category: 'test-category', location: 'test-location' } });
            });

            it('clears the selected filter', () => {
                wrapper.instance().handleFilterClear({ preventDefault: sinon.stub() }, 'location');

                expect(wrapper.state().activeFilters).to.deep.eq({
                    category: 'test-category',
                    location: null
                });
            });

            it('calls getUpdatedDirectories', () => {
                const getupdatedDirectoresSpy = sinon.spy(wrapper.instance(), 'getUpdatedDirectories');
                wrapper.instance().handleFilterClear({ preventDefault: sinon.stub() }, 'location');

                expect(getupdatedDirectoresSpy).to.be.called;
            });
        });

        describe('handleSubmit', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = testWrapper({ ...mockProps }, mockContext);
                wrapper.setState({ activeFilters: { category: 'test-category', location: 'test-location' } });
            });

            it('sets the loading state to true', () => {
                wrapper.instance().handleSubmit({ preventDefault: sinon.stub() });
                expect(wrapper.state('isLoading')).to.be.true;
            });

            it('calls getUpdatedDirectories', () => {
                const getupdatedDirectoresSpy = sinon.spy(wrapper.instance(), 'getUpdatedDirectories');
                wrapper.instance().handleSubmit({ preventDefault: sinon.stub() });
                expect(getupdatedDirectoresSpy).to.be.called;
            });
        });

        describe('getUpdatedDirectories', () => {
            let wrapper;
            let getFilterParamsFromStateStub;
            const mockQuery = 'test-tag-1,test-tag-2';

            beforeEach(() => {
                wrapper = testWrapper({ ...mockProps }, mockContext);
                wrapper.setState({ activeFilters: { category: 'test-category', location: 'test-location' } });
                getFilterParamsFromStateStub = sinon.stub(wrapper.instance(), 'getFilterParamsFromState').returns(mockQuery);
            });

            it('calls getFilterParamsFromState with the state.activeFilters', () => {
                wrapper.instance().getUpdatedDirectories();
                expect(getFilterParamsFromStateStub).to.be.calledWith(wrapper.state().activeFilters);
            });

            it('calls executeAction with correct arguments', () => {
                executeActionStub.reset();
                wrapper.instance().getUpdatedDirectories();
                expect(executeActionStub).to.be.calledWith(loadDirectoriesContentStub, { query: { filters: mockQuery } });
            });
        });

        describe('renderNoResults', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = testWrapper({ ...mockProps, topItems: [], remainingItems: [] }, mockContext);
            });

            it('should render the no results layout when topItems.length is 0', () => {
                expect(wrapper.find('.directories__no-results')).to.have.length(1);
            });
        });
    });
});
