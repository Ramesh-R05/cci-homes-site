var lhr = require('../page_objects/lhr_widget');
var wn_article = require('../page_objects/article_widget');
var wait = require('../utils/wait');
var nconf = require('nconf');
var site_domain = nconf.get('APP_KEY');

module.exports = function() {

    this.When(/^I can see (\d+) items in the list of items in RHR$/, function (count) {
        wait(5000);
        // Verifying 20 images, clickable and long title available and clickable
        var feedList = browser.elements(wn_article.lhrFeedItems);
        expect((feedList.value.length).toString()).toEqual(count);
        var feedImages = browser.elements(wn_article.lhrFeedImgs);
        expect((feedImages.value.length).toString()).toEqual(count);
        var feedImagesUrls = browser.getAttribute(wn_article.lhrFeedImgs, 'href');
        for (var i = 0; i < count; ++i) {
            var indFeedImgUrl = feedImagesUrls[i];
            var feedTitles = browser.getText(wn_article.lhrFeedTitles);
            var title = feedTitles[i];
            var feedTitlesUrls = browser.getAttribute(wn_article.lhrFeedTitles, 'href');
            var titleUrl = feedTitlesUrls[i];
            console.log(i + ': teaser url is :' + indFeedImgUrl);
            expect(indFeedImgUrl === '').toBe(false);
            expect(title === '').toBe(false);
            expect(titleUrl === '').toBe(false);
            expect(titleUrl === null).toBe(false);}
    });


    this.When(/^I can see the hero image$/, function () {
        browser.scroll(wn_article.heroImg);
        var heroImg = browser.waitForVisible(wn_article.heroImg,5000);
        expect(heroImg).toBe(true);
    });
    this.When(/^I can see the hero image on Food$/, function () {
        browser.scroll(wn_article.heroImgFood);
        var heroImg = browser.waitForVisible(wn_article.heroImgFood,5000);
        expect(heroImg).toBe(true);
    });
    this.Given(/^I can see the image alt text in the hero image element "([^"]*)"$/, function (altText) {
        var imgaltText = browser.getAttribute(wn_article.heroImg, 'alt');
        console.log(imgaltText);
        expect(imgaltText).toMatch(altText);
    });
    this.When(/^I should not see the hero image caption$/, function () {
        var heroImgCaption = browser.isVisible(wn_article.heroImgCaption);
        expect(heroImgCaption).toBe(false);
    });
    this.When(/^I can see the hero image caption "([^"]*)"$/, function (ImgCaption) {
        var heroImgCaption = browser.getText(wn_article.heroImgCaption);
        expect(heroImgCaption).toContain(ImgCaption);
    });
    this.When(/^I can see the LHR$/, function () {
        var lhrFeed = browser.isVisible(wn_article.lhrFeed);
        expect(lhrFeed).toBe(true);
    });
    this.When(/^I should not see the LHR$/, function () {
        var lhrFeed = browser.isVisible(wn_article.lhrFeed);
        expect(lhrFeed).toBe(false);
    });
    this.Given(/^I can see the long title "([^"]*)"$/, function (articleTitle) {
           var longTitle = browser.getText(wn_article.longTitle);
           expect(longTitle).toContain(articleTitle);
        });
    this.Given(/^I can see the created date "([^"]*)"$/, function (date) {
        var articleDate = browser.getText(wn_article.dateText);
        expect(articleDate.toString()).toEqual(date);
        console.log('article date is:' + articleDate)
    });
    this.Given(/^I can see the hero video instead of the main image$/, function () {
        var heroVideo = browser.isVisible(wn_article.heroVideo);
        expect(heroVideo).toBe(true);
        var heroImg = browser.isVisible(wn_article.heroImg);
        expect(heroImg).toBe(false);
    });
    this.Given(/^I can see the hero video instead of the main image on Food$/, function () {
        var heroVideo = browser.isVisible(wn_article.heroVideoFood);
        expect(heroVideo).toBe(true);
        var heroImg = browser.isVisible(wn_article.heroImgFood);
        expect(heroImg).toBe(false);
    });
    this.Given(/^I can see the short teaser "([^"]*)"$/, function (articleShortTeaser) {
        var shortTeaser = browser.getText(wn_article.shortTeaser);
        expect(shortTeaser).toContain(articleShortTeaser);
    });
    this.Given(/^I can not see the short teaser "([^"]*)"$/, function (articleShortTeaser) {
        var shortTeaser = browser.getCssProperty(wn_article.shortTeaser, 'display');
        expect(shortTeaser.value).toContain('none');
    });
    this.Given(/^I can see the body paragraph "([^"]*)"$/, function (articleBodyPara) {
        var bodyPara = browser.getText(wn_article.bodyParagraph);
        expect(bodyPara[0]).toContain(articleBodyPara);
        //Validate the body paragraph
    });

    this.Given(/^I can see the body heading "([^"]*)"$/, function (articleBodyHeading) {
    var bodyHeading = browser.getText(wn_article.bodyHeading);
       expect(bodyHeading).toContain(articleBodyHeading);
    });

    this.Given(/^I can see the body related content$/, function () {

            browser.scroll(wn_article.relatedContentHeading);
            var rcHeading = browser.getText(wn_article.relatedContentHeading);
            var rcItemsImage = browser.getAttribute(wn_article.relatedContentItemsImage, 'data-srcset');
            var rcItemsTitle = browser.getText(wn_article.relatedContentItemsTitle);

        //Validate the heading of Related
            console.log(rcHeading);
            expect(rcHeading.toUpperCase()).toContain("RELATED");

        //Loop through the related items, and Validate the body related items' image and title
        for(var i=0; i<rcItemsTitle.length; i++) {
            var image = rcItemsImage[i];
            var title = rcItemsTitle[i];
            console.log( i + ':' + image);
            expect(image === '').toBe(false);
            console.log( i + ':' + title);
            expect(title === '').toBe(false);
        }
    });

    this.Given(/^I can see the body related content in Food style$/, function () {
        var rcItemsImage = browser.getAttribute(wn_article.relatedContentItemsImage_food, 'srcset');
        var rcItemsTitle = browser.getText(wn_article.relatedContentItemsTitle_food);

        //Loop through the related items, and Validate the body related items' image and title
        for(var i=0; i<rcItemsTitle.length; i++) {
            var image = rcItemsImage[i];
            var title = rcItemsTitle[i];
            console.log( i + ':' + image);
            expect(image === '').toBe(false);
            console.log( i + ':' + title);
            expect(title === '').toBe(false);
        }
    });

    this.Given(/^I can see the body image$/, function () {
        var bodyImg = browser.isVisible(wn_article.bodyImg);
        expect(bodyImg).toBe(true);
    });
    this.Given(/^I can see the body image caption "([^"]*)"$/, function (ImgCaption) {
        var bodyImgCaption = browser.getText(wn_article.bodyImgCaption);
        console.log(bodyImgCaption);
        expect(bodyImgCaption).toContain(ImgCaption);
    });
    this.Given(/^I can see the body gallery$/, function () {
       var bodyGallery = browser.getAttribute(wn_article.bodyGallery, 'href');
       for(var i=0; i<bodyGallery.length; i++){
           var galleryItems = bodyGallery[i];
           expect(galleryItems == '').toBe(false);
         }
    });
    this.Given(/^I can see the body video$/, function () {
        var bodyVideo = browser.isVisible(wn_article.bodyVideo);
        expect(bodyVideo).toBe(true);
    });
    this.Given(/^I can see the body tips "([^"]*)"$/, function (articleBodyTips) {
        var bodyTips = browser.getText(wn_article.bodyTips);
        expect(bodyTips).toContain(articleBodyTips);
    });
    this.Given(/^I can see the body competition$/, function () {
        var competiton = browser.getAttribute(wn_article.Bodycomp,'src');
        console.log(competiton);
        expect(competiton).toMatch("engagesciences");
    });
    this.Given(/^I can see the body Twitter embed "([^"]*)"$/, function (twitterId) {
       var twitEmbed = browser.getAttribute(wn_article.twitterEmb1, 'data-tweet-id');
        console.log(twitEmbed);
        expect(twitEmbed).toEqual(twitterId);
       });
    this.Given(/^I can see the body Instagram embed with caption "([^"]*)"$/, function (instagramSrc) {
        var instagramEmbed = browser.getAttribute(wn_article.instagramEmb1, 'src');
        expect(instagramEmbed[0]).toMatch(instagramSrc);
    });
    this.Given(/^I can see the body Instagram embed without caption "([^"]*)"$/, function (instagramSrc) {
        var instagramEmbed = browser.getAttribute(wn_article.instagramEmb1, 'src');
        expect(instagramEmbed[1]).toMatch(instagramSrc);
        expect(instagramEmbed[1]).not.toMatch("captioned");
    });
    this.Given(/^I can see the body Facebook embed "([^"]*)"$/, function (facebookUrl) {
       var facebookEmbed = browser.getAttribute(wn_article.facebookEmb1, 'data-href');
        console.log(facebookEmbed);
        expect(facebookEmbed).toEqual(facebookUrl);
    });
    this.Given(/^I can see the body Playbuzz embed "([^"]*)"$/, function (playbuzzUrl) {
        var playbuzzEmbed = browser.getAttribute(wn_article.playbuzzEmb1, 'data-game');
        console.log(playbuzzEmbed);
        expect(playbuzzEmbed).toEqual(playbuzzUrl);
    });
    this.Given(/^I can see the body Youtube embed "([^"]*)"$/, function (youtubeUrl) {
        var videoEmbArry = browser.getAttribute(wn_article.videoEmbArry, 'src');
        console.log(videoEmbArry[0]); //The stubbed data of Youtube is in the first iframe of video container.
        expect(videoEmbArry[0]).toEqual(youtubeUrl);
    });
    this.Given(/^I can see the body Vimeo embed "([^"]*)"$/, function (vimeoUrl) {
        var videoEmbArry = browser.getAttribute(wn_article.videoEmbArry, 'src');
        console.log(videoEmbArry[1]); //The stubbed data of Vimeo is in the second iframe of video container.
        expect(videoEmbArry[1]).toEqual(vimeoUrl);
    });
    this.Given(/^I can see the body Whooshka embed "([^"]*)"$/, function (whooshkaUrl) {
        browser.waitForVisible(wn_article.whooshkaEmb, 3000);
        var whooshkaEmb = browser.getAttribute(wn_article.whooshkaEmb, 'src');
        console.log(whooshkaEmb);
        expect(whooshkaEmb).toEqual(whooshkaUrl);
    });
    this.Given(/^I can see the body Wirewax embed "([^"]*)"$/, function (wirewaxUrl) {
        browser.waitForVisible(wn_article.wirewaxEmb, 3000);
        var wirewaxEmb = browser.getAttribute(wn_article.wirewaxEmb, 'src');
        console.log(wirewaxEmb);
        expect(wirewaxEmb).toEqual(wirewaxUrl);
    });
    this.Given(/^I can see the outbrain frame with "([^"]*)" template$/, function (templateName) {
        var outbrainTemplate = browser.getAttribute(wn_article.outbrain, 'data-ob-template');
        expect(outbrainTemplate).toEqual(templateName);
    });
    this.Given(/^I can see the related tags "([^"]*)"$/, function (rTag) {
        var relatedTags = browser.getText(wn_article.relatedTags, 'href');
        expect(relatedTags).toEqual(rTag.split("|"));
        });
    this.Given(/^I can see the author "([^"]*)"$/, function (authorName) {
      var author = browser.getText(wn_article.authorText);
        expect(author).toEqual(authorName);
    });

    this.Given(/^I can see the ([^"]*) top and bottom ad$/, function (adSize) {
        // adSize = billboard|leaderboard|banner
        var adPlacements =[];
        switch(adSize) {
            case 'billboard':
                adPlacements = browser.getText(wn_article.adSection);
                break;
            case 'leaderboard':
                adPlacements = browser.getText(wn_article.adSection);
                console.log(adPlacements);
                break;
            case 'banner':
                adPlacements = browser.getText(wn_article.adSection);
                break;
        }

        expect(adPlacements.length).toEqual(2);
    });

    this.Given(/^I can see the related tag "([^"]*)"$/, function (rTag) {
        browser.waitForExist(wn_article.relatedWnTags,3000);
        browser.scroll(wn_article.relatedWnTags);
        var relatedTag = browser.getText(wn_article.relatedWnTags, 'href');
        expect(relatedTag[0]).toEqual(rTag);
    });

    this.Given(/^I can see the author is "([^"]*)"$/, function (authorName) {
        var author = browser.getText(wn_article.authorWn);
        expect(author).toEqual(authorName);
    });

    this.Given(/^I can see the hero video is "([^"]*)"$/, function (heroVideoID) {
        browser.waitForVisible(wn_article.heroVideo,2000);
        var heroVideo = browser.getAttribute(wn_article.heroVideo, 'poster');
        expect(heroVideo).toContain(heroVideoID);
        // Verify the hero video ID
    });

    this.Given(/^I can see the playlist container$/, function () {
        browser.scroll(0,1000);
        browser.waitForVisible(wn_article.heroVideoPlaylist,2000);
        // Verify the playlist container exists
    });

    this.Given(/^I can see the video thumbnail of each video in the playlist$/, function () {
        var heroVideoPlaylistThumbnail = browser.getAttribute(wn_article.heroVideoPlaylistThumbnail, 'src');
        for (var i = 0; i < heroVideoPlaylistThumbnail.length; ++i) {
            var thumbnail = heroVideoPlaylistThumbnail[i];
            console.log( i + ':' + thumbnail);
            expect(thumbnail === '').toBe(false);
        }
        // Verify the thumbnail images in the playlist
    });

    this.Given(/^I can see the video title of each video in the playlist$/, function () {
        var heroVideoPlaylistTitle = browser.getText(wn_article.heroVideoPlaylistTitle);
        for (var i = 0; i < heroVideoPlaylistTitle.length; ++i) {
            var title = heroVideoPlaylistTitle[i];
            console.log( i + ':' + title);
            expect(title === '').toBe(false);
        }
        // Verify the titles in the playlist
    });

    this.Given(/^I can click the play button of the main video$/, function () {
        var heroVideoProgress = browser.getAttribute(wn_article.heroVideoProgress,'aria-valuenow');
        console.log('Before playing : ' + heroVideoProgress[0])
        expect(heroVideoProgress[0]).toEqual('NaN');
        // Verify the progress bar is not loaded before playing.

        browser.click(wn_article.heroVideoPlayButton);
        var heroVideoPlayButton = browser.isVisible(wn_article.heroVideoPlayButton);
        expect(heroVideoPlayButton).toBe(false);
        // Verify the play button is clickable to play the video
    });

    this.Given(/^I can see the video playing$/, function () {

        console.log('Waiting a few seconds before validating')
        wait(6000);

        var heroVideoProgress = browser.getAttribute(wn_article.heroVideoProgress,'aria-valuenow');
        console.log('During playing : ' + heroVideoProgress[0])
        expect(heroVideoProgress[0]).not.toEqual('NaN');
        // Verify the control bar of the hero video shows the loading progress. (When it isn't started, it will show NaN.)
    });

    this.Given(/^I can see the next video is auto-played after the previous video$/, function () {
        var heroVideoPlaylistItem = browser.getAttribute(wn_article.heroVideoPlaylistItem, 'class');
        expect(heroVideoPlaylistItem[0]).toContain('vjs-selected');
        expect(heroVideoPlaylistItem[1]).not.toContain('vjs-selected');
        for (var i=0; i<heroVideoPlaylistItem.length; i++){
            console.log(heroVideoPlaylistItem[i]);
        }

        console.log('Waiting 9 seconds to ensure the first video is ended before validating the next video')
        wait(9000);
        // wait 9 seconds to ensure the first video has finished

        var heroVideoPlaylistItem = browser.getAttribute(wn_article.heroVideoPlaylistItem, 'class');
        expect(heroVideoPlaylistItem[0]).not.toContain('vjs-selected');
        for (var i=0; i<heroVideoPlaylistItem.length; i++){
            console.log(heroVideoPlaylistItem[i]);
        }
        // Verify that the first video is not the selected one

        var heroVideoProgress = browser.getAttribute(wn_article.heroVideoProgress,'aria-valuetext');
        console.log(heroVideoProgress[0])
        expect(heroVideoProgress[0]).not.toEqual('NaN');
        // Verify that the player is still playing.
    });

    this.Given(/^I should not see the LATEST header in LHR$/, function () {
        // Verify that the LATEST header has been removed. This is the main request of DAW-1129
        expect(browser.isExisting(wn_article.wd_lhrFeedHeader)).toBe(false);
    });

    this.When(/^I should see image of each item in LHR$/, function () {
        // Verify that images of items appear in LHR
        var lhrFeedImage = browser.getAttribute(wn_article.wd_lhrFeedImage, 'src');
        for (var i=0; i<2; i++){
            var FeedImage = lhrFeedImage[i];
            console.log('image url is :'+ FeedImage);
            expect(FeedImage === '').toBe(false);
        }
    });

    this.When(/^I should be able to click on image in LHR to go to its page$/, function () {
        // Verify that images of items are clickable
        var lhrFeedImageLink = browser.getAttribute(wn_article.wd_lhrFeedImageLink, 'href');
        for (var i=0; i<2; i++){
            var FeedImageLink = lhrFeedImageLink[i];
            console.log('image link is :'+ FeedImageLink);
            expect(FeedImageLink === '').toBe(false);
        }
    });

    this.When(/^I should see long title of each item in LHR$/, function () {
        // Verify that long titles of items appear in LHR
        var lhrFeedLongTitle = browser.getText(wn_article.wd_lhrFeedLongTitle);
        for (var i=0; i<2; i++){
            var FeedLongTitle = lhrFeedLongTitle[i];
            console.log('Long title is :'+ FeedLongTitle);
            expect(FeedLongTitle === '').toBe(false);
        }
    });

    this.When(/^I should be able to click on long title in LHR to go to its page$/, function () {
        // Verify that long titles of items are clickable
        var lhrFeedLongTitleLink = browser.getAttribute(wn_article.wd_lhrFeedLongTitleLink, 'href');
        for (var i=0; i<2; i++){
            var FeedLongTitleLink = lhrFeedLongTitleLink[i];
            console.log('Long title link is :'+ FeedLongTitleLink);
            expect(FeedLongTitleLink === '').toBe(false);
        }
    });

    this.When(/^I should see subsection of each item in LHR$/, function () {
        // Verify that subsections of items appear in LHR
        var lhrFeedSubsection = browser.getText(wn_article.wd_lhrFeedSubsection);
        for (var i=0; i<2; i++){
            var FeedSubsection = lhrFeedSubsection[i];
            console.log('Subsection is :'+ FeedSubsection);
            expect(FeedSubsection === '').toBe(false);
        }
    });

    this.When(/^I should be able to click on subsection in LHR to go to its page$/, function () {
        // Verify that subsections of items are clickable
        var lhrFeedSubsectionLink = browser.getAttribute(wn_article.wd_lhrFeedSubsectionLink, 'href');
        for (var i=0; i<2; i++){
            var FeedSubsectionLink = lhrFeedSubsectionLink[i];
            console.log('Subsection link is :'+ FeedSubsectionLink);
            expect(FeedSubsectionLink === '').toBe(false);
        }
    });

    this.When(/^I should see created date of each item in LHR$/, function () {
        // Verify that created dates of items appear in LHR
        var lhrFeedDate = browser.getText(wn_article.wd_lhrFeedDate);
        for (var i=0; i<2; i++){
            var FeedDate = lhrFeedDate[i];
            console.log('Date is :'+ FeedDate);
            expect(FeedDate === '').toBe(false);
        }
        });

    this.Then(/^the below position are replaced with Polar ads$/, function (table) {
        var listOfItems = browser.getAttribute(wn_article.lhrFeedItems, 'class');
        var rows = table.hashes();
        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            // Validates position of standard page base on Index including their url
            console.log(row['pos']);
            console.log(listOfItems[row['pos']-1]);
            expect(listOfItems[row['pos']-1]).toContain('polar-feed');
        }

    });

    this.Then(/^I can see a polar placement on the first teaser in a Related Content module$/, function () {
        browser.waitForExist(wn_article.relatedPolarFeed, 2000);
    });

    this.Given(/^I can see the Image Revealer component$/, function() {
        var isVisible = browser.isVisible(wn_article.imageRevealer);
        var leftImageSrc = browser.getAttribute(wn_article.imageRevealerLeftImg, 'src');
        var rightImageSrc = browser.getAttribute(wn_article.imageRevealerRightImg, 'src');
        expect(isVisible).toBe(true);
        expect(leftImageSrc).not.toBeUndefined();
        expect(rightImageSrc).not.toBeUndefined();
    });

};

