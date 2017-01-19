import {betterMockComponentContext} from '@bxm/flux';
import FooterNetworkInfo from '../../../app/components/footer/footerNetworkInfo';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

describe(`FooterNetworkInfo`, () => {
    let reactModule;
    let links;
    const trackClickSpy = sinon.spy();

    before(() => {
        window.dataLayer = {
            push: trackClickSpy
        };
        reactModule = TestUtils.renderIntoDocument(<FooterNetworkInfo />);
        links = TestUtils.scryRenderedDOMComponentsWithTag(reactModule, 'a');
    });

    it('should send the click event on each link to the dataLayer', () => {
        links.forEach((link) => {
            TestUtils.Simulate.click(link);
            expect(trackClickSpy.withArgs({event: 'click:brandlink'})).to.have.been.called;
        });
    });

    it('should open each link in the same window', () => {
        links.forEach((link) => {
            expect(ReactDOM.findDOMNode(link).getAttribute('target')).to.be.null;
        });
    });
});
