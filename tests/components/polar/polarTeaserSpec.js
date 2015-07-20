import {betterMockComponentContext} from '@bxm/flux';
import articlesMock from '../../mock/teasers';
import cloneDeep from 'lodash/lang/cloneDeep';
import merge from 'lodash/object/merge';
import omit from 'lodash/object/omit';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TitleStub = Context.createStubComponentWithChildren();
const SummaryStub = Context.createStubComponentWithChildren();
const IconStub = Context.createStubComponentWithChildren();
const SponsorStub = Context.createStubComponentWithChildren();
const TeaserStub = Context.createStubComponentWithChildren();
const Teaser = proxyquire('../../../app/components/polar/polarTeaser', {
    'react': React,
    '@bxm/article/lib/components/teaser/title': TitleStub,
    '@bxm/article/lib/components/teaser/summary': SummaryStub,
    '@bxm/ad/lib/polar/decorators/polarAd': (component) => component,
    '@bxm/ad/lib/polar/decorators/polarConfig': (component) => component,
    '../teaser/icon': IconStub,
    './sponsor': SponsorStub,
    '../teaser/teaser': TeaserStub
});



describe('PolarTeaser', () => {

    describe(`without the ad prop`, () => {
        let reactModule;
        let teaser;
        const props = articlesMock.basic;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            teaser = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub)
        });

        it('should render the initial article teaser', () => {
            expect(teaser).to.exist;
        });

        it('should pass down the article props to the teaser', () => {
            expect(omit(teaser.props, ['ad', 'modifier'])).to.deep.equal(props);
        });
    });

    describe(`when polar doesn't return a response`, () => {
        let reactModule;
        let teaser;
        const props = merge(cloneDeep(articlesMock.basic), {
            ad: { label: 'test' },
            nativeAd: {}
        });

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            teaser = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub)
        });

        it('should render the initial article teaser', () => {
            expect(teaser).to.exist;
        });

        it('should pass down the article props to the teaser', () => {
            expect(omit(teaser.props, ['modifier'])).to.deep.equal(props);
        });
    });

    describe(`with an ad label and when polar doesn't return a response`, () => {
        let reactModule;
        let teaser;
        const props = merge(cloneDeep(articlesMock.basic), {
            ad: { label: 'ad_label' },
            nativeAd: {}
        });

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            teaser = TestUtils.findRenderedComponentWithType(reactModule, TeaserStub)
        });

        it('should render the initial article teaser', () => {
            expect(teaser).to.exist;
        });

        it('should pass down the article props to the teaser', () => {
            expect(omit(teaser.props, ['modifier'])).to.deep.equal(props);
        });
    });

    describe(`when polar returns a correct response`, () => {
        let reactModule;
        let nativeTeaser;
        let link;
        let image;
        let icon;
        let sponsor;
        let title;
        let summary;
        const props = {
            ad: { label: 'ad_label' },
            nativeAd: {
                response: {
                    model: {
                        custom: { icon: 'video' },
                        href: 'http://href.com',
                        image: {
                            caption: 'caption text',
                            href: 'http://image.com'
                        },
                        link: 'http://link.com',
                        sponsor: { name: 'sponsor' },
                        summary: 'summary',
                        title: 'title'
                    }
                }
            }
        };
        const model = props.nativeAd.response.model;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Teaser {...props} />);
            nativeTeaser = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser--native');
            link = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__image');
            image = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'img');
            icon = TestUtils.findRenderedComponentWithType(reactModule, IconStub);
            sponsor = TestUtils.findRenderedComponentWithType(reactModule, SponsorStub);
            title = TestUtils.findRenderedComponentWithType(reactModule, TitleStub);
            summary = TestUtils.findRenderedComponentWithType(reactModule, SummaryStub);
        });

        it('should render the native ad teaser', () => {
            expect(nativeTeaser).to.exist;
        });

        it('should pass down the href prop to the teaser link', () => {
            expect(link.props.href).to.equal(model.link);
        });

        it('should pass down the src prop to the teaser image', () => {
            expect(image.props.src).to.equal(model.image.href);
        });

        it('should pass down the alt prop to the teaser image', () => {
            expect(image.props.alt).to.equal(model.image.caption);
        });

        it('should pass down the icon prop to the Icon component', () => {
            expect(icon.props.icon).to.equal(model.custom.icon);
        });

        it('should pass down the name prop to the Sponsor component', () => {
            expect(sponsor.props.name).to.equal(model.sponsor.name);
        });

        it('should pass down the title prop to the Title component', () => {
            expect(title.props.title).to.equal(model.title);
        });

        it('should pass down the link prop to the Title component', () => {
            expect(title.props.url).to.equal(model.link);
        });

        it('should pass down the summary prop to the Summary component', () => {
            expect(summary.props.summary).to.equal(model.summary);
        });
    });
});
