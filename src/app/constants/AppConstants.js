import keyMirror from 'keymirror';

module.exports = {
    ActionTypes: keyMirror({
        LOAD_CONTENT: null,
        RECEIVE_GALLERIES: null,
        RECEIVE_GALLERIES_LINK_INFO: null,
        RECEIVE_GALLERIES_TEASERS: null
    })
};
