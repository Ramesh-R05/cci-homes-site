import { backendLogger as logger } from '@bxm/winston-logger';

export default function loggerPlugin() {
    return {
        name: 'loggerPlugin',
        plugContext() {
            return {
                plugActionContext(actionContext) {
                    const originalActionDispatch = actionContext.dispatch;
                    actionContext.dispatch = function(type, payload) {
                        if (type.includes('_FAILED')) {
                            if (payload.response && payload.response.error) {
                                logger.error(`${type} ${this.rootId}`, { error: payload.response.error });
                            } else {
                                logger.error(`${type} ${this.rootId}`, { error: payload });
                            }
                        }
                        logger.debug(`${type} ${this.rootId}`);
                        originalActionDispatch(type, payload);
                    };
                }
            };
        }
    };
}
