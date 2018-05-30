var cms = require('../page_objects/cms_widget');
var wait = require('../../../node_modules/@bxm/automation/lib/utils/wait');
var cmsGoToTab = require('../../../node_modules/@bxm/automation/lib/utils/cmsGoToTab');
var world = require('../world');
var nodeName = {}; //Global Hash variable to collect the value of node name from different doc type e.g. nodeName['Article'] = 'Smoke Test Article'
var nodeId = {}; //Global Hash variable to collect the value of node ID from different doc type e.g. nodeId['Article'] = '23211'
var docType; //Global variable for document type e.g. docType = 'Article'
var tabNo; //Global variable for a specific tab
var propertiesTabNo = {}; //Global variable for the properties tab
var propertiesTabElement = {}; //Global variable for the element of the properties tab
var idElement; //Global variable for the element of a selected item in LHR
var page; //Global variable for the page name
var previewUrl; //Global variable for the preview URL
var liveUrl = {}; //Global variable for the live URL
var videoId; //global variable for video id
var tabElement; //To ensure we find an element under that tab


module.exports = function() {

    this.Given(/^I am logging in CMS$/, function () {
        //To ensure this smoke test won't be run on live url
        expect(world.Urls.home_page).not.toContain('live');

        browser.url(world.Urls.home_page + 'Login.aspx');
        browser.setValue(cms.loginUsername, 'admin');
        browser.setValue(cms.loginPassword, 'ACPd3vPASS!');
        browser.click(cms.loginButton);

        //Validate the cms display
        expect(browser.waitForVisible(cms.cmsLeftSide,3000)).toBe(true);
        expect(browser.waitForVisible(cms.cmsRightSide,3000)).toBe(true);
    });

    this.Given(/^I am logging in Prelive CMS$/, function () {
        //To ensure smoke test is running on prelive
        expect(world.Urls.home_page).toContain('prelive');

        browser.url(world.Urls.home_page + 'Login.aspx');
        browser.setValue(cms.loginUsername, 'admin');
        browser.setValue(cms.loginPassword, '69CasePublicWeekDay');
        browser.click(cms.loginButton);

        //Validate the cms display
        expect(browser.waitForVisible(cms.cmsLeftSide, 3000)).toBe(true);
        expect(browser.waitForVisible(cms.cmsRightSide,3000)).toBe(true);
    });

    this.Given(/^I am currently viewing the create form for "([^"]*)"$/, function (type) {
        var cmsSectionID;

        switch (type) {
            case 'Homes Article':
                cmsSectionID = '1237'; //Articles
                break;
            case 'Gallery':
                cmsSectionID = '1579'; //Galleries
                break;
        }

        console.log('Section/Subsection ID: ' + cmsSectionID);
        browser.url(world.Urls.home_page + 'create.aspx?nodeId=' + cmsSectionID + '&nodeType=content');
        expect(browser.waitForVisible(cms.createDocumentType,5000)).toBe(true);
    });

    this.Then(/^I should be able to select "([^"]*)" doc type$/, function (type) {
        docType = type;
        browser.selectByVisibleText(cms.createDocumentType, docType);
    });

    this.Then(/^I should be able to add the name$/, function () {
        //Create a name with a random number
        nodeName[docType] = 'Smoke Test ' + docType + ' ' + parseInt(Math.random()*100);
        browser.setValue(cms.createName, nodeName[docType]);
        console.log('Node Name: ' + nodeName[docType]);
    });

    this.Then(/^I should be able to click the create button$/, function () {
        browser.click(cms.createButton);

        // To re-login if it happens
        wait(2000);
        if (browser.isVisible(cms.loginUsername) == true) {
            console.log('Relogin...');
            browser.setValue(cms.loginUsername, 'admin');
            browser.setValue(cms.loginPassword, 'ACPd3vPASS!');
            browser.click(cms.loginButton);
        };
    });

    this.Then(/^I should see the item is created$/, function () {
        //Go to the properties tab
        propertiesTabNo[docType] = cmsGoToTab('Properties', browser);
        propertiesTabElement[docType] = '#body_TabView1_tab0' + propertiesTabNo[docType] + 'a';
        browser.click(propertiesTabElement[docType]);
        nodeId[docType] = browser.getText('#body_TabView1_tab0' + propertiesTabNo[docType] + 'layer .propertypane:nth-child(2) .propertyItem:nth-child(4) .propertyItemContent');
        console.log('Node ID: ' + nodeId[docType]);
    });

    this.Given(/^I am currently viewing "([^"]*)" of "([^"]*)"$/, function (pagename, type) {
        page = pagename;
        docType = type;
        browser.url(world.Urls.home_page + page + nodeId[docType]);
        expect(browser.waitForVisible(cms.itemTabs,2000)).toBe(true);
    });

    this.Given(/^I am currently viewing "([^"]*)" of live "([^"]*)" Page$/, function (pagename, type) {
        page = pagename;
        docType = type;
        browser.url(world.Urls.home_page + page + '2898');
        expect(browser.waitForVisible(cms.itemTabs,2000)).toBe(true);
    });

    this.Then(/^I should be able to add content in the item$/, function (dataTable) {
        var row = dataTable.hashes();

        for (var i = 0; i < row.length; ++i) {
            //Click the tab and record the tab no to use in the publishing step
            tabNo = cmsGoToTab(row[i]['tab'], browser);
            tabElement = '#body_TabView1_tab0' + tabNo + 'layer ';

            //Find the field and insert value
            switch (row[i]['field']) {
                case 'Long Title':
                    var valueLongTitle = nodeName[docType] + ' Long Title';
                    browser.setValue(cms.editorialLongTitle, valueLongTitle);
                    console.log(valueLongTitle);
                    break;
                case 'Short Teaser':
                    var valueShortTeaser = nodeName[docType] + ' Short Teaser';
                    browser.setValue(cms.editorialShortTeaser, valueShortTeaser);
                    console.log(valueShortTeaser);
                    break;
                case 'Image':
                    var valueImage = 'http://d3lp4xedbqa8a5.cloudfront.net/s3/digital-cougar-assets/whichcar/2016/04/28/-1/adjust-seat-height-driving-position.jpg';
                    browser.setValue(cms.editorialImage, valueImage);
                    console.log(valueImage);
                    break;
                case 'Body Paragraph':
                    browser.click(tabElement + cms.editorialBodyParagraphOption);
                    browser.click(tabElement + cms.editorialBodyAddButton);
                    var valueBodyParagraph = nodeName[docType] + ' Body Paragraph';
                    browser.waitForVisible(tabElement + cms.editorialBodyParagraph, 2000);
                    browser.setValue(tabElement + cms.editorialBodyParagraph, valueBodyParagraph);
                    console.log(valueBodyParagraph);
                    break;
                case 'Body Heading':
                    browser.click(tabElement + cms.editorialBodyComponentList);
                    browser.waitForVisible(tabElement + cms.editorialBodyHeadingOption, 2000);
                    browser.click(tabElement + cms.editorialBodyHeadingOption);
                    browser.click(tabElement + cms.editorialBodyAddButton);
                    var valueBodyHeading = nodeName[docType] + ' Body Heading';
                    browser.waitForVisible(tabElement + cms.editorialBodyHeading, 2000);
                    browser.setValue(tabElement + cms.editorialBodyHeading, valueBodyHeading);
                    console.log(valueBodyHeading);
                    break;
                case 'Page Title':
                    var valuePageTitle = nodeName[docType] + ' Page Title';
                    browser.setValue(cms.searchAndSocialPageTitle, valuePageTitle);
                    console.log(valuePageTitle);
                    break;
                case 'Created at':
                    var valuePropertiesCreatedAt = '2017-01-02 08:00';
                    browser.setValue(tabElement + cms.propertiesCreatedAt, valuePropertiesCreatedAt);
                    break;
                case 'Disable AMP':
                    browser.waitForVisible(tabElement + cms.ampDisableBox, 1000);
                    browser.click(tabElement + cms.ampDisableBox);
                    break;
                case 'Video':
                    var valueSearchVideo = 'Football';
                    browser.setValue(tabElement + cms.editorialSearchVideo, valueSearchVideo);
                    browser.click(tabElement + cms.editorialSearchButton);
                    browser.waitForVisible(cms.editorialAddVideoButton,5000);
                    browser.click(cms.editorialAddVideoButton);
                    videoId = browser.getText(cms.editorialVideoId);
                    console.log(videoId);
                    expect(videoId).not.toEqual('');
                    browser.waitForVisible(cms.editorialVideoThumbnail,2000);
                    var videoThumbnail = browser.getAttribute(tabElement + cms.editorialVideoThumbnail, 'src');
                    console.log(videoThumbnail);
                    expect(videoThumbnail).not.toEqual('');
                    break;
                case 'Body Video':
                    browser.click(tabElement + cms.editorialBodyVideoOption);
                    browser.click(tabElement + cms.editorialBodyAddButton);
                    browser.waitForVisible(tabElement + cms.editorialUseVideo,2000);
                    browser.setValue(tabElement + cms.editorialUseVideo, videoId);
                    browser.click(tabElement + cms.editorialVideoAddButton);
                    browser.waitForVisible(cms.editorialSecondVideoThumbnail,2000);
                    var videoSecondThumbnail = browser.getAttribute(tabElement + cms.editorialSecondVideoThumbnail, 'src');
                    console.log(videoSecondThumbnail);
                    expect(videoSecondThumbnail).not.toEqual('');
                    break;
            }
        }

    });

    this.Then(/^I should be able to add link in body paragraph to validate$/, function (dataTable) {
        var row = dataTable.hashes();
        var tabElement; //To ensure we find an element under that tab

        for (var i = 1; i <= row.length; ++i) {
            //Click the tab and record the tab no to use in the publishing step
            tabNo = cmsGoToTab('Editorial', browser);
            tabElement = '#body_TabView1_tab0' + tabNo + 'layer ';

            //Find the field and insert value
            browser.click(tabElement + cms.editorialBodyParagraphOption);
            browser.click(tabElement + cms.editorialBodyAddButton);
            var valueBodyParagraph = row[i-1]['link'];
            browser.waitForVisible(tabElement + cms.editorialBodyParagraph, 2000);
            browser.setValue(tabElement + '.content-body-component:nth-child(' + i + ') textarea.markdown-input' , valueBodyParagraph);
            console.log(valueBodyParagraph);
        }
    });

    this.Then(/^I should be able to visit the live URL$/, function () {
        console.log(liveUrl[docType]);
        browser.url(liveUrl[docType]);
    });

    this.Then(/^I should see the amp page is active$/, function () {
        var enableamphtml = browser.getAttribute(cms.ampHtml, 'href');
        console.log(enableamphtml);
        expect(enableamphtml).toContain('/amp/');
    });

    this.Then(/^I should see the amp page is inactive$/, function () {
        expect(browser.isExisting(cms.ampHtml)).toBe(false);
    });

    this.Then(/^I should be able to add specific value in the item$/, function (dataTable) {
        var row = dataTable.hashes();
        var tabElement; //To ensure we find an element under that tab
        var tagNo = 0; //To count the tag row for its element

        for (var i = 0; i < row.length; ++i) {

            //Specify a tab name if one field is in a different tab based on doctype e.g. source field
            var splitTab = row[i]['tab'].split(":");
            if (splitTab.length > 1) {
                switch (docType){
                    case 'Homes Article':
                        row[i]['tab'] = splitTab[0];
                        break;
                    case 'Gallery':
                        row[i]['tab'] = splitTab[1];
                        break;
                }
            }
            console.log('tab: ' + row[i]['tab']);

            //Click the tab and record the tab no to use in the publishing step
            tabNo = cmsGoToTab(row[i]['tab'], browser);
            tabElement = '#body_TabView1_tab0' + tabNo + 'layer ';

            //Find the field and insert value
            switch (row[i]['field']) {
                case 'Source':
                    browser.selectByVisibleText(tabElement + cms.articleSource, row[i]['value']);
                    break;
                case 'Tags':
                    tagNo++; //Count the new tag row
                    browser.setValue(tabElement + cms.articleTags + ':nth-child(' + tagNo + ') input', row[i]['value']);
                    browser.waitForVisible(tabElement + cms.articleTagsList, 5000);
                    browser.click(tabElement + cms.articleTagsList);
                    break;
            }
            console.log(row[i]['field'] + ': ' + row[i]['value']);
        }
    });

    this.Then(/^I should be able to publish the item$/, function () {
        //Click the publish button
        browser.click('#body_TabView1_tab0' + tabNo + 'layer_publish');
        wait(2000);

        //Open the page again to see the publish status
        browser.url(world.Urls.home_page + page + nodeId[docType]);
        browser.waitForVisible(propertiesTabElement[docType], 3000);
        browser.click(propertiesTabElement[docType]);
        expect(browser.getText('#body_TabView1_tab0' + propertiesTabNo[docType] + 'layer .propertypane:nth-child(3) .propertyItem:nth-child(1) .propertyItemContent')).toContain('Last published');
    });

    this.Then(/^I should be able to publish the live item$/, function () {
        //Validate the time before publishing
        tabNo = cmsGoToTab('Properties', browser);
        tabElement = '#body_TabView1_tab0' + tabNo + 'layer ';
        var lastEdit = browser.getText('.propertypane:nth-child(3) .propertyItem:nth-child(2) .propertyItemContent');

        //Click the publish button
        browser.click('#body_TabView1_tab0' + tabNo + 'layer_publish');
        wait(2000);

        //Open the page again to see the publish status
        browser.url(world.Urls.home_page + page + '2898');
        tabNo = cmsGoToTab('Properties', browser);
        tabElement = '#body_TabView1_tab0' + tabNo + 'layer ';
        var lastEditPublish = browser.getText('.propertypane:nth-child(3) .propertyItem:nth-child(2) .propertyItemContent');

        //Validate the time after publishing
        console.log('lastEdit:' + lastEdit);
        console.log('lastEditPublish:' + lastEditPublish);
        expect(lastEdit).not.toBe(lastEditPublish);

    });

    this.Then(/^I should be able to see the "([^"]*)" URL$/, function (urlType) {
        switch (urlType) {
            case 'preview':
                previewUrl = browser.getAttribute('.document-link .propertyItem:nth-child(1) .propertyItemContent a', 'href');
                console.log(previewUrl);
                expect(previewUrl).toContain('/preview/');
                expect(previewUrl).toContain(nodeId[docType]);
                break;
            case 'live':
                liveUrl[docType] = browser.getAttribute('.document-link .propertyItem:nth-child(2) .propertyItemContent a', 'href');
                console.log(liveUrl[docType]);
                expect(liveUrl[docType]).not.toContain('/preview/');
                expect(liveUrl[docType]).toContain(nodeId[docType]);
                break;
        }
    });

    //*****The below step definitions cannot be run when using phantomjs because of the alert popup and the right click menu****//
    //They only work when running without phantomjs

    this.Then(/^I should be able to unpublish the item$/, function () {
        browser.waitForVisible(propertiesTabElement[docType], 2000);
        browser.click(propertiesTabElement[docType]);
        browser.click(cms.unpublishButton);
        browser.alertAccept();
        wait(2000);

        //Open the page again to see the unpublish message
        browser.url(world.Urls.home_page + page + nodeId[docType]);
        browser.waitForVisible(propertiesTabElement[docType], 2000);
        browser.click(propertiesTabElement[docType]);
        expect(browser.getText('#body_TabView1_tab0' + propertiesTabNo[docType] + 'layer .propertypane:nth-child(3) .propertyItem:nth-child(1) .propertyItemContent')).toContain('This item is not published');
    });

    this.Then(/^I should be able to see the "([^"]*)" URL of live item$/, function (urlType) {
        switch (urlType) {
            case 'preview':
                previewUrl = browser.getAttribute('.document-link .propertyItem:nth-child(1) .propertyItemContent a', 'href');
                console.log(previewUrl);
                expect(previewUrl).toContain('/preview/');
                break;
            case 'live':
                liveUrl = browser.getAttribute('.document-link .propertyItem:nth-child(2) .propertyItemContent a', 'href');
                console.log(liveUrl);
                expect(liveUrl).not.toContain('/preview/');
                break;
        }
    });

    this.Then(/^I should be able to find the "([^"]*)" in the LHR list$/, function (type) {
        docType = type;

        //Search an item
        browser.setValue(cms.searchBox, nodeId[docType]);
        browser.waitForVisible(cms.searchResult,5000)
        browser.click(cms.searchResult);

        //****If we want to run with Phantom, need to create a function to auto-expand child items from each main item.
        //****The idea is to get path of that item from umbraco service http://dev.umbraco.services.bauer-media.internal/v1/car/documents/4444
        //****e.g. path: "-1,1159,1175,1533,4445,4444", and use browser.click(<each path ID>);
        //****Then those IDs have to be in this format for selector >> '#\\3x xxx' Reference: http://code.fitness/post/2016/04/bad-idea-guid-as-html5-id.html

        //validate the item is appearing in LHR
        idElement ='#\\3' + nodeId[docType].charAt(0) + ' ' +  nodeId[docType].slice(1,nodeId[docType].length) + ' a';
        expect(browser.waitForVisible(idElement,2000)).toBe(true);
    });

    this.Then(/^I should be able to delete the item$/, function () {
        //Right click on the item and delete
        browser.rightClick(idElement,15,1);
        browser.click(cms.menuDelete);
        browser.alertAccept();

        //Check deleting progress
        browser.waitUntil(function () {
            console.log('Started deleting...');
            return browser.getText(idElement) === 'Deleting...'
        }, 5000, 'expected text to be Deleting... ');

        browser.waitUntil(function () {
            console.log('In progress of deleting...');
            return browser.getText(idElement) !== 'Deleting...'
        }, 5000, 'expected text to not be Deleting...');

        //Validate that the item is not existing
        browser.waitUntil(function () {
            return browser.isExisting(idElement) === false
        }, 5000, 'expected text to not see the node ID');
    });
};
