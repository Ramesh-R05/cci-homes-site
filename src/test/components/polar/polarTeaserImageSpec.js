import {betterMockComponentContext} from '@bxm/flux';
import articlesMock from '../../mock/teasers';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const proxyquire = require('proxyquire').noCallThru();
const TitleStub = Context.createStubComponentWithChildren();
const SummaryStub = Context.createStubComponentWithChildren();
const IconStub = Context.createStubComponentWithChildren();
const SponsorStub = Context.createStubComponentWithChildren();
const Teaser = proxyquire('../../../app/components/polar/polarTeaserImage', {
    'react': React,
    '@bxm/article/lib/components/teaser/title': TitleStub,
    '@bxm/article/lib/components/teaser/summary': SummaryStub,
    '../teaser/icon': IconStub,
    './sponsor': SponsorStub
});

describe('polarTeaserImage', () => {
    describe('when polar returns a correct response', () => {
        let reactModule;
        let nativeTeaser;
        let link;
        let image;
        let icon;
        let sponsor;
        let title;
        let summary;
        const trackClickSpy = sinon.spy();
        const props = {
            ad: { label: 'ad_label' },
            nativeAd: {
                custom: { icon: 'video' },
                href: 'http://href.com',
                image: {
                    caption: 'caption text',
                    href: 'http://meraxes-cdn.polarmobile.com/image/v1.0.0/bin/564d11acb5b25b1aa81d606f?v=7a243&w=1174&h=978'
                },
                link: 'http://link.com',
                sponsor: { name: 'sponsor' },
                summary: 'summary',
                title: 'title'
            },
            trackClick: trackClickSpy,
            source: 'Real Living'
        };
        const model = props.nativeAd;

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

        it('should call the trackClick method when clicking on the teaser', () => {
            const article = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'article');
            TestUtils.Simulate.click(article);
            expect(trackClickSpy).to.have.been.calledOnce;
        });
    });
});
