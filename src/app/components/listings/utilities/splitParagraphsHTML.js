const splitParagraphsHTML = values => {
    let html = '';

    if (Array.isArray(values)) {
        values.forEach(value => {
            html += `${value}<br/>`;
        });
    }

    return html;
};

export default splitParagraphsHTML;
