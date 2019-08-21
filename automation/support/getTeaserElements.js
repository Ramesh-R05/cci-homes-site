Cypress.Commands.add('getTeaserElements', teaserSelector => {
    cy.wrap(teaserSelector).as('teaserSelector');

    cy.get('@teaserSelector')
        .find('picture img')
        .as('teaserImage');

    cy.get('@teaserSelector')
        .find('.teaser__title > a')
        .as('teaserTitle');

    cy.get('@teaserSelector')
        .find('.teaser__source-image')
        .as('teaserSource');

    return cy.wrap({
        teaserImage: '@teaserImage',
        teaserTitle: '@teaserTitle',
        teaserSource: '@teaserSource'
    });
});
