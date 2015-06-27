import last from 'lodash/array/last';
import SafadaAction from '../safada/safadaAction';
import SafadaMock from '../safada/safadaMock';
import SafadaStores from '../safada/safadaStores';

let namedMocks = {};
let namedStubs = {};

module.exports = function(context) {
    return {
        reset: function(){
            context.MockContext.dispatchCalls = [];
        },
        createStoresFromData: function(data) {
            return new SafadaStores(context, data);
        },
        componentMock: function() {
            return new SafadaMock(context)
        },
        namedStub: function(name){
            if (!namedStubs[name]) {
                namedStubs[name] = sinon.stub();
            }
            return namedStubs[name]
        },
        namedComponentMock: function(name) {
            if (!namedMocks[name]) {
                namedMocks[name] = new SafadaMock(context, name);
            }
            return namedMocks[name]
        },
        getAllDispatches: function(){
            return context.MockContext.dispatchCalls;
        },
        wasDispatched: function(eventName) {
            return !!this.getDispatchedPayloads(eventName).length;
        },
        getDispatchedPayloads: function(eventName){
            return context.MockContext.dispatchCalls.filter(function(item) {
                return item.name == eventName;
            }).map(function(item) {
                return item.payload;
            });
        },
        getLastDispatchedPayload: function(eventName){
            const payloads = context.MockContext.dispatchCalls.filter(function(item) {
                return item.name == eventName;
            }).map(function(item) {
                return item.payload;
            });
            return last(payloads);
        },
        wasActionExecuted: function(action) {
            return !!this.getExecutedActionPayloads(action).length;
        },
        getExecutedActionPayloads: function(action) {
            return context.getExecutedActions().filter(function(item) {
                return item.action === action;
            }).map(function(item) {
                return item.payload;
            })
        },
        getLastExecutedActionPayload: function(action) {
            const payloads = context.getExecutedActions().filter(function(item) {
                return item.action === action;
            }).map(function(item) {
                return item.payload;
            });
            return last(payloads);
        },
        actionMock: function() {
            return function() {

            };
        },
        debug: {
            payloads: function(action) {
                console.log('--- executed actions:start ---');
                context.getExecutedActions().filter(function(item) {
                    return item.action === action;
                }).map(function(item) {
                    return item.payload;
                }).forEach(function(payload) {
                    console.log('payload', payload);
                });
                console.log('--- executed actions:end ---');

            },
            payloadsAll: function(action) {
                console.log('--- executed actions:start ---');
                context.getExecutedActions().map(function(item) {
                    return item.payload;
                }).forEach(function(payload) {
                    console.log('payload', payload);
                });
                console.log('--- executed actions:end ---');

            }
        }
    };
};
