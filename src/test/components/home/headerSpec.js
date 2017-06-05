import {betterMockComponentContext} from '@bxm/flux';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const AdStub = Context.createStubComponent();

const Home = proxyquire('../../../app/components/home/header', {
    'react': React,
    '@bxm/ad/lib/google/components/ad': AdStub
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
    let ad;

    afterEach(Context.cleanup);

    before(() => {
        reactModule = Context.mountComponent(Home);
        ad = TestUtils.findRenderedComponentWithType(reactModule, AdStub);
    });

    it(`should render the Ad component with correct position and sizes`, () => {
        expect(ad).to.exist;
        const expectedSizes = {
            small: 'banner',
            leaderboard: 'leaderboard',
            billboard: ['billboard', 'leaderboard']
        };
        expect(ad.props.sizes).to.deep.equal(expectedSizes);
    });

    const expectedClassname = 'ad--section-top-leaderboard';
    it(`should have the classname prop equal to ${expectedClassname}`, () => {
        expect(ad.props.className).to.equal(expectedClassname);
    });
});
