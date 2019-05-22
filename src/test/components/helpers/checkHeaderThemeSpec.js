import { betterMockComponentContext } from '@bxm/flux';
import ShallowWrapperFactory from '../../utils/ShallowWrapperFactory';
import CheckHeaderTheme from '../../../app/components/helpers/checkHeaderTheme';
import keyMirror from 'keymirror';

const Context = betterMockComponentContext();

describe('CheckHeaderTheme higher order component', () => {
    describe('when passed a valid component', () => {
        describe('with a valid theme in the props', () => {
            let wrapper;
            let testProps;
            let StubbedChild;

            before(() => {
                StubbedChild = Context.createStubComponent();
                StubbedChild.displayName = 'StubbedChild';
                const TestWrapper = new ShallowWrapperFactory(CheckHeaderTheme(StubbedChild));

                [wrapper, testProps] = TestWrapper({
                    otherProps: {
                        foo: 'true'
                    },
                    theme: keyMirror({
                        headerSmallBackground: null,
                        headerMediumBackground: null,
                        headerLargeBackground: null,
                        headerLogoAlignment: null,
                        headerLogoColour: null,
                        themeAlignment: null,
                        themeColour: null,
                        themeImage: null
                    })
                });
            });

            it('spreads the props onto the passed component', () => {
                expect(wrapper.find(StubbedChild).props()).to.deep.eq({ ...testProps });
            });

            it('passes the theme as the theme prop to the passed component', () => {
                expect(wrapper.find(StubbedChild).prop('theme')).to.deep.eq(testProps.theme);
            });
        });
        describe('with an invalid theme in the props', () => {
            let wrapper;
            let testProps;
            let StubbedChild;

            before(() => {
                StubbedChild = Context.createStubComponent();
                StubbedChild.displayName = 'StubbedChild';
                const TestWrapper = new ShallowWrapperFactory(CheckHeaderTheme(StubbedChild));

                [wrapper, testProps] = TestWrapper({
                    otherProps: {
                        foo: 'true'
                    },
                    theme: false
                });
            });

            it('spreads the props onto the passed component', () => {
                expect(wrapper.find(StubbedChild).props()).to.deep.eq({ ...testProps, otherProps: testProps.otherProps, theme: {} });
            });

            it('passes the an empty object as the theme prop to the passed component', () => {
                expect(wrapper.find(StubbedChild).prop('theme')).to.deep.eq({});
            });
        });
    });
    describe('when passed an invalid component', () => {
        let wrapper;

        before(() => {
            wrapper = CheckHeaderTheme(null);
        });

        it('returns null', () => {
            expect(wrapper).to.be.null;
        });
    });
});
