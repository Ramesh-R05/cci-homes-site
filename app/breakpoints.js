import {merge} from 'lodash/object';

const breakpoints = {
    smallRangeMin: 0,
    smallRangeMax: 690,
    mediumRangeMin: 691,
    mediumRangeMax: 1023,
    largeRangeMin: 1024,
    largeRangeMax: 1349,
    xlargeRangeMin: 1349,
    xlargeRangeMax: 9999999,

    bannerRangeMin: 320,
    bannerRangeMax: 727,
    leaderboardRangeMin: 728,
    leaderboardRangeMax: 1023
};

// Special left hand rail breakpoints
const leftHandRailWidth = 390;
const articlePadding = 30;

// Leaderboard with left hand rail
merge(breakpoints, {
    railLeaderboardRangeMin: leftHandRailWidth + articlePadding + breakpoints.leaderboardRangeMin,
    railLeaderboardRangeMax: leftHandRailWidth + breakpoints.leaderboardRangeMax
});

// Banner with left hand rail
merge(breakpoints, {
    railBannerRangeMin: breakpoints.largeRangeMin,
    railBannerRangeMax: breakpoints.railLeaderboardRangeMin - 1
});

// Convert values to strings
const finalBreakpoints = {};

Object.keys(breakpoints).forEach(key => {
    finalBreakpoints[key] = breakpoints[key] + 'px';
});

export default finalBreakpoints;
