var cms_widget = {

    loginUsername: 'input#lname',
    loginPassword: 'input#passw',
    loginButton: 'input[value="Login"]',
    cmsLeftSide: '#leftDIV',
    cmsRightSide: '#rightDIV',
    createName: 'input.bigInput',
    createDocumentType: 'select.bigInput',
    createButton: 'input[value="Create"]',
    itemTabs: '#body_TabView1',
    editorialLongTitle: 'div[module-id="contentTitle"] input',
    editorialShortTeaser: 'div[module-id="contentSummary"] textarea',
    editorialImage: 'input[id="body_txtbody_prop_contentImageUrl_fuCougarUploader"]',
    editorialBodyComponentList:'select[ng-model="newComponent"]',
    editorialBodyParagraphOption: 'option[value="0"]',
    editorialBodyHeadingOption: 'option[value="1"]',
    editorialBodyAddButton: 'button[ng-click="addComponent()"]',
    editorialBodyParagraph: 'textarea.form-control.paragraph-editor',
    editorialBodyHeading: '.content-body-editor .form-control.one-half.ng-pristine.ng-valid',
    searchAndSocialPageTitle: 'div[module-id="pageTitle"] input',
    searchBox: '#umbSearchField',
    searchResult: '.ac_results',
    menuDelete: '.menuSpr.sprDelete',
    unpublishButton: '[value="Unpublish"]',
    articleSource: '.content-select-menu__form-group select',
    articleTags: '.tw-bs.module.tag .tag-list__item',
    articleTagsList: '.tw-bs.module.tag ul.dropdown-menu li a',

};

module.exports = cms_widget;
