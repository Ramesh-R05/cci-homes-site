import { betterMockComponentContext } from '@bxm/flux';
import { mount } from 'enzyme';
const Context = betterMockComponentContext();
const { React } = Context;
const proxyquire = require('proxyquire').noCallThru();

const FooterNavigation = proxyquire('../../../app/components/footer/footerNavigation', {
    'react': React
});

describe(`FooterNavigation`, () => {
    const anchorClassNames = ['privacy', 'advertising', 'terms'];
    let reactModule;

    before(() => {
        reactModule = mount(<FooterNavigation />);
    });

    it(`should render the FooterNavigation Component`, () => {
        expect(reactModule.hasClass('footer__navigation')).to.be.true;
    });

    it(`should render the correct anchor attributes for ${anchorClassNames.join(',')}`, () => {
        anchorClassNames.forEach((item) => {
            const a = reactModule.find(`a.gtm-footer-${item}`);
            expect(a).to.have.length(1);
            const node = a.getDOMNode();
            expect(node.getAttribute('target')).to.eq('_blank');
            expect(node.getAttribute('href')).to.contain(item);
        });
    });
});
