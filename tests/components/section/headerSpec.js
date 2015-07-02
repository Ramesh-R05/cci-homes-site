import {betterMockComponentContext} from '@bxm/flux';
import {articles as articlesMock} from '../../mock/articles';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const Header = proxyquire('../../../app/components/section/header', {
    'react': React
});

describe('SectionHeader', () => {

    describe('with children', () => {
        let reactModule;
        let childComponent;
        const ChildrenComponentStub = Context.createStubComponentWithChildren();

        before(() => {
            reactModule = TestUtils.renderIntoDocument(
                <Header tag="Section title">
                    <ChildrenComponentStub />
                </Header>
            );
            childComponent = TestUtils.findRenderedComponentWithType(reactModule, ChildrenComponentStub);
        });

        it('should render the child component', () => {
            expect(React.findDOMNode(childComponent)).to.exist;
        });
    });

});
