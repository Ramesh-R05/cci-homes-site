import {betterMockComponentContext} from '@bxm/flux';
import {localeData} from '../../mock/config';

const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

const MagShop = proxyquire('../../../app/components/magshop/magshop', {
    'react': React
});

const dataLayerStub = {
    push: sinon.spy()
};

const magShopData = localeData.magShop;

describe(`MagShop`, () => {
    let previousDataLayer;
    let reactModule;
    let domElement;
    let magshopImage;
    let magshopLink;

    before(() => {
        previousDataLayer = window.dataLayer;
        window.dataLayer = dataLayerStub;
    });

    beforeEach( () => {
        reactModule = Context.mountComponent(MagShop, {
            content: magShopData
        });
        domElement = ReactDOM.findDOMNode(reactModule);
    });

    after(() => {
        window.dataLayer = previousDataLayer;
    });

    afterEach(Context.cleanup);

    it(`should render the MagShop Component`, () => {
        expect(reactModule).to.exist;
    });

    it('should render Magshop magazine image', () => {
        magshopLink = domElement.querySelector('.magshop a');
        magshopImage = domElement.querySelector('.magshop img');

        expect(magshopLink).to.exist;
        expect(magshopImage).to.exist;

        expect(magshopLink.getAttribute('href')).to.equal('https://www.magshop.com.au/store/homestolove');
        expect(magshopLink.getAttribute('target')).to.equal('_blank');

        expect(magshopImage.getAttribute('src')).to.equal('/assets/images/magazines.png');
        expect(magshopImage.getAttribute('alt')).to.equal('Women\'s Weekly Cookbooks');
    });

    describe('Given the Magshop component appears in the side navigation', () => {
        beforeEach( () => {
            reactModule = Context.mountComponent(MagShop, {
                inSideNav: true,
                content: magShopData
            });
            domElement = ReactDOM.findDOMNode(reactModule);
        });

        it('should not render the magazine image', () => {
            magshopImage = domElement.querySelector('.magshop img');
            expect(magshopImage).to.not.exist;
        });
    });

    describe(`data layer interaction`, () => {
        beforeEach(() => {
            dataLayerStub.push.reset();
        });

        it(`pushes subscription on clicking cover image`, () => {
            magshopImage = domElement.querySelector('.magshop img');

            TestUtils.Simulate.click(magshopImage);
            expect(dataLayerStub.push).to.have.been.calledWith({event: 'subscribe.click'});
        });

        it(`pushes subscription on clicking Subscribe btn`, () => {
            TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithClass(reactModule, `button--subscribe`));
            expect(dataLayerStub.push).to.have.been.calledWith({event: 'subscribe.click'});
        });
    });
});
