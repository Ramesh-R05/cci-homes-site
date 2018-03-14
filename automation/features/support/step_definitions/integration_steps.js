var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var world = require('../world');
var fs = require("fs");
var request = require('request');


function randomValue() {
    return Math.floor(Math.random() * 60000) + 50000
}
var randomId = randomValue();

module.exports = function() {

    this.Given(/^Editor just published the "([^"]*)" doc type item$/, function (page) {
        var content_json;
        var documentPath;

        //Specify json file and path
        switch(page) {
            case 'article':
                content_json = 'test-article-on-sit.json';
                documentPath = '-1,1158,1237,'; //Parent nodes in dev CMS
                break;
            case 'gallery':
                content_json = 'test-gallery-on-sit.json';
                documentPath = '-1,1158,1579,'; //Parent nodes in dev CMS
                break;
        }

        //Read Json File and update Title and ID
        var body_content = JSON.parse(fs.readFileSync('../automation/features/support/files/' + content_json , 'utf8'));
        body_content['document']['contentTitle'] = "Integration Test " + randomId;
        body_content['document']['id'] = randomId;
        body_content['document']['path'] = documentPath  + randomId;

        // Post File to PUBLISHING BR0KER
        var options = { method: 'POST',
            url: 'http://services.sit.bxm.internal/publishing-broker/',
            json: true,
            headers: {
                'postman-token': '98215063-b20d-eb89-4865-35af75c73e11',
                'content-type': 'application/json'
            },
            body: body_content
        };
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
        });

    });

    this.When(/^I navigate to the "([^"]*)" page$/, function (content_uri) {
        for(var i = 0; i < 11; i++) {
            browser.refresh();
            browser.url(world.Urls.home_page + content_uri + '-' + randomId);
            if(browser.isExisting(".article__title") == true){
                console.log("Page Loaded Successfully : ID-" + randomId);
                break;
            } else {
                var page_url =browser.getUrl();
                console.log("Page not created yet, current page url is : " + page_url);
                wait(1000);
            }
        }
    });


    this.Then(/^our readers can enjoy the latest content$/, function () {
        browser.waitForExist(".article__title",30000);
        expect(browser.getText(".article__title")).toEqual("Integration Test " + randomId);
    });

};
