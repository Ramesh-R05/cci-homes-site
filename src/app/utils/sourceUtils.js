import unescape from 'lodash/string/unescape';

const ACCENT_REGEX = /[àáâãäçèéêëìíîïñòóôõöùúûüýÿÅÀÁÂÃÄÇÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ]/g;
const STRIP = 'aaaaaceeeeiiiinooooouuuuyyAAAAAACEEEEIIIINOOOOOUUUUY';
function stripAccents(s) {
    return s.replace(ACCENT_REGEX,
            m => STRIP.substr(ACCENT_REGEX.source.indexOf(m) - 1, 1));
}

export function normalise(source) {
    return stripAccents(unescape(source))
        .replace(/[^\w\s]/g, '')
        .replace(/[\s_]+/g, '-')
        .toLowerCase();
}
