import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';
import listingMock from '../../../mock/listing';

noCallThru();
const Context = betterMockComponentContext();

const { React } = Context;

const SectionWrapperStub = Context.createStubComponentWithChildren();
const FeaturedArticleCardStub = Context.createStubComponent();

const FeaturedArticleSection = proxyquire('../../../../app/components/listings/sections/featuredArticleSection', {
    react: React,
    '../components/sectionWrapper': SectionWrapperStub,
    '../components/featuredArticleCard': FeaturedArticleCardStub
}).default;

const TestWrapper = new ShallowWrapperFactory(FeaturedArticleSection);

describe('FeaturedArticleSection component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;
            let sectionWrapper;
            let mainRow;
            let mainColumn;
            let featuredArticleCard;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    featuredInArticles: listingMock.featuredIn
                });

                sectionWrapper = wrapper.find(SectionWrapperStub);
                mainRow = sectionWrapper.childAt(0);
                mainColumn = mainRow.childAt(0);
                featuredArticleCard = mainColumn.find(FeaturedArticleCardStub);
            });

            it('renders the component', () => {
                expect(sectionWrapper.exists()).to.be.true;
            });

            it('renders SectionWrapper with the correct class', () => {
                expect(sectionWrapper.prop('sectionClass')).to.eq('featured-article-section');
            });

            it('renders the main row within the SectionWrapper with the correct class and grid classes', () => {
                expect(mainRow.prop('className')).to.eq('featured-article-section__main-row row collapse');
            });

            it('renders the main column within the main row with the correct class and grid classes', () => {
                expect(mainColumn.prop('className')).to.eq('featured-article-section__main-column columns small-12 xlarge-8 small-centered');
            });

            it('renders the FeaturedArticleCard within the main column', () => {
                expect(featuredArticleCard.exists()).to.be.true;
            });

            it('renders passes the correct props to the FeaturedArticleCard', () => {
                expect(featuredArticleCard.props()).to.deep.eq({
                    articles: testProps.featuredInArticles
                });
            });
        });
        describe('without featuredIn prop passed', () => {
            let wrapper;

            before(() => {
                filterErrors();
                [wrapper] = TestWrapper();
            });

            after(() => {
                restoreErrors();
            });

            it('does not render', () => {
                expect(wrapper.childAt(0).exists()).to.be.false;
            });
        });
    });
});
