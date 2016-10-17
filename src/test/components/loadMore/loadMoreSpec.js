import {betterMockComponentContext, Component} from '@bxm/flux';
import {RouteStore} from 'fluxible-router';
import Immutable from 'immutable';

const Context = betterMockComponentContext();
const {React, ReactDOM, TestUtils} = Context;
const proxyquire = require('proxyquire').noCallThru();
const LoadingIconStub = Context.createStubComponentWithChildren();
const ButtonStub = Context.createStubComponent();
const FlexibleRouter = {
    handleHistory: c => c,
    navigateAction: sinon.spy()
};
const currentRoute = Immutable.fromJS({params: {all: 'url'}});
const LoadMore = proxyquire('../../../app/components/loadMore/loadMore', {
    'react': React,
    '../buttons/button': ButtonStub,
    './loadingIcon': LoadingIconStub,
    'fluxible-router': FlexibleRouter
});
const currentPage = 0;
const expectedUrRL = '/' + currentRoute.get('params').get('all') + '?page=' + (currentPage + 1);

Context.addStore('RouteStore', RouteStore);

let reactModule;
let button;

describe('Load More', function () {
    describe(`with (currentPage+1) < totalPages`, () => {
        before(() => {
            reactModule = Context.mountComponent(LoadMore, {
                currentPage: currentPage,
                totalPages: 2,
                currentRoute: currentRoute
            });
            button = TestUtils.findRenderedComponentWithType(reactModule, ButtonStub);
        });

        it('should render both a Button', () => {
            expect(button).to.exist;
        });

        it('try the click', () => {
            reactModule.onClick({
                type: 'click',
                stopPropagation: function () {
                },
                preventDefault: function () {
                }
            });

            let action = Context.getExecutedActions()[0];
            expect(FlexibleRouter.navigateAction).to.have.been.called;
            expect(action.payload.url).to.eq(expectedUrRL);
        });
    });

    describe(`with (currentPage+1) === totalPages`, () => {
        before(() => {
            reactModule = Context.mountComponent(LoadMore, {
                currentPage: 0,
                totalPages: 1
            });
        });

        it('should not render both a Button', () => {
            expect(ReactDOM.findDOMNode(reactModule)).not.to.exist;
        });
    });
});
