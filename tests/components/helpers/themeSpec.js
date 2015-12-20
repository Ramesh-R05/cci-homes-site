import {betterMockComponentContext} from '@bxm/flux';
const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;

/* the createStubComponent() function doesn't set this.props correctly. To test HOC correctly,I need to get stubComponent to have this.props set in order to test access to 'themeAttribute' */
let stubComponent = (props) => class extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {themeClass} = this.props;
        return <div className={themeClass} />;
    }
};

const proxyquire = require('proxyquire').noCallThru();
const themeData = {'themeAttribute' : 'green'};
const themeClass = 'theme-green';
const ComponentStubWithNoThemeProperty = stubComponent();
const ComponentStubWithThemeProperty = stubComponent(themeData);
const theme = proxyquire('../../../app/components/helpers/theme', {
    'react': React
});

describe(`Theme Helper`, () => {
    let noThemeComponent;
    let themeComponent;
    let reactModule;
    let component;

    before(() => {
        noThemeComponent = theme(ComponentStubWithNoThemeProperty, 'themeAttribute');
        themeComponent = theme(ComponentStubWithThemeProperty, 'themeAttribute');
    });

    describe(`source prop not included in mounting props`, () => {
        before(() => {
            reactModule = Context.mountComponent(noThemeComponent, {});
            component = TestUtils.findRenderedComponentWithType(reactModule, ComponentStubWithNoThemeProperty);
        });

        it(`check if ThemeClass prop exists`, () => {
            expect(component.props).to.have.property('themeClass');
        });

        it(`check if ThemeClass prop exists and is null`, () => {
            expect(component.props).to.have.property('themeClass', null);
        });

        it(`check if className attribute is set and empty`, () => {
            const className = ReactDOM.findDOMNode(reactModule).className;
            expect(className).to.eq('');
        });
    });

    describe(`source prop is included in mounting props`, () => {
        before(() => {
            reactModule = Context.mountComponent(themeComponent, themeData);
            component = TestUtils.findRenderedComponentWithType(reactModule, ComponentStubWithThemeProperty);
        });

        it(`check if ThemeClass prop exists`, () => {
            expect(component.props).to.have.property('themeClass');
        });

        it(`check if ThemeClass prop exists and is equal to "{$themeClass}"`, () => {
            expect(component.props).to.have.property('themeClass', themeClass);
        });

        it(`check if className attribute is set and is equal to "{$themeClass}"`, () => {
            const className = ReactDOM.findDOMNode(reactModule).className;
            expect(className).to.eq(themeClass);
        });
    });
});
