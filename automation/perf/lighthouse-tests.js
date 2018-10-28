const lighthouseTests = require('../node_modules/@bxm/automation/lib/execution/lighthouseTests');

const testLinks = [
    {
        title: 'HTL-homepage',
        url: 'http://homes-site.test.bxm.net.au/',
        expectedScore: 0.12
    },
    {
        title: 'HTL-section',
        url: 'http://homes-site.test.bxm.net.au/real-homes/',
        expectedScore: 0.14
    },
    {
        title: 'HTL-tags landing page',
        url: 'http://homes-site.test.bxm.net.au/tags/luxury-home/',
        expectedScore: 0.14
    },
    {
        title: 'HTL-article',
        url: 'http://homes-site.test.bxm.net.au/automation-test-article-with-hero-image-3193/',
        expectedScore: 0.11
    },
    {
        title: 'HTL-gallery',
        url: 'http://homes-site.test.bxm.net.au/automation-test-gallery-3201/',
        expectedScore: 0.11
    }
];

testLinks.forEach((doctypeSetting) => {
    lighthouseTests(doctypeSetting, 'performance');
});
