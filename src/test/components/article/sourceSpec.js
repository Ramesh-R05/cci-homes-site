import {betterMockComponentContext} from '@bxm/flux';
import each from 'lodash/collection/each';
import {mount} from 'enzyme';
import get from 'lodash.get';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
// const proxyquire = require('proxyquire').noCallThru();
const LinkStub = Context.createStubComponentWithChildren();
// const Source = proxyquire('../../../app/components/article/source', {
//     'react': React,
//     '../brand/link': LinkStub
// });
import Source from '../../../app/components/article/source';

describe(`Source Component`, () => {
    const config = {
        article: {
            sources: {
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
            }
        }
    };

    const contextConfigStub = {
        key: 'config',
        type: React.PropTypes.object,
        value: {
            get(path) {
                return get(config, path, '');
            }
        }
    };
    let reactModule;
    let link;

    describe(`when passing all props`, () => {
        const source = 'Australian House and Garden';
        const className = `article__source`;
        const imgPath = `/assets/images/source`;

        before(`rendering component`, () => {
            reactModule = mount(<Source source={source}/>, { context: { config: contextConfigStub.value } });
        });

        it(`should render the component with class "${className}"`, () => {
            expect(reactModule.hasClass(className)).to.be.true;
        });

        it(`should render text "Article By" followed by the brand logo`, () => {
            expect(reactModule.text()).to.equal(`Article By`);
        });

        it(`should render the brand logo`, () => {
            expect(reactModule.find('img').getDOMNode().src).to.eq(`${imgPath}/australian-house-and-garden.svg`);
            expect(reactModule.find('img').getDOMNode().alt).to.eq(source);
        });

        it(`should not render at all if the source is unknown`, () => {
            reactModule = Context.mountComponent(Source, { source: 'doesnt exist' }, [contextConfigStub]);
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
