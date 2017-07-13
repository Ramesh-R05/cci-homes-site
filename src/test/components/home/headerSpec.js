import {betterMockComponentContext} from '@bxm/flux';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const AdStub = Context.createStubComponent();
const StickyAdStub = Context.createStubComponent();

const Home = proxyquire('../../../app/components/home/header', {
    'react': React,
    '@bxm/ad/lib/google/components/ad': AdStub,
    '@bxm/ad/lib/google/components/stickyAd': StickyAdStub
});

AdStub.pos = {
    aside: 'rhs',
    outside: 'outside',
    body: 'body',
    wallpaper: 'wallpaper',
    inskin: 'inskin',
    panel: 'panel'
};

describe('Home Header with Top banner/leaderboard/billboard ad', () => {
    let reactModule;
    let stickyAd;
    afterEach(Context.cleanup);

    before(() => {
        reactModule = Context.mountComponent(Home);
        stickyAd = TestUtils.scryRenderedComponentsWithType(reactModule, StickyAdStub);
    });

    it(`should render the Sticky Ad component with correct position and sizes`, () => {
        expect(stickyAd).to.exist;
        const expectedSizes = {
            small: 'banner',
            leaderboard: 'leaderboard',
            billboard: ['billboard', 'leaderboard']
        };
        expect(stickyAd[0].props.adProps.sizes).to.deep.equal(expectedSizes);
    });

    const expectedClassname = 'ad--section-top-leaderboard';
    it(`should have the classname prop equal to ${expectedClassname}`, () => {
        expect(stickyAd[0].props.adProps.className).to.equal(expectedClassname);
    });
});
