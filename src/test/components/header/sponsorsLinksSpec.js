import React from 'react';
import { shallow } from 'enzyme';

describe('Component', () => {
    const proxyquire = require('proxyquire').noCallThru();
    const { SponsorsLinks } = proxyquire('../../../app/components/header/sponsorsLinks', {
        'react': React
    });

    describe('SponsorLinks', () => {
        it('should have render out 5 list and 4 logos images', () => {
            const wrapper = shallow(<SponsorsLinks
                by="powered by" />);

            expect(wrapper.find('li')).to.have.length(5);
            expect(wrapper.find('img')).to.have.length(4);
            expect(wrapper.find('.header-sponsors--by').text()).to.equal('POWERED BY');
        });

        it('should have modify the class name when classNameModify pass down', () => {
            const wrapper = shallow(<SponsorsLinks
                by="powered by"
                classNameModify="--test"/>);

            expect(wrapper.find('.header-sponsors--test')).to.have.length(1);
        });

        it('should have header__sections when expanded set to true', () => {
            const wrapper = shallow(<SponsorsLinks
                by="powered by"
                classNameModify="--test"/>);

            expect(wrapper.find('.header__sections')).to.have.length(1);
        });

        it('should have render out 5 list and 4 span text', () => {
            const wrapper = shallow(<SponsorsLinks
                by="powered by"
                displayTextOnly={true} />);

            expect(wrapper.find('li')).to.have.length(5);
            expect(wrapper.find('span')).to.have.length(4);
        });
    });
});
