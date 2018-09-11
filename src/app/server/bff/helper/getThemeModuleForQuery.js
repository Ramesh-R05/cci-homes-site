export default function getThemeModuleForQuery(query) {
    let themeModulePrefix;
    const queryKeys = Object.keys(query);

    if (query.url === '/') {
        themeModulePrefix = 'home';
    } else {
        themeModulePrefix = queryKeys.reduce((prev, curr) => (curr === 'brand' || curr === 'navSection' || curr === 'tag' ? query[curr] : prev), '');
    }

    return `${themeModulePrefix}theme`;
}
