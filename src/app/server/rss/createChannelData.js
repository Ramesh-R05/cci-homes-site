import sanitise from './sanitise';

export default function createChannelData(data, additionalData) {
    const { protocol, hostname, originalUrl } = additionalData;
    return {
        title: data.pageTitle || data.contentTitle,
        feed_url: `${protocol}://${hostname}${originalUrl}`,
        site_url: data.siteUrl,
        description: sanitise(data.pageMetaDescription || data.contentSummary),
        copyright: `${(new Date()).getFullYear()} BAUER MEDIA PTY LIMITED`,
        ttl: 60,
        custom_namespaces: {
            media: 'http://search.yahoo.com/mrss/',
            mi: 'http://schemas.ingestion.microsoft.com/common/'
        }
    };
}
