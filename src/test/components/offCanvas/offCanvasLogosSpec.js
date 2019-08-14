import { shallow } from 'enzyme';
import proxyquire, { noCallThru } from 'proxyquire';
import { betterMockComponentContext } from '@bxm/flux';
import classNames from 'classnames';

noCallThru();
const Context = betterMockComponentContext();
const { React } = Context;

const OffCanvasLogos = proxyquire('../../../app/components/off-canvas/offCanvasLogos', {
    react: React,
    classNames
}).default;

const testWrapper = (testProps = {}) => shallow(<OffCanvasLogos {...testProps} />);

const logosMock = Array.from(Array(3), (x, i) => {
    const currentIndex = i + 1;
    return {
        imageUrl: `http://image/${currentIndex}`,
        url: `http://www.site${currentIndex}.com`,
        title: `Item ${currentIndex}`,
        id: `item${currentIndex}`
    };
});

describe('OffCanvasLogos component', () => {
    describe('rendering', () => {
        describe('with valid props', () => {
            let wrapper;
            const props = {};

            beforeEach(() => {
                props.logoList = logosMock;
                wrapper = testWrapper(props);
            });

            it('renders', () => {
                expect(wrapper.find('.off-canvas-logos')).to.have.length(1);
            });
        });

        describe('with invalid props', () => {
            let wrapper;

            beforeEach(() => {
                wrapper = testWrapper();
            });

            it('does not render', () => {
                expect(wrapper.find('.off-canvas-logos')).to.have.length(0);
            });
        });
    });

    describe('props', () => {
        describe('logoList', () => {
            let wrapper;
            const props = {
                logoList: logosMock
            };
            beforeEach(() => {
                wrapper = testWrapper(props);
            });

            it('renders one item for each logo in the list', () => {
                const expectedLength = logosMock.length;
                expect(wrapper.find('.off-canvas-logos__logo-wrapper')).to.have.length(expectedLength);
            });
            it('sets the correct className on the a element', () => {
                wrapper.find('.off-canvas-logos__logo-wrapper').forEach((element, index) => {
                    const className = element.find('a').prop('className');
                    const expectedClassname = `off-canvas-logos__anchor gtm-hamburger-${logosMock[index].id}`;

                    expect(className).to.eq(expectedClassname);
                });
            });
            it('sets the correct className on the img element', () => {
                wrapper.find('.off-canvas-logos__logo-wrapper').forEach((element, index) => {
                    const className = element.find('img').prop('className');
                    const expectedClassname = `off-canvas-logos__logo off-canvas-logos__logo--${logosMock[index].id}`;

                    expect(className).to.eq(expectedClassname);
                });
            });
        });
    });
});
