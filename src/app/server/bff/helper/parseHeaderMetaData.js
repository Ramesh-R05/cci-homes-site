const headerMetaDataPropertyMap = {
    pageCanonicalUrl: 'canonicalUrl',
    gtmGroupingCategory: 'GroupingCategory',
    pageHrefLang: 'hrefLang',
    pageMetaDescription: 'pageDescription',
    nodeName: 'pageName',
    pageTitle: 'title'
};

export default function parseHeaderMetaData(data, headerMetaData = {}) {
    const result = headerMetaData;
    Object.keys(headerMetaDataPropertyMap).forEach(key => {
        const propertyName = headerMetaDataPropertyMap[key];

        if (propertyName && data[key]) {
            result[propertyName] = data[key];
        }
    });

    return result;
}
