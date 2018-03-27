var he = require('he'); //Reference - https://github.com/mathiasbynens/he

function getCDataValue(str, tag) {
    var result = null;
    var cd = '><![CDATA[';
    var pos = str.indexOf(tag + cd);
    var len = (tag + cd).length;
    if (pos > -1) {
        var pos2 = str.indexOf(']]></' + tag + '>', pos + 1);
        if (pos2 > pos) {
            result = str.substr(pos + len, pos2 - pos - len);
        }
    }
    return result;
}

function count(main_str, sub_str) {
    main_str += '';
    sub_str += '';

    if (sub_str.length <= 0)
    {
        return main_str.length + 1;
    }

    var subStr = sub_str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return (main_str.match(new RegExp(subStr, 'gi')) || []).length;
}

module.exports = function() {

    this.Then(/^I should see "([^"]*)" tag containing "([^"]*)" value$/, function (tag, value) {
        var sourceCode = he.decode(browser.getSource());

        var result = sourceCode.includes("<" + tag + ">" + value + "</" + tag + ">");
        expect(result).toBe(true);
    });

    this.Then(/^I should see "([^"]*)" tag containing "([^"]*)" in CDATA$/, function (tag, cdata) {
        var sourceCode = he.decode(browser.getSource());

        var value = getCDataValue(sourceCode, tag);
        expect(value).toContain(cdata);
    });

    this.Then(/^I should see "([^"]*)" tag containing a value$/, function (tag) {
        var sourceCode = he.decode(browser.getSource());

        var result = sourceCode.includes("<" + tag + ">");
        expect(result).toBe(true);

        var result = sourceCode.includes("<" + tag + "><![CDATA[]]>");
        expect(result).toBe(false);
    });

    this.Then(/^I should not see "([^"]*)" tag$/, function (tag) {
        var sourceCode = he.decode(browser.getSource());

        var result = sourceCode.includes("<" + tag + ">");
        expect(result).toBe(false);
    });

    this.Then(/^I should see "([^"]*)" in json$/, function (text) {
        var sourceCode = he.decode(browser.getSource());

        var result = sourceCode.includes(text);
        expect(result).toBe(true);
    });

};
