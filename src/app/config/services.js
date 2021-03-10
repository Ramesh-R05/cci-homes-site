export default {
    local: 'http://127.0.0.1',
    remote: {
        entity: 'https://services.sit.bxm.net.au/entity/v1/homes',
        listings: 'https://services.sit.bxm.net.au/listing/v1/homes',
        module: 'https://services.sit.bxm.net.au/module/v1/homes',
        sitemap: 'http://sitemap-service.sit.bxm.net.au/v1/homes',
        tag: 'https://services.sit.bxm.net.au/tag/v1',
        search: 'https://services.sit.bxm.net.au/es-search/v1/homes',
        identity: 'https://dev.dmp.aremedia.net.au/federation/api/identity'
    },
    endpoints: {
        page: '/api/getPageContent',
        list: '/api/list',
        search: '/api/search',
        directory: '/api/directory',
        identity: '/api/identity',
        email: '/api/sendEmail'
    },

    header: {
        url: 'https://s3-ap-southeast-2.amazonaws.com/digital-services/header/prod/globalheader.json'
    },
    redirect: {
        url: 'http://services.sit.bxm.internal/redirect/v1/homes/301'
    },
    googlePlusUrl: 'https://plus.google.com/+HomesToLoveAu/',
    faceBookAppID: '852557544824192'
};
