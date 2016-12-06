import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
import UniHeader from '../../../app/components/header/uniheader'

describe('Brand Header', () => {
    let reactModule;
    const brandDataStub = [{
        "imageUrl": "/assets/images/logos/AWW-logo.svg",
        "url": "http://aww.com.au/",
        "title": "Australian Women's Weekly",
        "gtmClass": "aww"
    },
        {
            "imageUrl": "/assets/images/logos/WD-logo.svg",
            "url": "http://aww.com.au/",
            "title": "Woman's Day",
            "gtmClass": "wd"
        },
        {
            "imageUrl": "/assets/images/logos/GH-logo.svg",
            "url": "http://www.homestolove.com.au/",
            "title": "Good Health",
            "gtmClass": "gh"
        }];

    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            brands: brandDataStub
        }
    };

    describe('Rendering the UniHeader', () => {
        before(()=> {
            reactModule = Context.mountComponent(UniHeader, {}, [contextConfigStub]);
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
            const correctClass = 'gtm-uniheader-' + brandDataStub[0].gtmClass;
            expect(anchorClass).to.equal(correctClass);
        });
    });

});
