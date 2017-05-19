import { backendLogger as logger } from '@bxm/winston-logger';

// disable lint rule for unused next param as expressjs uses function parameters length to detect error middleware
// eslint-disable-next-line no-unused-vars
export default function errorMiddleware(err, req, res, next) {
    // eslint-disable-next-line no-param-reassign
    if (!err.status) err.status = 500;
    if (err.status !== 404) logger.error(err);

    const errorResponse = {
        error: err
    };

    res.status(err.status).json(errorResponse);
}
