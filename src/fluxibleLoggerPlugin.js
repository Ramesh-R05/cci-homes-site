import { backendLogger as logger } from '@bxm/winston-logger';

export default function loggerPlugin() {
    return {
        name: 'loggerPlugin',
        plugContext() {
            return {
                plugActionContext(actionContext) {
                    const originalActionDispatch = actionContext.dispatch;
                    actionContext.dispatch = function dispatch(type, payload) {
                        if (type.includes('_FAILED') || type === 'PAGE_NOT_FOUND') {
                            let err = payload;
                            if (payload.response && payload.response.error) err = payload.response.error;
                            logger.error(`${type} ${this.rootId}`, err);
                        } else if (process.env.APP_DEBUG === 'true') {
                            logger.debug(`${type} ${this.rootId}`);
                        }
                        originalActionDispatch(type, payload);
                    };
                }
            };
        }
    };
}
