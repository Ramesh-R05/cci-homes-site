//compose URL base on ENV variables
var nconf = require('nconf');
nconf.argv().env();
var wn_flag = nconf.get('WN');
var run_env = nconf.get('APP_ENV');
var site_domain = nconf.get('APP_KEY');
var baseUrl = nconf.get('URL');


if (wn_flag === 'true') {
    var domain_sufx = '.wn.bauer-media.net.au/';
    console.log('running on WN framework');
} else {
        var domain_sufx = '.bauer-media.net.au/';
        console.log('running on share repo framework');
}

if (baseUrl === '') {
    var baseUrl = 'http://' + run_env + '.' + site_domain + domain_sufx;
    console.log('running on url :: ' + baseUrl);
} else {
    console.log('running on url :: ' + baseUrl);
}

module.exports = {
    Urls: {
        'home_page': baseUrl
    }
};
