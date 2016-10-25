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
    nodeTypeAlias: 'nodeType',
    contentSummary: 'summary',
    contentCustomLabel: 'customLabel',
    source: 'source',
    articleSource: 'source',
    tags: 'tags',
    contentTags: 'tags',
    url: 'url',
    location: 'url',
    parentName: 'parentName',
    parentUrl: 'parentUrl',
    contentVideo: 'video',
    contentGallery: 'galleryItems',
    siteUrl: 'siteUrl'
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
