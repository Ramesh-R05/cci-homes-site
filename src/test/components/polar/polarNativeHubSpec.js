import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const proxyquire = require('proxyquire').noCallThru();
const PolarHubStub = Context.createStubComponent();
const TeaserStub = Context.createStubComponent();
const PolarNativeHub = proxyquire('../../../app/components/polar/polarNativeHub', {
    'react': React,
    '@bxm/ad/lib/polar/components/hub/hub': PolarHubStub,
    './polarTeaserImage': TeaserStub
});

describe('polarNativeHub', () => {
    describe('renders polar hub module', () => {
        let reactModule;
        let polarHub;
        const hubId = 'hubid';

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<PolarNativeHub
                hubId = 'hubid'
                />);

            polarHub = TestUtils.findRenderedComponentWithType(reactModule, PolarHubStub);
        });

        it ('should have a polarHub Component', () => {
            expect(polarHub).to.exist;
        });

        it(`PolarNativeHub should have the ad.id prop equal to ${hubId}`, () => {
            expect(polarHub.props.ad.id).to.equal(hubId);
        });
    });

    describe('renders without hubId', () => {
        let reactModule;
        let polarHub;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<PolarNativeHub
                />);

            polarHub = TestUtils.findRenderedComponentWithType(reactModule, PolarHubStub);
        });

        const expectedHubId = 'homes_hub';
        it(`PolarNativeHub should have the ad.id prop equal to ${expectedHubId}`, () => {
            expect(polarHub.props.ad.id).to.equal(expectedHubId);
        });
    });

    describe('#renderTeasers()', () => {
        const teasersData = [
            {data: {id: 'teaser-1', title: 'Teaser 1', link: 'http://teaser-1.com'}},
            {data: {id: 'teaser-2', title: 'Teaser 2', link: 'http://teaser-2.com'}}
        ];

        const onClickSpy = sinon.spy();
        let teasers;

        before(() => {
            teasers = PolarNativeHub.renderTeasers(teasersData, onClickSpy);
        });

        const expectedNumTeasers = 2;
        it(`should return ${expectedNumTeasers} teasers`, () => {
            expect(teasers).to.have.length(expectedNumTeasers);
        });

        it('should pass down the correct props for each teaser', () => {
            teasers.forEach((item, index) => {
                const props = item.props;
                const data = teasersData[index].data;
                expect(props.nativeAd).to.deep.equal(data);
            });
        });
    });
});
