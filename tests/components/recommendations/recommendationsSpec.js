import {betterMockComponentContext} from '@bxm/flux';

const proxyquire = require('proxyquire').noCallThru();
const Context = betterMockComponentContext();
const React = Context.React;
const Recommendations = proxyquire('../../../app/components/recommendations/recommendations', {
    'react': React,
    'react/addons': React,
    '../teaser/teaser': Context.createStubComponent()
});

const recommendationsClassName = 'recommendations';

describe(`Recommendation`, () => {
    let reactModule;

    describe(`when enabled in config`, () => {

        before(() => {
            const contextConfigStub = {
                key: 'config',
                type: '',
                value: { isFeatureEnabled: () => true }
            };
            reactModule = Context.mountComponent(Recommendations, {}, [contextConfigStub]);
        });

        it(`should render the component with class '${recommendationsClassName}'`, () => {
            const classNames = React.findDOMNode(reactModule).className.split(/\s+/);
            expect(classNames).to.contain(recommendationsClassName);
        });
    });

    describe(`when disabled in config`, () => {
        before(() => {
            const contextConfigStub = {
                key: 'config',
                type: '',
                value: { isFeatureEnabled: () => false }
            };
            reactModule = Context.mountComponent(Recommendations, {}, [contextConfigStub]);
        });

        it(`should not render the component`, () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
