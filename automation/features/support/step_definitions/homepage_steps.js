import home from '../page_objects/homepage_widget';
import { validateImageURL } from '@bxm/automation';

When(`I can see the homepage hero element with a title and an image clickable to its page`, () => {
    const { heroElmt } = home;

    cy.get(heroElmt).as('homePageHero');

    cy.get('@homePageHero').then(el => {
        expect(el).to.be.visible;

        expect(el.find('.teaser__title > a').prop('href')).not.to.be.undefined;

        expect(el.find('.teaser__brand-image')).to.be.visible;
    });
});

When(`I can see the homepage hero source`, () => {
    const { heroSource } = home;

    cy.get(heroSource).then(sourceEl => {
        expect(sourceEl).to.be.visible;
    });
});

When(`I cannot see the homepage hero source`, () => {
    const { heroSource } = home;

    cy.get(heroSource).then(sourceEl => {
        expect(sourceEl).not.to.be.visible;
    });
});

When(`I should see the homepage hero image`, () => {
    const { heroImgUrl } = home;

    cy.get(heroImgUrl)
        .filter('.lazyloaded')
        .then(el => {
            const heroImageUrl = el.prop('srcset');

            validateImageURL(heroImageUrl);
        });
});

When(`The homepage hero image should be clickable to open its page`, () => {
    const { heroImgLink } = home;

    cy.get(heroImgLink).then(el => {
        expect(el).to.be.visible;
        expect(el.prop('href')).not.to.be.undefined;
    });
});

When(`The homepage hero title should be clickable to open its page`, () => {
    const { heroTitleLink } = home;

    cy.get(heroTitleLink).then(el => {
        expect(el).to.be.visible;
        expect(el.prop('href')).not.to.be.undefined;
    });
});

When(`I should see {int} {string} teasers on the homepage with title and image clickable to their pages`, (number, pageSection) => {
    const { topTeasers, bottomTeasers } = home;

    switch (pageSection) {
        case 'top':
            cy.get(topTeasers).as('teaserList');
            cy.get('.home-section__featured .teaser--img-top img[srcset]').as('lazyLoadedTeaserImages');
            break;
        case 'bottom':
            cy.get(bottomTeasers).as('teaserList');
            cy.get('.repeatable-component .row:nth-child(1) .teaser--img-left img[data-srcset]').as('lazyLoadedTeaserImages');
            break;
    }

    cy.get('@teaserList')
        .then(el => {
            expect(el).to.have.length(number);

            return el;
        })
        .each(teaser => {
            cy.wrap(teaser)
                .as('currentTeaser')
                .scrollIntoView();

            cy.get('@currentTeaser')
                .find('.teaser__image')
                .then(imageAnchor => {
                    expect(imageAnchor.prop('href')).not.to.be.undefined;
                });

            cy.get('@currentTeaser')
                .find('.teaser__title > a')
                .then(teaserTitle => {
                    expect(teaserTitle.prop('href')).not.to.be.undefined;
                });

            cy.get('@currentTeaser')
                .find('img.lazyloaded')
                .eq(0)
                .then(teaserImage => {
                    expect(teaserImage).to.be.visible;
                });
        });

    cy.get('@lazyLoadedTeaserImages').each(teaserImage => {
        expect(teaserImage).to.be.visible;
        expect(teaserImage.prop('srcset')).not.to.be.undefined;
        validateImageURL(teaserImage.prop('srcset'));
    });
});


Then(`I should see the homepage hero source`, function() {
    const { heroSource } = home;

    cy.get(heroSource).then(el => {
        expect(el).to.be.visible;
    });
});

Then(`I should not see the homepage hero source`, function() {
    const { heroSource } = home;

    cy.get(heroSource).then(el => {
        expect(el).not.to.be.visible;
    });
});

