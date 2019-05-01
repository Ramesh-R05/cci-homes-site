export default function constructListingFilterString(baseQuery, categoryTag, locationTag, includeOnlineResults = false) {
    let filterString = `${baseQuery}`;

    if (categoryTag) {
        filterString += ` and tagsDetails/urlName eq '${categoryTag}'`;
    }

    if (locationTag) {
        const locationString = includeOnlineResults
            ? ` and (tagsDetails/urlName eq '${locationTag}' or tagsDetails/fullName eq 'location_online')`
            : ` and tagsDetails/urlName eq '${locationTag}'`;

        filterString += locationString;
    }

    return filterString;
}
