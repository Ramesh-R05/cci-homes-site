import {betterMockComponentContext} from '@bxm/flux';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();

const HeroImageStub = Context.createStubComponent();
const HeroVideoStub = Context.createStubComponent();
const breakpointsMock = { breakpoints: true };

const playerId = 'i-can-see-you';
const accountId = 'but-i-can-never-reach-you';
let config = { brightcove: { accountId, playerId } };
const Hero = proxyquire('../../../app/components/article/hero', {
    'react': React,
    'react/addons': React,
    '@bxm/article/lib/components/hero/image': HeroImageStub,
    '@bxm/article/lib/components/hero/video': HeroVideoStub,
    '../../breakpoints': breakpointsMock,
    '@bxm/config': { load: () => { return config } }
});

describe('Hero Component', () => {
    let reactModule;

    describe('display a hero image', () => {
        const imageUrl = 'http://www.example.com/example-image.jpg';
        const imageAltText = 'Example image';
        const imageCaption = 'Example image caption';
        const item = { imageUrl, imageAltText, imageCaption };

        before(() => {
            reactModule = Context.mountComponent(Hero, { item });
        });

        it('renders a HeroImage', () => {
            expect(TestUtils.scryRenderedComponentsWithType(reactModule, HeroImageStub))
                .to.have.length(1);
        });

        describe('props', () => {
            let props;

            before(() => {
                props = TestUtils.findRenderedComponentWithType(reactModule, HeroImageStub).props;
            });

            it('sets the HeroImage prop "url"', () => {
                expect(props).to.have.property('url', imageUrl);
            });

            it('sets the HeroImage prop "alt"', () => {
                expect(props).to.have.property('alt', imageAltText);
            });

            it('sets the HeroImage prop "caption"', () => {
                expect(props).to.have.property('caption', imageCaption);
            });

            it('sets the HeroImage prop "breakpoints"', () => {
                expect(props).to.have.property('breakpoints', breakpointsMock);
            });
        });
    });

    describe('display a hero video', () => {
        const brightcoveId = '1234-5678';
        const video = {
            properties: { videoConfiguration: { brightcoveId }}
        };
        const item = { video };

        let heroVideo;

        before(() => {
            reactModule = Context.mountComponent(Hero, { item });
            heroVideo = TestUtils.scryRenderedComponentsWithType(reactModule, HeroVideoStub)[0];
        });

        it('renders a HeroVideo', () => {
            expect(heroVideo).to.exist;
        });

        it(`sets the brightcoveId prop to "${brightcoveId}"`, () => {
            expect(heroVideo.props.brightcoveId).to.eq(brightcoveId);
        });

        it(`sets the accountId prop to "${accountId}"`, () => {
            expect(heroVideo.props.accountId).to.eq(accountId);
        });

        it(`sets the playerId prop to "${playerId}"`, () => {
            expect(heroVideo.props.playerId).to.eq(playerId);
        });
    });

    describe('display nothing on malformed item data', () => {
        it('handles missing item data', () => {
            reactModule = Context.mountComponent(Hero, {});
            expect(React.findDOMNode(reactModule)).to.be.null;
        });

        it('handles invalid video data', () => {
            // Invalid video object (missing videoConfiguration field
            const video = { properties: { } };
            const item = { video };

            reactModule = Context.mountComponent(Hero, { item });
            expect(React.findDOMNode(reactModule)).to.be.null;
        });
    });
});
