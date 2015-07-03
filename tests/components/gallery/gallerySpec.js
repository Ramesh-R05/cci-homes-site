import {betterMockComponentContext} from '@bxm/flux';
import GalleryActionCreators from '@bxm/gallery/lib/actions/gallery';
import {filter} from 'lodash/collection';
import gallery from '../../mock/gallery'

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();

const GalleryHeaderStub = Context.createStubComponent();
const Gallery = proxyquire('../../../app/components/gallery/gallery', {
    'react': React,
    'react/addons': React,
    '@bxm/gallery/lib/components/galleryHeader': GalleryHeaderStub
});

Context.addStore('GalleryStore', {
    getItems() {
        return gallery.content.galleryItems;
    }
});

Context.addStore('EntityStore', {
    getTitle() {
        return gallery.title;
    },
    getContent() {
        return gallery.content;
    }
});

describe(`Gallery Component`, () => {
    let reactModule;
    let header;

    afterEach(Context.cleanup);

    describe(`when passing all props`, () => {

        before(`rendering component`, () => {
            reactModule = Context.mountComponent(Gallery);
            header = TestUtils.findRenderedComponentWithType(reactModule, GalleryHeaderStub);
        });

        it(`should render the component and its children`, () => {
            expect(React.findDOMNode(reactModule)).is.not.null;
            expect(header).to.exist;
        });

        describe(`gallery header`, () => {
            const title = gallery.title;

            it(`should set the title prop to "${title}"`, () => {
                expect(header.props).to.have.property('title', title);
            });
        });

        it(`should execute the initialize action with payload once`, () => {
            const initActions = filter(Context.getExecutedActions(), {
                action: GalleryActionCreators.initialize
            });
            expect(initActions).to.have.length(1);
            expect(initActions[0].payload).to.eql({
                galleryTitle: gallery.title,
                items: gallery.content.galleryItems
            });
        });
    });
});
