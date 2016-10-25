import {backendLogger as logger} from '@bxm/winston-logger';

export default function error(err, req, res, next) {
    const status = err.status || 503;
    if (err.status !== 404) logger.log('error', err);

    const errorResponse = {
        error: err,
    };

    res.status(status).json(errorResponse);
}
