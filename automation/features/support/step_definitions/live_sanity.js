var world = require('../world');
var wn_article = require('../page_objects/article_widget');
var wn_recipe = require('../page_objects/recipe_widget');
var wn_social = require('../page_objects/social_widget');
var food_search = require('../page_objects/search_widget');
// var nconf = require('nconf');
// var site_domain = nconf.get('APP_KEY');

module.exports = function(){

        this.Given(/^I navigate to an article page$/, function () {
            browser.url(world.Urls.home_page);
            browser.click("li.article-container-item");
        });

        this.Then(/^I can see the social share icons$/, function () {
            browser.isVisibleWithinViewport(wn_social.facebookBtn);
            browser.isVisibleWithinViewport(wn_social.tweeterBtn);
            browser.isVisibleWithinViewport(wn_social.pinterestBtn);
            browser.isVisibleWithinViewport(wn_social.emailBtn);
        });

        this.Then(/^I can see the recipe info$/, function () {
            browser.isVisible(wn_recipe.recipeMetatxt);
            browser.isVisible(wn_recipe.recipeTitle);
            browser.isVisible(wn_recipe.recipeImg);
            browser.isVisible(wn_recipe.recipeIngredients);
            browser.isVisible(wn_recipe.recipeSteps);
        });

        this.Then(/^share the recipe in facebook$/, function () {
            browser.click(wn_social.facebookBtn);
        });

        this.Then(/^see the publishing date$/, function () {
                console.log(browser.getText(wn_article.dateText));
        });

        this.Then(/^I can see the reactions to this article$/, function () {
            browser.scroll(wn_article.smileBtn);
            browser.click(wn_article.smileBtn);
        });

        this.Given(/^the user lands on the "([^"]*)" tage page$/, function (tag) {
            browser.url(world.Urls.home_page+"tags/"+tag);
            global.tagText = tag;
        });

        this.Then(/^the results are presented on the page$/, function () {
            var header = browser.getText(".search-results__header");
            expect(header).toContain(tagText);
            console.log(header);
        });

        this.When(/^I search for "([^"]*)" using the search box$/, function (tag) {
            browser.click('button.search__button');
            browser.setValue(".search__input",tag);
            browser.click('.button--submit');
            global.tagText = tag;
        });

        this.When(/^I click on Load More$/, function () {
            browser.click(".button--loadmore");
        });


        this.Given(/^I can see the version of the site$/, function () {
            browser.url(world.Urls.home_page+"version");
            browser.waitUntil(function () {
                return browser.getUrl() === world.Urls.home_page+"version";
            }, 20000, 1000);
            console.log(browser.getSource());
            expect(browser.getSource()).toContain('"version":{"buildNumber"')
        });

        this.Given(/^I can validate that "([^"]*)" is NOT present$/, function (tag) {
            expect(browser.getSource()).not.toContain('"targets":{"env":"test"}}');
        });

        this.Given(/^I navigate to recipe "([^"]*)"$/, function (recipe) {
            browser.url(world.Urls.home_page+recipe);
            browser.waitUntil(function () {
                return browser.getUrl() === world.Urls.home_page+recipe;
            }, 20000, 1000);
        });

        this.Given(/^the user lands on the "([^"]*)" recipes search$/, function (tag) {
            browser.url(world.Urls.home_page+"recipes/search/"+tag);
            browser.waitUntil(function () {
                return browser.getUrl() === world.Urls.home_page+"recipes/search/"+tag;
            }, 20000, 1000);
            global.tagText = tag;
        });

        this.When(/^I search for "([^"]*)" recipe$/, function (tag) {
            browser.setValue(food_search.searchBox, tag);
            browser.click(food_search.searchIcon);
            global.tagText = tag;
        });

        this.Then(/^the recipe search results are presented on the page$/, function () {
            var header = browser.getText(".search__heading");
            expect(header).not.toEqual("");
            console.log(header);
        });

        this.Then(/^I navigate to the first recipe$/, function () {
            browser.click("article.teaser--recipe");
        });

        this.Given(/^I am currently viewing a gallery page$/, function () {
            // use the site domain to select different URL
        switch(site_domain) {
            case 'dolly-site':
                browser.url(world.Urls.home_page + "fashion/danielle-campbell-style-evolution-10891");
                break;
            case 'cosmo-site':
                browser.url(world.Urls.home_page + "fashion/celebrity-wearing-things-september-16065");
                break;
        }
        });

        this.Given(/^I am currently viewing an article page$/, function () {
            // use the site domain to select different URL
            switch (site_domain) {
                case 'dolly-site':
                    browser.url(world.Urls.home_page + "celebrity/emma-watson-splits-from-beau-will-adamowicz-3207");
                    break;
                case 'cosmo-site':
                    browser.url(world.Urls.home_page + "celebrity/iggy-azalea-australia-no-longer-home-17618");
                    break;
            }
        });

};
