const entityPropertyMap = {
    articleSource: 'source',
    articleTags: 'tags',
    brand: 'brand',
    campaignSponsor: 'campaignSponsor',
    campaignType: 'campaignType',
    contentBody: 'body',
    contentCampaign: 'campaign',
    contentCustomLabel: 'customLabel',
    contentFacebookImageUrl: 'imageFacebookUrl',
    contentGallery: 'galleryItems',
    contentImageAltText: 'imageAltText',
    contentImageCaption: 'imageCaption',
    contentImageUrl: 'imageUrl',
    contentNewsKeywords: 'googleNewsKeywords',
    contentProfiles: 'authorProfiles',
    contentSummary: 'summary',
    contentTags: 'tags',
    contentTitle: 'title',
    contentVideo: 'video',
    directoryLogoUrl: 'directoryLogoUrl',
    disableAmp: 'disableAmp',
    externalLinks: 'externalLinks',
    id: 'id',
    isAllAmpCompatible: 'isAllAmpCompatible',
    kingtag: 'kingtag',
    location: 'url',
    navigationTags: 'navigationTags',
    navigationTagsDetails: 'navigationTagsDetails',
    nodeTypeAlias: 'nodeType',
    pageDateCreated: 'dateCreated',
    pageMetaDescription: 'pageMetaDescription',
    pageTitle: 'pageTitle',
    parentName: 'parentName',
    parentUrl: 'parentUrl',
    siteName: 'siteName',
    siteUrl: 'siteUrl',
    source: 'source',
    sponsorName: 'sponsorName',
    tags: 'tags',
    tagsDetails: 'tagsDetails',
    url: 'url',
    urlName: 'urlName',
    // listing specific data
    businessLogo: 'businessLogo',
    businessName: 'businessName',
    cardImage: 'cardImage',
    copy: 'copy',
    emailAddress: 'emailAddress',
    facebookUrl: 'facebookUrl',
    featuredIn: 'featuredIn',
    galleries: 'galleries',
    heroGallery: 'heroGallery',
    instagramUrl: 'instagramUrl',
    phoneNumber: 'phoneNumber',
    pinterestUrl: 'pinterestUrl',
    products: 'products',
    profileGallery: 'profileGallery',
    shortSummary: 'shortSummary',
    siteCode: 'siteCode',
    sortOrder: 'sortOrder',
    streetAddress: 'streetAddress',
    subheading: 'subheading',
    testimonials: 'testimonials',
    twitterUrl: 'twitterUrl',
    webAddress: 'webAddress'
};

export function parseEntity(data, propertyMapOverride = {}, onlyUseOverride = false) {
    const entity = {};
    const propertyMap = onlyUseOverride ? propertyMapOverride : Object.assign({}, entityPropertyMap, propertyMapOverride);
    const propertyMapKeys = Object.keys(propertyMap);

    propertyMapKeys.forEach(key => {
        const propertyName = propertyMap[key];

        if (propertyName && data[key]) {
            entity[propertyName] = data[key];
        }
    });

    return entity;
}

export function parseEntities(entities, propertyMapOverride) {
    return entities.map(entity => parseEntity(entity, propertyMapOverride));
}
