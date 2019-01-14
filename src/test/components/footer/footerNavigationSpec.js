import { betterMockComponentContext } from '@bxm/flux';
import { mount } from 'enzyme';
const Context = betterMockComponentContext();
const { React } = Context;
const proxyquire = require('proxyquire').noCallThru();

const FooterNavigation = proxyquire('../../../app/components/footer/footerNavigation', {
    react: React
});

describe(`FooterNavigation`, () => {
    const anchorClassNames = ['privacy', 'advertising', 'terms'];
    let wrapper;

    before(() => {
        wrapper = mount(<FooterNavigation />);
    });

    it(`should render the FooterNavigation Component`, () => {
        expect(wrapper.find('.footer__navigation').exists()).to.be.true;
    });

    it(`should render the correct anchor attributes for ${anchorClassNames.join(',')}`, () => {
        anchorClassNames.forEach(item => {
            const a = wrapper.find(`a.gtm-footer-${item}`);
            expect(a).to.have.length(1);
            const node = a.getDOMNode();
            expect(node.getAttribute('target')).to.eq('_blank');
            expect(node.getAttribute('href')).to.contain(item);
        });
    });
});
