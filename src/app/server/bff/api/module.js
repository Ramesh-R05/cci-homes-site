import makeRequest from '../../makeRequest';
import {load} from '@bxm/config';
import {backendLogger as logger} from '@bxm/winston-logger';
import get from 'lodash/object/get';
import find from 'lodash/collection/find';

const config = load();

export async function getModules(...args) {
    try {
        if (!args.length) return {};

        const moduleNames = args.join(',');
        const modules = await makeRequest(`${config.services.remote.module}/${moduleNames}`);
        const moduleList = {};

        args.forEach((arg) => {
            const moduleConfig = find(modules.data, { moduleName: arg });
            if (arg === 'footer') {
                moduleList[arg] = moduleConfig || {};
            } else {
                moduleList[arg] = get(moduleConfig, 'moduleManualContent.data', []);
            }
        });
        
        if (args.length === 1) {
            return moduleList[args];
        } else {
            return moduleList;
        }
    } catch(error) {
        logger.log('error', error);
        return {};
    }
}
