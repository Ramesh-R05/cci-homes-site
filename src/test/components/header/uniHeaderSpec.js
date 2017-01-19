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
    const brandDataStub = [
        {
            "imageUrl": "/assets/images/logos/AWW-logo.svg",
            "url": "http://aww.com.au/",
            "title": "Australian Women's Weekly",
            "id": "aww"
        },
        {
            "imageUrl": "/assets/images/logos/WD-logo.svg",
            "url": "http://aww.com.au/",
            "title": "Woman's Day",
            "id": "wd"
        },
        {
            "imageUrl": "/assets/images/logos/GH-logo.svg",
            "url": "http://www.homestolove.com.au/",
            "title": "Good Health",
            "id": "gh"
        }
    ];

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
            expect(image.length).to.equal(brandDataStub.length);
        });

        it('should apply the correct url to anchor', () => {
            const anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a');
            const anchorUrl = anchor[0].props.href;
            expect(anchorUrl).to.equal(brandDataStub[0].url);
        });

        it('should apply the correct gtm class to anchor', () => {
            const anchor = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a');
            const anchorClass = anchor[0].props.className;
            const correctClass = 'gtm-uniheader-' + brandDataStub[0].id;
            expect(anchorClass).to.equal(correctClass);
        });
    });
});
