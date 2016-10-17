import {betterMockComponentContext} from '@bxm/flux';
import proxyquire, {noCallThru} from 'proxyquire';
noCallThru();

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const shallowRenderer = TestUtils.createRenderer();
const LoadingIcon = proxyquire('../../../app/components/loadMore/loadingIcon', {
    'react': React
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
            expect(output).to.include(downArrowIconClassName);
        });

        it(`rendered html does not contains ${loadingIconClassName}`, () => {
            expect(output).to.not.include(loadingIconClassName);
        });

    });

    describe(`with isLoading === true`, () => {
        before(() => {
            shallowRenderer.render(<LoadingIcon isLoading={true}/>);
            output = shallowRenderer.getRenderOutput().props.dangerouslySetInnerHTML.__html;
        });

        it(`rendered html does not contains ${downArrowIconClassName}`, () => {
            expect(output).to.not.include(downArrowIconClassName);
        });

        it(`rendered html contains ${loadingIconClassName}`, () => {
            expect(output).to.include(loadingIconClassName);
        });

    });
});
