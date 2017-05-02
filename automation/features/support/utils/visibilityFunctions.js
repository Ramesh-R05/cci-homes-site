/// This is a visibility and assertion library
// For further details contact asanchezgiraldo@bauer-media.com.au

function isAdVisible (page, visibility, adElement) {
    var valueVisible;
    //Identify the element
    switch(visibility) {
        case 'see':
            valueVisible = true;
            browser.waitForVisible(adElement, 10000);
            break;
        case 'not see':
            valueVisible = false;
            break;
    }
    //print Current Page
    console.log("Validating page : %s", page);

    //Validate base on options
    expect(browser.isVisible(adElement)).toBe(valueVisible);
}

function isStickyVisible () {
    console.log("PNEDING");
    /// this can be developed in the future
    /// this is to prove multi function from one library file
}

module.exports = {
    isAdVisible: isAdVisible,
    isStickyVisible: isStickyVisible
};
