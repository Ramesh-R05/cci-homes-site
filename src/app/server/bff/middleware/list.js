export default async function list(req, res, next) {
    try {
        const {listName } = req.query;

        res.body = {
            list: {
                params: {
                    listName: listName || 'home',
                    ...req.query
                }
            }
        };

        next();
    } catch(error) {
        next(error);
    }
}
