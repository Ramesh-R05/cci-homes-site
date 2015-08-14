import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;
const shallowRenderer = TestUtils.createRenderer();
const proxyquire = require('proxyquire').noCallThru();
const LoadingIcon = proxyquire('../../../app/components/loadMore/loadingIcon', {
    'react': React,
    'react/addons': React
});
let reactModule;
let loadingIconClassName = 'loading-icon';
let downArrowIconClassName = 'down-arrow';

describe(`LoadingIcon`, () => {
    afterEach(Context.cleanup);

    let output;

    describe(`with isLoading === false`, () => {
        before(() => {
            shallowRenderer.render(<LoadingIcon isLoading={false}/>);
            output = shallowRenderer.getRenderOutput().props.dangerouslySetInnerHTML.__html;

        });

        it(`rendered html contains ${downArrowIconClassName}`, () => {
            output.should.include(downArrowIconClassName);
        });

        it(`rendered html does not contains ${loadingIconClassName}`, () => {
            output.should.not.include(loadingIconClassName);
        });

    });

    describe(`with isLoading === true`, () => {

        before(() => {
            shallowRenderer.render(<LoadingIcon isLoading={true}/>);
            output = shallowRenderer.getRenderOutput().props.dangerouslySetInnerHTML.__html;
        });

        it(`rendered html does not contains ${downArrowIconClassName}`, () => {
            output.should.not.include(downArrowIconClassName);
        });

        it(`rendered html contains ${loadingIconClassName}`, () => {
            output.should.include(loadingIconClassName);
        });

    });
});