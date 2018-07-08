import {betterMockComponentContext} from '@bxm/flux';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const Uniheader = proxyquire('../../../app/components/header/uniheader', {
    'react': React
});

describe('Brand Header', () => {
    let reactModule;
    const brandDataStub = {
        uniheader: [
            {
                "imageUrl": "/assets/svgs/belle.svg",
                "url": "/belle/",
                "title": "Belle",
                "id" : "belle"
            }, {
                "imageUrl": "/assets/svgs/realliving_black.svg",
                "url": "/real-living/",
                "title": "real living",
                "id" : "realliving"
            }, {
                "imageUrl": "/assets/svgs/housegarden.svg",
                "url": "/australian-house-and-garden/",
                "title": "Australian House and Garden",
                "id" : "houseandgarden"
            }
        ]};

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            brands: brandDataStub
        }
    };

    describe('Rendering the Uniheader', () => {
        before(()=> {
            reactModule = Context.mountComponent(Uniheader, {}, [contextConfigStub]);
        });

        it('should render the component', () => {
            expect(ReactDOM.findDOMNode(reactModule)).to.exist;
        });

        it('should load an image for each brand in the config', () => {
            const image = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'img');
            expect(image.length).to.equal(brandDataStub.uniheader.length);
        });

        it('should apply the correct url to anchor', () => {
            const anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a');
            const anchorUrl = anchor[0].props.href;
            expect(anchorUrl).to.equal(brandDataStub.uniheader[0].url);
        });

        it('should apply the correct gtm class to anchor', () => {
            const anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a');
            const anchorClass = anchor[0].props.className;
            const correctClass = 'gtm-uniheader-' + brandDataStub.uniheader[0].id;
            expect(anchorClass).to.equal(correctClass);
        });
    });
});
