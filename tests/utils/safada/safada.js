var _ = require('lodash');
var SafadaAction = require('../safada/safadaAction');
var SafadaMock = require('../safada/safadaMock');
var SafadaStores = require('../safada/safadaStores');

var namedMocks = {};
var namedStubs = {};

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
            var payloads = context.MockContext.dispatchCalls.filter(function(item) {
                return item.name == eventName;
            }).map(function(item) {
                return item.payload;
            });
            return _.last(payloads);
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
            var payloads = context.getExecutedActions().filter(function(item) {
                return item.action === action;
            }).map(function(item) {
                return item.payload;
            });
            return _.last(payloads);
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