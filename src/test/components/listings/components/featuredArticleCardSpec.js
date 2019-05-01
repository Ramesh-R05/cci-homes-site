import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../../utils/ShallowWrapperFactory';
import { filterErrors, restoreErrors } from '../../../utils/propTypeWarningFilter';
import proxyquire, { noCallThru } from 'proxyquire';
import listingMock from '../../../mock/listing';

noCallThru();

const Context = betterMockComponentContext();
const InlineSVGStub = Context.createStubComponent();
const DateStub = Context.createStubComponent();
const ImageGalleryStub = Context.createStubComponent();

const FeaturedArticleCard = proxyquire('../../../../app/components/listings/components/featuredArticleCard', {
    'react-inlinesvg': InlineSVGStub,
    '@bxm/datetime/lib/components/Date': DateStub,
    './imageGalleryWrapper': ImageGalleryStub
});

const TestWrapper = new ShallowWrapperFactory(FeaturedArticleCard);

const selectors = {
    root: '.featured-article-card',
    galleryWrapper: '.featured-article-card__image-preview',
    linkButton: '.featured-article-card__link-button',
    linkIcon: 'featured-article-card__button-icon',
    articleDetail: '.featured-article-card__article-details',
    heading: '.featured-article-card__heading',
    articleTitle: '.featured-article-card__article-title',
    articleSummary: '.featured-article-card__article-summary',
    articleMeta: '.featured-article-article-meta',
    articleSource: '.featured-article-card__article-source',
    articleDateCreated: 'featured-article-card__date-created'
};

describe('FeaturedArticleCard component', () => {
    describe('rendering', () => {
        describe('with valid required props', () => {
            let wrapper;
            let testProps;

            before(() => {
                [wrapper, testProps] = TestWrapper({
                    articles: listingMock.featuredIn
                });
            });

            it('renders the component', () => {
                expect(wrapper.childAt(0).exists()).to.be.true;
            });

            it('renders the ImageGallery within the wrapper div', () => {
                const { galleryWrapper } = selectors;

                expect(
                    wrapper
                        .find(galleryWrapper)
                        .find(ImageGalleryStub)
                        .exists()
                ).to.be.true;
            });

            it('passes the correct props through to the ImageGallery', () => {
                expect(wrapper.find(ImageGalleryStub).props()).to.deep.eq({
                    size: 'compact',
                    slideChangeCallback: wrapper.instance().onArticleChange,
                    items: wrapper.instance().galleryItems
                });
            });

            it('renders the link button  with the correct attributes to link to the first article', () => {
                const { root, linkButton } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(linkButton)
                        .props()
                ).to.include({
                    href: testProps.articles[0].url,
                    title: testProps.articles[0].urlName
                });
            });

            it('renders the link icon using the InlineSVG component inside of the link button with the correct props', () => {
                const { root, linkButton, linkIcon } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(linkButton)
                        .find(InlineSVGStub)
                        .props()
                ).to.deep.eq({
                    className: linkIcon,
                    src: '/assets/icons/listings/featured-in-arrow.svg'
                });
            });

            it('renders the article detail section', () => {
                const { root, articleDetail } = selectors;

                expect(wrapper.find(root).find(articleDetail));
            });

            it('passes the correct attributes to link the article detail section', () => {
                const { root, articleDetail } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(articleDetail)
                        .props()
                ).to.include({
                    href: testProps.articles[0].url,
                    title: testProps.articles[0].urlName
                });
            });

            it(`renders the heading with the correct hardcoded value of 'Featured In' inside the detail section`, () => {
                const { root, articleDetail, heading } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(articleDetail)
                        .find(heading)
                        .text()
                ).to.eq('Featured In');
            });

            it(`renders the article title using the value the first article`, () => {
                const { root, articleDetail, articleTitle } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(articleDetail)
                        .find(articleTitle)
                        .text()
                ).to.eq(testProps.articles[0].title);
            });

            it(`renders the article summary using the value the first article`, () => {
                const { root, articleDetail, articleSummary } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(articleDetail)
                        .find(articleSummary)
                        .text()
                ).to.eq(testProps.articles[0].summary);
            });

            it(`renders the article source using the value the first article`, () => {
                const { root, articleDetail, articleSource } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(articleDetail)
                        .find(articleSource)
                        .text()
                ).to.eq(testProps.articles[0].source);
            });

            it(`passes the the article date and other props to the Date component using the value the first article`, () => {
                const { root, articleDetail, articleDateCreated } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(articleDetail)
                        .find(DateStub)
                        .props()
                ).to.deep.eq({
                    className: articleDateCreated,
                    dateCreated: testProps.articles[0].dateIndexed,
                    showCreated: true,
                    formatType: 'MMM DD YYYY'
                });
            });
        });
        describe('without articles prop', () => {
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

    describe('state', () => {
        describe('when selected article is changed', () => {
            let wrapper;
            let testProps;

            before('shallow render and set selected article to 2nd in articles list', () => {
                [wrapper, testProps] = TestWrapper({
                    articles: listingMock.featuredIn
                });
                wrapper.instance().onArticleChange(1);
            });

            it('passes the correct attributes to link the article detail section to the newly selected article', () => {
                const { root, articleDetail } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(articleDetail)
                        .props()
                ).to.include({
                    href: testProps.articles[1].url,
                    title: testProps.articles[1].urlName
                });
            });

            it('renders the link button  with the correct attributes to link to the newly selected article', () => {
                const { root, linkButton } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(linkButton)
                        .props()
                ).to.include({
                    href: testProps.articles[1].url,
                    title: testProps.articles[1].urlName
                });
            });

            it(`renders the article title using the value from the newly selected article`, () => {
                const { root, articleDetail, articleTitle } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(articleDetail)
                        .find(articleTitle)
                        .text()
                ).to.eq(testProps.articles[1].title);
            });

            it(`renders the article summary using the value from the newly selected article`, () => {
                const { root, articleDetail, articleSummary } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(articleDetail)
                        .find(articleSummary)
                        .text()
                ).to.eq(testProps.articles[1].summary);
            });

            it(`renders the article source using the value newly selected article`, () => {
                const { root, articleDetail, articleSource } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(articleDetail)
                        .find(articleSource)
                        .text()
                ).to.eq(testProps.articles[1].source);
            });

            it(`passes the the article date and other props to the Date component using the value from the newly selected article`, () => {
                const { root, articleDetail, articleDateCreated } = selectors;

                expect(
                    wrapper
                        .find(root)
                        .find(articleDetail)
                        .find(DateStub)
                        .props()
                ).to.deep.eq({
                    className: articleDateCreated,
                    dateCreated: testProps.articles[1].dateIndexed,
                    showCreated: true,
                    formatType: 'MMM DD YYYY'
                });
            });
        });
    });
});
