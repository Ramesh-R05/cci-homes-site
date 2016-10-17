import {betterMockComponentContext} from '@bxm/flux';
import each from 'lodash/collection/each';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const proxyquire = require('proxyquire').noCallThru();
const staticConfigurationStoreStub = {getBreakpoints: sinon.spy};
const LinkStub = Context.createStubComponentWithChildren();

const Source = proxyquire('../../../app/components/article/source', {
    'react': React,
    'react/addons': React,
    '../brand/link': LinkStub
});

describe(`Source Component`, () => {
    const sources = {
        'belle': {
            logo: 'belle.svg'
            },
        'real living': {
            logo: 'real-living.svg'
            },
        'australian house and garden': {
            logo: 'australian-house-and-garden.svg'
            },
        'homes+': {
            logo: 'homes.svg'
            },
        'homes to love': {
            logo: 'homes-to-love.svg'
            }
        };
    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            get(path) {
                const source = path[2].toLowerCase();
                return sources[source] ? sources[source].logo : '';
            }
        }
    };
    let reactModule;
    let link;
    let image;

    describe(`when passing all props`, () => {
        const source = 'Australian House and Garden';
        const className = `article__source`;
        const imgPath = `/assets/images/source`;

        before(`rendering component`, () => {
            reactModule = Context.mountComponent(Source, { source }, [contextConfigStub]);
            link = TestUtils.findRenderedComponentWithType(reactModule, LinkStub);
            image = TestUtils.findRenderedDOMComponentWithTag(link, `img`);
        });

        it(`should render the component with class "${className}"`, () => {
            expect(React.findDOMNode(reactModule).getAttribute('class')).to.contain(className);
        });

        it(`should render text "Article By" followed by the brand logo`, () => {
            expect(React.findDOMNode(reactModule).textContent).to.equal(`Article By`);
        });

        it(`should render the brand logo`, () => {
            expect(image.props.src).to.eq(`${imgPath}/australian-house-and-garden.svg`);
        });

        it(`should wrap the image logo with the Source Link component`, () => {
            const linkImage = TestUtils.findRenderedDOMComponentWithTag(link, 'img');
            expect(link.props.source).to.eq(source);
            expect(linkImage).to.deep.eq(image);
        });
    });

    describe(`source links`, () => {
        each(['homes+', 'real living','Belle', 'Australian House and Garden'], (source) => {
            it(`should link the ${source} brand logo`, () => {
                reactModule = Context.mountComponent(Source, { source }, [contextConfigStub]);
                link = TestUtils.findRenderedComponentWithType(reactModule, LinkStub);
                image = TestUtils.findRenderedDOMComponentWithTag(link, `img`);

                const linkImage = TestUtils.findRenderedDOMComponentWithTag(link, 'img');
                expect(link.props.source).to.eq(source);
                expect(linkImage).to.deep.eq(image);
            });
        });

        it(`should not render at all if the source is unknown`, () => {
            reactModule = Context.mountComponent(Source, { source: `Tony Abbott` }, [contextConfigStub]);
            expect(React.findDOMNode(reactModule)).not.to.exist;
        });
    });

    describe(`when passing no props`, () => {
        before(`rendering component`, () => {
            reactModule = Context.mountComponent(Source, {}, [contextConfigStub]);
        });

        it(`should not render the component`, () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
