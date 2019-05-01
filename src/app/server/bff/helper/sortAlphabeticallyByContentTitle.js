import alphabeticalCompare from './alphabeticalCompare';

export default function sortAlphabeticallyByContentTitle(arr) {
    return [...arr].sort(alphabeticalCompare);
}
