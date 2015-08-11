import {createStore} from '@bxm/flux';
import {pushAds} from '@bxm/ad/lib/google/storeUtils';
import {ActionTypes} from '../constants/AppConstants';
import uniq from 'lodash/array/uniq';


module.exports = createStore({

    // ------------------------------------------------------------------------ store

    storeName: 'GalleryPageStore',

    initialize: function () {
        this.galleries = [];
        this.slides = [];
        this.currentGallery = null;
        this.currentGalleryIndex = 0;
        this.nextGallery = null;
        this.numAds = 0;
    },

    clearStore: function() {
        this.initialize();
    },

    getState() {
        return {
            galleries: this.galleries,
            slides: this.slides,
            currentGallery: this.currentGallery,
            currentGalleryIndex: this.currentGalleryIndex,
            nextGallery: this.nextGallery,
            numAds: this.numAds
        };
    },

    dehydrate() {
        return this.getState();
    },

    rehydrate(state) {
        this.galleries = state.galleries;
        this.slides = state.slides;
        this.currentGallery = state.currentGallery;
        this.currentGalleryIndex = state.currentGalleryIndex;
        this.nextGallery = state.nextGallery;
        this.numAds = state.numAds;
    },

    // ------------------------------------------------------------------------ handlers

    handlers: {
        [ActionTypes.LOAD_CONTENT]: 'onLoadContent',
        [ActionTypes.NEXT_GALLERY]: 'onNextGallery'
    },

    onLoadContent: function(payload) {
        var entity = payload.body.entity;
        if (!entity || entity.nodeType != 'Gallery') return;

        var subsectionGalleries = [];
        if (payload.body.stores.subsectionGalleries) {
            subsectionGalleries = payload.body.stores.subsectionGalleries.items;
        }

        this.addGalleries(entity, subsectionGalleries);
        this.emitChange();
    },

    onNextGallery: function() {
        this.setNextActiveGallery();
        this.emitChange();
    },

    addGalleries: function(current, more) {
        this.currentGallery = current;

        this.galleries = more;
        this.galleries.unshift(current); // add current gallery in first position
        this.galleries = uniq(this.galleries, 'id'); // remove duplicates

        this.setNextGallery();
        this.setGalleryItems(this.currentGallery);
        this.numAds = this.insertAds(this.currentGallery);
    },

    setNextGallery: function() {
        if (this.currentGalleryIndex === this.galleries.length - 1) {
            // last gallery go to start
            this.currentGalleryIndex = 0;
        } else {
            this.currentGalleryIndex++;
        }
        this.nextGallery = this.galleries[this.currentGalleryIndex];
    },

    setGalleryItems: function(currentGallery) {
        this.currentGallery.galleryItems = currentGallery.galleryItems || [];
    },

    insertAds: function(gallery) {
        return pushAds(gallery.galleryItems, {
            offset: 5,
            firstOffset: 4,
            minOccurrence: 2,
            slotId: 3,
            slotPos: 2
        });
    },

    setNextActiveGallery: function() {
        this.currentGallery = this.nextGallery;
        this.setNextGallery();
        this.setGalleryItems(this.currentGallery);
        this.numAds = this.insertAds(this.currentGallery);
    },

    // ------------------------------------------------------------------------ api

    getGallery: function() {
        return this.currentGallery;
    },

    getGalleryItems: function() {
        var gallery = this.currentGallery;
        return gallery && gallery.galleryItems || [];
    },

    getMoreGalleries: function() {
        return this.galleries.filter(function(gallery) {
            return gallery.type === 'more';
        });
    },

    getNextGallery: function() {
        return this.nextGallery;
    },

    getNumAds: function() {
        return this.numAds;
    }
});
