import logger from '../../../../logger';

// disable lint rule for unused next param as expressjs uses function parameters length to detect error middleware
// eslint-disable-next-line no-unused-vars
export default function errorMiddleware(err, req, res, next) {
    if (!err.status) {
        // eslint-disable-next-line no-param-reassign
        err.status = 500;
    }

    if (err.status !== 404) {
        logger.error(err);
    }

    const errorResponse = {
        error: err
    };

    res.status(err.status).json(errorResponse);
}
