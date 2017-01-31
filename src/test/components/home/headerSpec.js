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
        expect(ad.props.targets).to.deep.equal({position: 1});
        const expectedSizes = {
            small: 'banner',
            medium: 'leaderboard',
            large: ['billboard', 'leaderboard']
        };
        expect(ad.props.sizes).to.deep.equal(expectedSizes);
    });

    const expectedClassname = 'ad--section-top-leaderboard';
    it(`should have the classname prop equal to ${expectedClassname}`, () => {
        expect(ad.props.className).to.equal(expectedClassname);
    });

    it(`should be displayed on all viewports`, () => {
        expect(ad.props.displayFor).to.deep.equal(['small', 'medium', 'large', 'xlarge']);
    });
});
