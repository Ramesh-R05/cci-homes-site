export default function addSubsectionsToNavItem(item, includeurl = true) {
    return item && item.tagsDetails && item.tagsDetails.length > 1
        ? {
              ...item,
              url: includeurl ? item.url : null,
              subsections: item.tagsDetails.map(tag => ({
                  contentTitle: tag.displayName,
                  url: tag.urlName
              }))
          }
        : item;
}
