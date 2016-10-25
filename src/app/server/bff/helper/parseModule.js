import {parseEntities} from './parseEntity';

export function parseModules(moduleResp) {
    if (!moduleResp || !moduleResp.data) return {};

    const modules = {};
    moduleResp.data.map((module) => {
        modules[module.moduleName] = {
            module: {
                id: module.id,
                storeName: module.moduleName
            },
            items: parseEntities(module.moduleManualContent.data)
        }
    });

    return modules;
}
