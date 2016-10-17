import _ from 'lodash';
import moment from 'moment';

let currentId = 100;
let templates = {};

let formatDate = (date) => {
    return moment(date).format('YYYY-MM-DDTHH:mm:ss');
};

let createItem = (config, index) => {
    let item = _.cloneDeep(templates[config.template]);
    item = _.extend(item, config.defaults);

    if (typeof item.id === 'function') {
        item.id = item.id.call(item, currentId, index);
    } else {
        item.id = item.id + currentId;
    }

    _.forEach(Object.keys(item), function(key) {
        if (typeof item[key] === 'function') {
            item[key] = item[key].call(item, currentId, index);
        }
    });

    if (typeof config.transform == 'function') {
        config.transform.call(item, index);
    }

    return item;
}

module.exports = function() {
    let tarada = {
        createTemplatedData: function(config) {
            config.count = config.count || 1;
            config.template = config.template || "default";
            config.defaults = config.defaults || {};

            let items = [];
            for (let i = 0; i < config.count; i++) {
                items.push(createItem(config, i));
                currentId++;
            }

            return items;
        },
        setTemplate: function(name, data) {
            templates[name] = data;
        }
    };

    tarada.setTemplate("default", {
        id: function(id, index) {
            return "TEST-" + id;
        },
        dateCreated: function(id, index) {
            return formatDate(new Date(2000, 0, index + 1, 0, 0, id));
        },
        contentTitle: "Default Content Title",
        contentImageUrl: "http://some-url.com/some-path.jpg"
    });

    return tarada;
};
