import headerNavigation from '../moduleHandlers/headerNavigation';
import hamburgerNavigation from '../moduleHandlers/hamburgerNavigation';
import theme from '../moduleHandlers/theme';

export default function processModules(moduleResponse, themeModule = '') {
    if (!module && !themeModule) {
        return {};
    }

    return Object.keys(moduleResponse).reduce((allModules, moduleName) => {
        let accumulatedModules = { ...allModules };

        switch (moduleName) {
            case 'headernavigation':
                accumulatedModules = {
                    ...allModules,
                    headerNavigation: headerNavigation(moduleResponse[moduleName])
                };
                break;

            case 'hamburgernavigation':
                accumulatedModules = {
                    ...allModules,
                    hamburgerNavigation: hamburgerNavigation(moduleResponse[moduleName])
                };
                break;

            case themeModule:
                accumulatedModules = {
                    ...allModules,
                    theme: theme(moduleResponse[moduleName])
                };
                break;

            default:
                return accumulatedModules;
        }
        return accumulatedModules;
    }, {});
}
