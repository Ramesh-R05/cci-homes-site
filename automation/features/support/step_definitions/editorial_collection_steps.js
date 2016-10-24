var editorial_collection = require('../page_objects/editorial_collection_widget');

module.exports = function() {

    this.When(/^I can see the collage of images on editorial collection$/, function () {
        //verify collage containing images
        var collageImages = browser.getAttribute(editorial_collection.collageImages, 'style');
        console.log(collageImages.length);
        for (var i=0; i<collageImages.length; i++){
            expect(collageImages[i]).not.toBeUndefined();
            console.log(collageImages[i]);
        }
    });

    this.When(/^I can see a heading "([^"]*)" on recipe collection page$/, function (headingText) {
        //verify the heading
        var headingRC = browser.getText(editorial_collection.listingHeading);
        console.log(headingRC);
        expect(headingRC).toMatch(headingText);
    });

    this.When(/^I can see (\d+) recipes$/, function (count) {
        //count a number of recipes
        var teaserRecipeCount = browser.elements(editorial_collection.teaserRecipe).value.length;
        console.log(teaserRecipeCount);
        expect(teaserRecipeCount).toEqual(parseInt(count),10);
    });

    this.When(/^I can see each recipe containing its image$/, function () {
        //verify all recipes have their image url
        var teaserRecipeImgUrl = browser.getAttribute(editorial_collection.teaserRecipeImg,'data-srcset');
        console.log(teaserRecipeImgUrl.length);
        for (var i=0; i<teaserRecipeImgUrl.length; i++){
            expect(teaserRecipeImgUrl[i]).not.toBeUndefined();
            console.log(teaserRecipeImgUrl[i]);
        }
    });

    this.When(/^I can see each recipe containing its name$/, function () {
        //verify all recipes have their name
        var teaserRecipeName = browser.getText(editorial_collection.teaserRecipeName);
        console.log(teaserRecipeName.length);
        for (var i=0; i<teaserRecipeName.length; i++){
            expect(teaserRecipeName[i]).not.toBeUndefined();
            console.log(teaserRecipeName[i]);
        }
    });

    this.When(/^I can see each recipe clickable to open its page$/, function () {
        //verify all recipes have their url
        var teaserRecipeURL = browser.getAttribute(editorial_collection.teaserRecipeURL, 'href');
        console.log(teaserRecipeURL.length);
        for (var i=0; i<teaserRecipeURL.length; i++){
            expect(teaserRecipeURL[i]).not.toBeUndefined();
            console.log(teaserRecipeURL[i]);
        }
    });

};

