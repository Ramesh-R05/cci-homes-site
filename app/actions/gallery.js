'use strict';


var historyUtils = require('@bxm/ui/lib/common/historyUtils');
var ActionTypes = require('../constants/AppConstants').ActionTypes;

module.exports = {

    nextGallery: function (context, payload) {
        context.dispatch(ActionTypes.NEXT_GALLERY, payload);
        historyUtils.extendAndPushState(payload.gallery.url);
    },

    completed: function (context, payload) {
        context.dispatch(ActionTypes.COMPLETED_GALLERY, payload);
    },

    receiveLinkInfo: function (context, payload) {
        var links = payload;
        if(!(links && Array.isArray(links) && links.length)) {
            return;
        }

        context.dispatch(ActionTypes.RECEIVE_GALLERIES_LINK_INFO, links[0]);
    },

    prevTeaser: function (context, payload) {
        context.dispatch(ActionTypes.PREV_TEASER);
    },

    nextTeaser: function (context, payload) {
        context.dispatch(ActionTypes.NEXT_TEASER);
    },

    goToTeaser: function (context, payload) {
        context.dispatch(ActionTypes.GO_TO_TEASER, payload);
    }
};
