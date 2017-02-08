const entityPropertyMap = {
    id: 'id',
    contentTitle: 'title',
    pageTitle: 'pageTitle',
    contentBody: 'body',
    contentProfiles: 'authorProfiles',
    pageDateCreated: 'dateCreated',
    contentNewsKeywords: 'googleNewsKeywords',
    contentImageAltText: 'imageAltText',
    contentImageCaption: 'imageCaption',
    contentFacebookImageUrl: 'imageFacebookUrl',
    contentImageUrl: 'imageUrl',
    contentCampaign: 'campaign',
    campaignType: 'campaignType',
    campaignSponsor: 'campaignSponsor',
    sponsorName: 'sponsorName',
    nodeTypeAlias: 'nodeType',
    contentSummary: 'summary',
    contentCustomLabel: 'customLabel',
    source: 'source',
    articleSource: 'source',
    brand: 'brand',
    tags: 'tags',
    navigationTags: 'navigationTags',
    contentTags: 'tags',
    url: 'url',
    urlName: 'urlName',
    location: 'url',
    parentName: 'parentName',
    parentUrl: 'parentUrl',
    contentVideo: 'video',
    contentGallery: 'galleryItems',
    siteUrl: 'siteUrl',
    pageMetaDescription: 'pageMetaDescription',
    tagsDetails: 'tagsDetails',
    articleTags: 'tags',
    navigationTagsDetails: 'navigationTagsDetails',
    kingtag: 'kingtag'
};

export function parseEntity(data, propertyMapOverride = {}) {
    let entity = {};
    const propertyMap = Object.assign({}, entityPropertyMap, propertyMapOverride);
    const propertyMapKeys = Object.keys(propertyMap);

    propertyMapKeys.map((key) => {
        const propertyName = propertyMap[key];
        if (propertyName && data[key]) {
            entity[propertyName] = data[key];
        }
    });

    return entity;
}

export function parseEntities(entities, propertyMapOverride) {
    return entities.map((entity) => {
        return parseEntity(entity, propertyMapOverride);
    });
}
