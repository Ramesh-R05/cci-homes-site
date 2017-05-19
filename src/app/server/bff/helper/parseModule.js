import { parseEntities } from './parseEntity';

export default function parseModules(moduleResp) {
    if (!moduleResp || !moduleResp.data) return {};

    const modules = {};
    // eslint-disable-next-line no-return-assign
    moduleResp.data.map(module => modules[module.moduleName] = {
        module: {
            id: module.id,
            storeName: module.moduleName
        },
        items: parseEntities(module.moduleManualContent.data)
    });

    return modules;
}
