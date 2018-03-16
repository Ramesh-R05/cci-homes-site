// eslint-disable-next-line no-unused-vars
export default function rssInfo(req, res, next) {
    const { config } = req.app.locals;
    const feedBasePath = `${req.protocol}://${req.headers.host}/rss`;

    const infoResp = [
        {
            name: `${config.site.name} (All brands)`,
            url: feedBasePath,
            summaryUrl: `${feedBasePath}/summary`
        },
        {
            name: `${config.site.name}`,
            url: `${feedBasePath}/${config.site.prefix.toLowerCase()}`,
            summaryUrl: `${feedBasePath}/summary/${config.site.prefix.toLowerCase()}`
        }
    ];

    config.brands.uniheader.forEach((brand) => {
        infoResp.push({
            name: brand.title,
            url: `${feedBasePath}/${brand.id}`,
            summaryUrl: `${feedBasePath}/summary/${brand.id}`
        });
    });

    res.set('Content-Type', 'application/json');
    res.send(infoResp);
}
