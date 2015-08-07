import keyMirror from 'react/lib/keyMirror';

module.exports = {
    ActionTypes: keyMirror({
        LOAD_CONTENT: null,
        RECEIVE_GALLERIES: null,
        OPENED_GALLERY: null,
        COMPLETED_GALLERY: null,
        NEXT_GALLERY: null,
        PREV_GALLERY: null,
        RECEIVE_GALLERIES_LINK_INFO: null,
        RECEIVE_GALLERIES_TEASERS: null
    })
};
