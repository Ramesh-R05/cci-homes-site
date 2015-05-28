/**
 * config loader loads settings for environments and merges with config
 * @param environment one of local, stubbed, dev, dev-preview, automation, uat, uat-preview, live, live-preview
 * @returns {*}
 */
export function load(environment = 'local') {
    console.log(`[config][loader] environment is set to '${environment}'`);
    console.log(`[config][loader] loading '${environment}' environment configuration`);

    try {
        return require('./environments/' + environment + '/settings');
    } catch (e) {
        // return dev settings if env not found.
        // most likely a personal environment which is similar to dev
        console.log(`[config][loader] '${environment}' not found. Loading dev configuration`);
        return require('./environments/dev/settings');
    }
}
