import { betterMockComponentContext } from '@bxm/flux';
import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();
const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;
const MainFooterStub = Context.createStubComponent();

const ArticleFooter = proxyquire('../../../app/components/article/footer', {
    react: React,
    '../footer/footer': MainFooterStub
});

describe('ArticleFooter', () => {
    const localData = { data: '' };
    const contextConfigStub = {
        key: 'config',
        type: '',
        value: {
            get() {
                return localData;
            }
        }
    };
    let reactModule;
    let footerComponent;

    before(() => {
        reactModule = Context.mountComponent(ArticleFooter, {}, [contextConfigStub]);
        footerComponent = TestUtils.findRenderedComponentWithType(reactModule, MainFooterStub);
    });

    it('should pass the config to the Footer', () => {
        expect(footerComponent.props.config).to.deep.eq(localData);
    });

    it('should pass the iframeKey to the Footer', () => {
        expect(footerComponent.props.iframeKey).to.eq('articlefooter');
    });

    it('should pass the modifier to the Footer', () => {
        expect(footerComponent.props.modifier).to.eq('article');
    });
});
