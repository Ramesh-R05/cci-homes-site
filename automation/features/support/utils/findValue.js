//This function is to get a value from either array[0] or array[1].
//On the gallery page, the current image number on desktop is always showing as ['2','0'] (as an example) when using getText.
//Unfortunately mobile version is always show ['','2'].
//Therefore, this function is to pick a value from either array[0] or array[1].

function findValue(a, b) {
    if (a == '') {
        return b;
    } else {
        return a;
    }
}

module.exports = findValue;
