const footer = require('../page_objects/footer_widget');

module.exports = function() {

    this.Given(/^I can see the social icons clickable to open its page in the footer$/,  (dataTable) => {
        const rows = dataTable.hashes();

        // Below captures the array of social links to validate against the table
        const socialLink = browser.getAttribute(footer.footerSocialLink, 'href');

        rows.forEach((row, i) => {
            expect(socialLink[i]).toEqual(row.url);
        });        
    });

    this.Given(/^I can navigate to all brands in the footer$/,  (dataTable) => {

        const rows = dataTable.hashes();

        // Below captures the array of menu items to validate against the table
        const brandTitle = browser.getText(footer.footerBrandslinks);
        const brandHref = browser.getAttribute(footer.footerBrandslinks, 'href');
        // End

        rows.forEach((row, i) => {
            expect(brandTitle[i]).toEqual(row.title)
            expect(brandHref[i]).toContain(row.url)
        });
    });

    this.Given(/^I can navigate to all network sites in the footer$/,  (dataTable) => {
        const rows = dataTable.hashes();

        // Below captures the array of menu items to validate against the table
        const networkTitle = browser.getText(footer.footerNetworkLinks);
        const networkHref = browser.getAttribute(footer.footerNetworkLinks, 'href');
        // End

        rows.forEach((row, i) => {
            expect(networkTitle[i]).toEqual(row.title)
            expect(networkHref[i]).toEqual(row.url)
        });
    });

    this.Given(/^I can navigate to all standard pages in the footer$/,  (dataTable) => {
        const rows = dataTable.hashes();

        // Below captures the array of menu items to validate against the table
        const pageTitle = browser.getText(footer.footerCorporateLinks);
        const pageLink = browser.getAttribute(footer.footerCorporateLinks, 'href');
        // End        

        rows.forEach((row, i) => {
            expect(pageTitle[i]).toEqual(row.page)
            expect(pageLink[i]).toEqual(row.url)
        });
    });

    this.Given(/^I can see the standard copyright text in the footer as "([^"]*)"$/,  (text) => {
        // Validate the copyright text is correct
        expect(browser.getText(footer.footerElementCopyright)).toContain(text)
    });

    this.Given(/^I can see all main elements in the footer$/,  () => {
        // Validate that the four main elements in the footer appears

        expect(browser.isVisible(footer.footerNewsletterSubscribe)).toBe(true);
        expect(browser.isVisible(footer.footerElementSocialContainer)).toBe(true);
        expect(browser.isVisible(footer.footerBrandsList)).toBe(true);
        expect(browser.isVisible(footer.footerNetworkList)).toBe(true);
        expect(browser.isVisible(footer.footerCorporateList)).toBe(true);
    });
};
