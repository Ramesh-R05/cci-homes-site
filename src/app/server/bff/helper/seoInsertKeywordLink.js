export function keywordLinkExist(content, keywordObj) {
    return content.includes(`[${keywordObj.keyword}]`);
}

export function getLinksRange(content) {
    const linksPattern = /\[.*?\]\((https?:\/\/(?:www\.|(?!www))[^\s.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/g;
    const linksRange = [];
    let match;

    while (match = linksPattern.exec(content)) { // eslint-disable-line no-cond-assign
        const { index } = match;
        linksRange.push([index, index + match[0].length]);
    }

    return linksRange;
}

export function replaceContent(params) {
    const { content, matchIndex, keyword, primaryUrl } = params;
    const space = matchIndex === 0 ? 0 : 1;
    const leftString = content.substr(0, matchIndex + space);
    const keywordLength = keyword.length;
    const originalKeyword = content.substr(matchIndex + space, keywordLength);
    const link = `[${originalKeyword}](${primaryUrl})`;
    const rightString = content.substr(matchIndex + keywordLength + space);

    return leftString + link + rightString;
}

export function searchKeyword(content, keywordObj, primaryUrl) {
    const { keyword } = keywordObj;
    const reg = `[^a-zA-Z0-9-]{1}${keyword}[^a-zA-Z0-9-]{1}`;
    const keywordPattern = new RegExp(reg, 'gi');
    const linksRange = getLinksRange(content);
    let match;

    // check if it's in the begin of the sentence
    if (content.startsWith(keyword)) {
        return {
            updateContent: replaceContent({ content, matchIndex: 0, keyword, primaryUrl }),
            replaced: true
        };
    }

    while (match = keywordPattern.exec(content)) { // eslint-disable-line no-cond-assign
        const { index: matchIndex } = match;
        const foundLinks = linksRange.filter(range => (matchIndex >= range[0] && matchIndex < range[1]));

        if (!foundLinks.length) {
            return {
                updateContent: replaceContent({ content, matchIndex, keyword, primaryUrl }),
                replaced: true
            };
        }
    }

    return {
        updateContent: content
    };
}

export function init(body, seoData) {
    const { keywords, primaryUrl } = seoData;

    return body.map((section) => {
        if (section.type !== 'paragraph' || !keywords || !keywords.length) return section;

        return keywords.reduce((s /* section */, keywordObj, currentIndex) => {
            if (keywordLinkExist(s.content, keywordObj)) {
                delete keywords[currentIndex];
                return s;
            }

            const { updateContent, replaced } = searchKeyword(s.content, keywordObj, primaryUrl);

            if (replaced) {
                delete keywords[currentIndex];
            }
            s.content = updateContent; // eslint-disable-line no-param-reassign
            return s;
        }, section);
    });
}
