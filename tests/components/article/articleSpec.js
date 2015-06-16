import {betterMockComponentContext} from '@bxm/flux';
import articleMock from '../../mock/article';
import breakpoints from '../../../app/breakpoints';
import _ from 'lodash';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const AdStub = Context.createStubComponent();
const HeaderStub = Context.createStubComponent();
const FooterStub = Context.createStubComponent();
const ContentBody = Context.createStubComponent();
const staticConfigurationStoreStub = {getBreakpoints: sinon.spy};
const Article = proxyquire('../../../app/components/article/article', {
    'react': React,
    'react/addons': React,
    './header': HeaderStub,
    './footer': FooterStub,
    '@bxm/ad/src/google/components/ad': AdStub,
    '@bxm/ui/lib/markdown/components/contentBody': ContentBody,
    '@bxm/ui/lib/to-love/stores/staticConfigurationStore': staticConfigurationStoreStub
});

describe(`Article Component`, () => {
    const articleClassName = `article`;
    const title = articleMock.title;
    const contentBody = articleMock.body;
    const contentBodyClass = `article__body article__body--top-border`;
    const source = articleMock.source;
    const summary = articleMock.summary;
    const tags = articleMock.articleTags;
    const className = `test-article`;
    const classThemeName = `theme-australian_house_and_garden`;
    const allowedThemeClasses = ['theme-australian_house_and_garden', 'theme-real_living', 'theme-homes_', 'theme-belle'];
    const credits = {
        writer: articleMock.writer,
        photographer: articleMock.photographer,
        stylist: articleMock.stylist,
        experter: articleMock.experter
    };
    const heroItem = {
        imageUrl: articleMock.imageUrl,
        imageAltText: articleMock.imageAltText,
        imageCaption: articleMock.imageCaption
    };

    let reactModule;

    afterEach(Context.cleanup);

    describe(`when passing all props`, () => {
        let adSub;
        let headerSub;
        let contentBodySub;
        let footerSub;

        before(`rendering component`, () => {
            reactModule = Context.mountComponent(Article, {
                className, contentBody, credits, heroItem, source, summary, tags, title
            });

            adSub = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
            headerSub = TestUtils.findRenderedComponentWithType(reactModule, HeaderStub);
            contentBodySub = TestUtils.findRenderedComponentWithType(reactModule, ContentBody);
            footerSub = TestUtils.findRenderedComponentWithType(reactModule, FooterStub);
        });


        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(articleClassName);
        });

        it(`should render the component with class "${className}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(className);
        });

        it(`should render the component with class theme "${classThemeName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(classThemeName);
        });

        it(`should render the component with class theme in this list : "${allowedThemeClasses}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            const intersect = _.intersection(classNames, allowedThemeClasses);
            expect(intersect.length).to.eq(1);
        });

        it(`should render the key article sub-components on the page`, () => {
            expect(adSub).to.exist;
            expect(headerSub).to.exist;
            expect(contentBodySub).to.exist;
            expect(footerSub).to.exist;
        });

        describe(`Ad sub-component`, () => {
            const className = 'ad--article-top';
            const displayFor = ['medium', 'large', 'xlarge'];
            const sizes = {
                banner: 'banner',
                leaderboard: 'leaderboard',
                railBanner: 'banner',
                railLeaderboard: 'leaderboard',
                xlarge: ['billboard', 'leaderboard']
            };

            it(`should have className "${className}"`, () => {
                expect(adSub.props.className).to.eq(className);
            });

            it(`should have displayFor array`, () => {
                expect(adSub.props.displayFor).to.eql(displayFor);
            });

            it(`should have sizes object`, () => {
                expect(adSub.props.sizes).to.eql(sizes);
            });
        });

        describe(`Header sub-component`, () => {
            it(`should have heroItem object`, () => {
                expect(headerSub.props.heroItem).to.eq(heroItem);
            });

            it(`should have summary "${summary}"`, () => {
                expect(headerSub.props.summary).to.eq(summary);
            });

            it(`should have title "${title}"`, () => {
                expect(headerSub.props.title).to.eq(title);
            });
        });

        describe(`ContentBody sub-component`, () => {
            it(`should have body array`, () => {
                expect(contentBodySub.props.body).to.eq(contentBody);
            });

            it(`should have breakpoints object`, () => {
                expect(contentBodySub.props.breakpoints).to.eq(breakpoints);
            });

            it(`should have class "${contentBodyClass}"`, () => {
                expect(contentBodySub.props.className).to.eq(contentBodyClass);
            });
        });

        describe(`Footer sub-component`, () => {
            it(`should have credits object`, () => {
                expect(footerSub.props.credits).to.eq(credits);
            });

            it(`should have source "${source}"`, () => {
                expect(footerSub.props.source).to.eq(source);
            });

            it(`should have tags array`, () => {
                expect(footerSub.props.tags).to.eq(tags);
            });
        });
    });

    describe(`when passing no props`, () => {
        before(`rendering component`, () => {
            reactModule = Context.mountComponent(Article, {});
        });

        it(`should render the component with class "${articleClassName}"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(articleClassName);
        });
        it(`should not render the component with a theme class"`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            const intersect = _.intersection(classNames, allowedThemeClasses);
            expect(intersect.length).to.eq(0);
        });
    });
});
