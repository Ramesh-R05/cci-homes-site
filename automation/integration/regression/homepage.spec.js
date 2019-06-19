import { validateImageURL } from '@bxm/automation';
import brand_listing from '../../features/support/page_objects/brand_listing_widget';
import home from '../../features/support/page_objects/homepage_widget';
import loadMore from '../../features/support/page_objects/loadmore_widget';
import sectionPage from '../../features/support/page_objects/section_page';

function verifyTopTeasers() {
    const { topTeasers } = home;

    cy.get(topTeasers).as('teaserList');
    cy.get('.home-section__featured .teaser--img-top > a img').as('lazyLoadedTeaserImages');

    cy.get('@teaserList')
        .then(el => {
            expect(el).to.have.length(6);

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
                .should('have.attr', 'href');

            cy.get('@currentTeaser')
                .find('img.lazyloaded')
                .eq(0)
                .should('be.visible');
        });

    cy.get('@lazyLoadedTeaserImages').each(teaserImage => {
        expect(teaserImage).to.be.visible;
        expect(teaserImage.prop('srcset')).not.to.be.undefined;
        validateImageURL(teaserImage.prop('srcset'));
    });
}

function verifyBottomTeasers() {
    const { bottomTeasers } = home;

    cy.get(bottomTeasers).as('teaserList');
    cy.get('.repeatable-component .row:nth-child(1) .teaser--img-left img[data-srcset]').as('lazyLoadedTeaserImages');

    cy.get('@teaserList')
        .then(el => {
            expect(el).to.have.length(6);

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
                .should('have.attr', 'href');

            cy.get('@currentTeaser')
                .find('img.lazyloaded')
                .eq(0)
                .should('be.visible');
        });

    cy.get('@lazyLoadedTeaserImages').each(teaserImage => {
        expect(teaserImage).to.be.visible;
        expect(teaserImage.prop('srcset')).not.to.be.undefined;
        validateImageURL(teaserImage.prop('srcset'));
    });
}

function verifyLoadMore() {
    const { loadMoreButton } = loadMore;
    const { sectionRepeatableSectionTeaserAfterLoadMore } = sectionPage;

    cy.get(loadMoreButton)
        .scrollIntoView()
        .click()
        .get(sectionRepeatableSectionTeaserAfterLoadMore)
        .as('loadMoreTeasers')
        .its('length')
        .should('eq', 12)
        .get('@loadMoreTeasers')
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
                .should('have.attr', 'href');

            cy.get('@currentTeaser')
                .find('img.lazyloaded')
                .eq(0)
                .should('be.visible');
        });
}

describe('[@homepage] As a user, I should be able to see a homepage', () => {
    before('when I am currently viewing the homepage', () => {
        cy.visit('/');
    });

    describe('verify sign up button', () => {
        describe('[@med] on mobile', () => {
            before(() => {
                cy.resizeWindow('mobile');
            });

            it('contains the correct url', () => {
                const { newsletterSignUpBtnMobile } = brand_listing;

                cy.get(newsletterSignUpBtnMobile)
                    .scrollIntoView()
                    .then(subscribeLinkContainer => {
                        expect(subscribeLinkContainer).to.be.visible;
                        expect(
                            subscribeLinkContainer
                                .find('.newsletter-subscribe__button')
                                .find('.button')
                                .prop('href')
                        ).to.contain('//www.homestolove.com.au/homes-newsletter/');
                    });
            });
        });

        describe('[@low] on tablet portrait', () => {
            before(() => {
                cy.resizeWindow('tablet portrait');
            });

            it('contains the correct url', () => {
                const { newsletterSignUpBtnMobile } = brand_listing;

                cy.get(newsletterSignUpBtnMobile)
                    .scrollIntoView()
                    .then(subscribeLinkContainer => {
                        expect(subscribeLinkContainer).to.be.visible;
                        expect(
                            subscribeLinkContainer
                                .find('.newsletter-subscribe__button')
                                .find('.button')
                                .prop('href')
                        ).to.contain('//www.homestolove.com.au/homes-newsletter/');
                    });
            });
        });

        describe('[@med] on desktop', () => {
            before(() => {
                cy.resizeWindow('desktop');
            });

            it('contains the correct url', () => {
                const { newsletterSignUpBtnDesktop } = brand_listing;

                cy.get(newsletterSignUpBtnDesktop)
                    .scrollIntoView()
                    .then(subscribeLinkContainer => {
                        expect(subscribeLinkContainer).to.be.visible;
                        expect(
                            subscribeLinkContainer
                                .find('.newsletter-subscribe__button')
                                .find('.button')
                                .prop('href')
                        ).to.contain('//www.homestolove.com.au/homes-newsletter/');
                    });
            });
        });
    });

    describe('verify hero content', () => {
        describe('[@med] on mobile', () => {
            beforeEach(() => {
                cy.resizeWindow('mobile');
            });

            it('has a title and image visible and clickable to its page', () => {
                const { heroElmt } = home;

                cy.get(heroElmt).as('homePageHero');

                cy.get('@homePageHero').then(el => {
                    expect(el).to.be.visible;

                    expect(el.find('.teaser__title > a').prop('href')).not.to.be.undefined;
                });
            });

            it('does not have a source', () => {
                const { heroSource } = home;

                cy.get(heroSource).should('not.be.visible');
            });
        });

        describe('[@high] on desktop', () => {
            beforeEach(() => {
                cy.resizeWindow('desktop');
            });

            it('has a title and image image visible and clickable to its page', () => {
                const { heroElmt } = home;

                cy.get(heroElmt).as('homePageHero');

                cy.get('@homePageHero')
                    .should('be.visible')
                    .find('img[data-srcset]')
                    .should('be.visible')
                    .get('@homePageHero')
                    .find('.teaser__title > a')
                    .should('be.visible')
                    .and('have.attr', 'href');
            });

            it('has a visible source linkable to the brand page', () => {
                const { heroSource } = home;

                cy.get(heroSource).should('be.visible');
            });
        });
    });

    describe('verify top bottom and load more teaser items', () => {
        describe('[@med] mobile portrait', () => {
            beforeEach(() => {
                cy.resizeWindow('mobile portrait');
            });

            it('has 6 top teasers with visible and linkable images, titles and sources', () => {
                verifyTopTeasers();
            });

            it('has 6 bottom teasers with visible and linkable images, titles and sources', () => {
                verifyBottomTeasers();
            });

            it('has 12 extra teasers with visible and linkable images titles and sources after clicking load more', () => {
                verifyLoadMore();
            });
        });

        describe('[@low] tablet portrait', () => {
            beforeEach(() => {
                cy.resizeWindow('tablet portrait');
            });

            it('has 6 top teasers with visible and linkable images, titles and sources', () => {
                verifyTopTeasers();
            });

            it('has 6 bottom teasers with visible and linkable images, titles and sources', () => {
                verifyTopTeasers();
            });

            it('has 12 extra teasers with visbile and linkable images titles and sources after clicking load more', () => {
                verifyTopTeasers();
            });
        });

        describe('[@med] desktop', () => {
            beforeEach(() => {
                cy.resizeWindow('desktop');
            });

            it('has 6 top teasers with visible and linkable images, titles and sources', () => {
                verifyTopTeasers();
            });

            it('has 6 bottom teasers with visible and linkable images, titles and sources', () => {
                verifyTopTeasers();
            });

            it('has 12 extra teasers with visbile and linkable images titles and sources after clicking load more', () => {
                verifyTopTeasers();
            });
        });
    });
});
