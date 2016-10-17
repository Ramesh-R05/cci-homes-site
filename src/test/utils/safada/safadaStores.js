import extend from 'lodash/object/extend';

let SafadaStores = function(context, data) {

    this.cloneObject = function(source) {
        return JSON.parse(JSON.stringify(source));
    };

    this.context = context;
    this.data = data;
    this.initialData = this.cloneObject(data);

    this.createStoresFromData(context, data);
};

extend(SafadaStores.prototype, {
    set: function(store, method, value) {
        this.data[store][method] = value;
    },
    get: function(store, method) {
        return this.data[store][method];
    },
    reset: function() {
        this.data = this.cloneObject(this.initialData);
    },
    createStoresFromData: function(context, data) {
        const _this = this;
        Object.keys(data).forEach(function(store) {
            let storeMock = {};
            Object.keys(data[store]).forEach(function(method) {
                storeMock[method] = _this.getMockValue(store, method);
            });
            context.addStore(store, storeMock);
        });
    },
    getMockValue: function(store, method) {
        const _this = this;
        return function() {
            //console.log('StoreMocks.getMockValue - ' + store + '.' + method + '=' + _this.data[store][method]);
            return _this.data[store][method];
        };
    }
});

module.exports = SafadaStores;
