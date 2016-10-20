var wn_menu = require('../page_objects/wn_header_widget');

module.exports = function() {
    var menu = new wn_menu();


    this.Given(/^To Love is clickable to open the menu list of all sites$/, function () {
        menu.clickMobileMenu();
    });

    this.Given(/^To Love is unclickable$/, function () {
        menu.clickMobileMenu();
        expect(browser.isVisible('ul.global-nav-list__dropdown')).toBe(false);
    });

    this.Given(/^I can navigate to all sites in the desktop list under More$/, function (dataTable) {
        var rows = dataTable.hashes();

        //below captures the array of menu items to validate agains the table
        var menuTitle = browser.getAttribute('ul.global-nav-list__dropdown li a', 'title');
        var menuhref = browser.getAttribute('ul.global-nav-list__dropdown li a', 'href');
        //end

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates position of menu base on Index
            expect(row['title']).toEqual(menuTitle[i]);
            expect(row['url']).toEqual(menuhref[i]);
        }
    });

    this.Given(/^I can navigate to all sites in the desktop list on the header$/, function (dataTable) {
        var rows = dataTable.hashes();

        //below captures the array of menu items to validate agains the table
        var menuTitle = browser.getAttribute('ul.global-nav-list li a', 'title');
        var menuhref = browser.getAttribute('ul.global-nav-list li a', 'href');
        //end

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates position of menu base on Index
            expect(row['title']).toEqual(menuTitle[i]);
            expect(row['url']).toEqual(menuhref[i]);
        }
    });

    this.Given(/^More should show more sites on hover$/, function () {
        menu.hoverMore(0,0);
    });

    this.Given(/^The list under More should disappear if there is no hover on More$/, function () {
        menu.hoverMore(999,999);
        expect(browser.isVisible('ul.global-nav-list__dropdown')).toBe(false);
    });

    this.Given(/^I can navigate to all sites in the mobile menu list on the left side$/, function (dataTable) {
        var rows = dataTable.hashes();

        //below captures the array of menu items to validate agains the table
        var mobileMenuTitle = browser.getAttribute('ul.mobile-menu-list li a', 'title');
        var mobileMenuhref = browser.getAttribute('ul.mobile-menu-list li a', 'href');
        //end

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //validates position of menu base on Index
            expect(row['title']).toEqual(mobileMenuTitle[i]);
            expect(row['url']).toEqual(mobileMenuhref[i]);
        }
    });

    this.Given(/^I can navigate to all sites in the mobile menu list on the right side$/, function (dataTable) {
        var rows = dataTable.hashes();

        //below captures the array of menu items to validate agains the table
        var mobileMenuTitle = browser.getAttribute('ul.mobile-menu-list li a', 'title');
        var mobileMenuhref = browser.getAttribute('ul.mobile-menu-list li a', 'href');
        //end

        for (var i = 0; i < rows.length; ++i) {
            var row = rows[i];
            //had to add 5 to cater for the 1st 5 menu element
            expect(row['title']).toEqual(mobileMenuTitle[i+5]);
            expect(row['url']).toEqual(mobileMenuhref[i+5]);
            //end
        }
    });

    this.Given(/^The mobile menu list can be closed by clicking To Love$/, function () {
        menu.clickMobileMenu();
        expect(browser.isVisible('nav.tl-header div.tl-modal--menu.tl-modal--dark.tl-modal')).toBe(false);
    });

    this.When(/^I should see the clickable To Love$/, function () {
        //open menu
        menu.clickMobileMenu();
        expect(browser.isVisible('nav.tl-header div.tl-modal--menu.tl-modal--dark.tl-modal')).toBe(true);
        //close menu
        menu.clickMobileMenu();
    });

    this.When(/^I should not see any sites displaying on the WN header$/, function () {
        expect(browser.isVisible('.left global-nav')).toBe(false)
    });

    this.When(/^I should not see the WN header$/, function () {
        expect(browser.isVisibleWithinViewport('.tl-header')).toBe(false)
    });

    this.When(/^I should see the unclickable To Love$/, function () {
        expect(browser.isVisible('div.tl-icon-drop-menu .tl-icon-drop-menu')).toBe(false);
    });

};

