import { betterMockComponentContext } from '@bxm/flux';
import { shallow } from 'enzyme';
import proxyquire, { noCallThru } from 'proxyquire';

const Context = betterMockComponentContext();
const { React } = Context;
const AdStub = Context.createStubComponent();
const StickyAdStub = Context.createStubComponent();

noCallThru();

const Home = proxyquire('../../../app/components/home/header', {
    react: React,
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
    const expectedClassname = 'ad--section-top-leaderboard';
    const expectedSizes = {
        small: 'banner',
        leaderboard: 'leaderboard',
        billboard: ['billboard', 'leaderboard']
    };
    let reactModule;
    let stickyAd;

    before(() => {
        reactModule = shallow(<Home />);
        stickyAd = reactModule.find(StickyAdStub);
    });

    it(`should render the Sticky Ad component with correct position and sizes`, () => {
        expect(stickyAd).to.have.length(1);
        expect(stickyAd.prop('adProps').sizes).to.deep.eq(expectedSizes);
    });

    it(`should have the classname prop equal to ${expectedClassname}`, () => {
        expect(stickyAd.prop('adProps').className).to.eq(expectedClassname);
    });
});
