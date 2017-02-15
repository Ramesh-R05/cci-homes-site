var nconf = require('nconf');
nconf.argv().env();
var wn_flag = nconf.get('WN');
function randomValue(){
    return Date.now();
}

var hooks = function () {
    var world = require('./world');


    this.Before(function (scenario) {
        if (wn_flag === 'true') {
            browser.url(world.Urls.home_page);
            console.log('running WN stubb');
        } else {
            console.log('Automation mode');
        }
    });

    this.After(function (scenario) {
        var randomId = randomValue();
        var tags='';
        if (scenario.getTags().length == '1'){
            tags = scenario.getTags()[0].getName();
        } else {
            for (var i=0; i<scenario.getTags().length;i++){
                tags = scenario.getTags()[i].getName()+","+tags;
            }
            //clean tags
            tags=tags.substr(0, tags.length-1);
        }


        if (scenario.isSuccessful()) {
            console.log("Nothing to record - Test Passed")
        } else {
            console.log("if is not Passed is FAILED");
        }
        browser.deleteCookie();
    });
};

module.exports = hooks;
