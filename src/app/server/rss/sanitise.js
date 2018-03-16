import stripTags from 'striptags';
import removeMarkdown from 'remove-markdown';

export default function sanitise(string) {
    return string ? removeMarkdown(stripTags(string)) : '';
}
