import { parseEntities } from './parseEntity';

export default function getFilterData(query, data) {
    let filters;

    if (!Array.isArray(data)) {
        filters = [];
    }

    filters = parseEntities(
        data,
        {
            displayName: 'label',
            urlName: 'value'
        },
        true
    );

    const findQueryInFilters = filters.find(filter => filter.value === query) || false;
    const selectedValue = findQueryInFilters ? findQueryInFilters.value : '';

    return [selectedValue, filters];
}
