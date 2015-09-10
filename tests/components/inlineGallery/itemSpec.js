import {betterMockComponentContext} from '@bxm/flux';
import {items as gogMock} from '../../mock/galleryOfGalleries';
import imageResize from '@bxm/ui/lib/common/ImageResize';
const proxyquire = require('proxyquire').noCallThru();

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const InlineGalleryItem = proxyquire('../../../app/components/inlineGallery/item', {
    'react': React
});

describe('InlineGalleryItem', () => {
    let reactModule;

    const item = gogMock[0];
    const tags = item.tags;
    const imageAltText = item.imageAltText;
    const imageUrl = item.imageUrl;
    const source = item.source;
    const title = item.title;
    const url = item.url;
    const props = {tags, imageAltText, imageUrl, source, title, url};

    let topic;
    let heading;
    let image;
    let link;

    afterEach(Context.cleanup);

    describe(`with all valid props`, () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<InlineGalleryItem {...props} />);
            topic = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gallery-item__topic');
            heading = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gallery-item__title');
            link = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'a');
            image = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'img');
        });

        it(`should render the correct source class`, () => {
            expect(React.findDOMNode(reactModule).className).to.contain(`gallery-item--${InlineGalleryItem.sourceClassNameMap[source]}`);
        });

        it(`should render a link with the correct href`, () => {
            expect(link.props.href).to.eq(url);
        });

        it(`should render the image with the correct image alt tag`, () => {
            expect(image.props.alt).to.eq(imageAltText);
        });

        it(`should render the correct topic tag`, () => {
            expect(React.findDOMNode(topic).textContent).to.eq(`Tips and advice`);
        });

        it(`should render the correct heading`, () => {
            expect(React.findDOMNode(heading).textContent).to.eq(title);
        });
    });

    describe(`without props`, () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<InlineGalleryItem />);
        });

        it(`should not render the component`, () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe(`without imageUrl prop`, () => {
        before(() => {
            let missingProps = {...props};
            delete missingProps.imageUrl;
            reactModule = TestUtils.renderIntoDocument(<InlineGalleryItem {...missingProps}/>);
        });

        it(`should not render the component`, () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe(`with only the imageUrl prop`, () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<InlineGalleryItem imageUrl={imageUrl} />);
        });

        it(`should not render the component`, () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe(`with only the imageUrl and url prop`, () => {
        let meta;

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<InlineGalleryItem imageUrl={imageUrl} url={url} />);
            image = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'img');
            meta = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gallery-item__meta');
        });

        it(`should render the component`, () => {
            expect(React.findDOMNode(reactModule)).to.exist;
        });

        it(`should hide the meta box`, () => {
            expect(React.findDOMNode(meta).className.indexOf('hide')).to.be.greaterThan(-1);
        });
    });

    describe(`without tags prop`, () => {
        let topic;

        before(() => {
            let missingProps = {...props};
            delete missingProps.tags;
            reactModule = TestUtils.renderIntoDocument(<InlineGalleryItem {...missingProps}/>);
            topic = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'gallery-item__topic');
        });

        it(`should render the component`, () => {
            expect(React.findDOMNode(reactModule)).to.exist;
        });

        it(`should hide the topic component`, () => {
            expect(React.findDOMNode(topic).className.indexOf('hide')).to.be.greaterThan(-1);
        });
    });

    describe(`different sources`, () => {
        const homesPlus = 'homes-plus';
        const realLiving = 'real-living';
        const belle = 'belle';
        const houseGarden = 'house-and-garden';

        it(`should render the source class ${homesPlus}`, () => {
            let newProps = {...props};
            newProps.source = 'homes+';
            reactModule = TestUtils.renderIntoDocument(<InlineGalleryItem {...newProps} />);
            expect(React.findDOMNode(reactModule).className).to.contain(`gallery-item--${homesPlus}`);
        });

        it(`should render the source class ${realLiving}`, () => {
            let newProps = {...props};
            newProps.source = 'real living';
            reactModule = TestUtils.renderIntoDocument(<InlineGalleryItem {...newProps} />);
            expect(React.findDOMNode(reactModule).className).to.contain(`gallery-item--${realLiving}`);
        });

        it(`should render the source class ${belle}`, () => {
            let newProps = {...props};
            newProps.source = 'Belle';
            reactModule = TestUtils.renderIntoDocument(<InlineGalleryItem {...newProps} />);
            expect(React.findDOMNode(reactModule).className).to.contain(`gallery-item--${belle}`);
        });

        it(`should render the source class ${houseGarden}`, () => {
            let newProps = {...props};
            newProps.source = 'Australian House and Garden';
            reactModule = TestUtils.renderIntoDocument(<InlineGalleryItem {...newProps} />);
            expect(React.findDOMNode(reactModule).className).to.contain(`gallery-item--${houseGarden}`);
        });

        it(`should not render a random source`, () => {
            let newProps = {...props};
            newProps.source = 'random';
            reactModule = TestUtils.renderIntoDocument(<InlineGalleryItem {...newProps} />);
            expect(React.findDOMNode(reactModule).className).to.not.contain(`gallery-item--random`);
        });
    });
});
