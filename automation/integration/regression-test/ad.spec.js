const selectors = {
    topLeaderboard: '.section__heading .section__heading-ad .ad--section-top-leaderboard [id^=ad-gpt-slot-]',
    middleLeaderboard: '.site-wrapper .ad--section-middle-leaderboard [id^=ad-gpt-slot-]',
    bottomLeaderboard: '.site-wrapper .ad--section-bottom-leaderboard [id^=ad-gpt-slot-]',
    mrec: '.ad--section-mrec',
    sectionTopFeedStickyMrec: '.navigationsection_rhs_1',
    sectionBottomFeedStickyMrec: '.navigationsection_rhs_2'
};

describe('[@ad] [@homes] ads on index pages', () => {
    describe('verify index pages', () => {
        describe('on mobile', () => {
            describe('[@brand] [@med] viewing brand section page', () => {
                beforeEach(() => {
                    cy.resizeWindow('mobile').visit('/australian-house-and-garden');
                });

                it('has leaderboard slots at the top middle and bottom', () => {
                    const { topLeaderboard, middleLeaderboard, bottomLeaderboard } = selectors;

                    cy.get(topLeaderboard)
                        .scrollIntoView()
                        .should('be.visible')
                        .and('be.inViewport')
                        .get(middleLeaderboard)
                        .scrollIntoView()
                        .should('be.visible')
                        .and('be.inViewport')
                        .get(bottomLeaderboard)
                        .scrollIntoView()
                        .should('be.visible')
                        .and('be.inViewport');
                });

                it('has the correct number of mrecs ad slots before clicking load more', () => {
                    const { mrec } = selectors;

                    const expectedMrecs = 2;

                    cy.get(mrec)
                        .as('mrecAdList')
                        .its('length')
                        .should('eq', expectedMrecs)
                        .get('@mrecAdList')
                        .each(singleMrecAd => {
                            cy.wrap(singleMrecAd)
                                .scrollIntoView()
                                .should('be.visible');
                        });
                });

                it('has the correct number of mrecs after clicking load more', () => {
                    const { mrec } = selectors;
                    const expectedMrecs = 3;

                    cy.get('.load-more > .button')
                        .scrollIntoView()
                        .click()
                        .get(':nth-child(2) > .section__list > .row .teaser')
                        .each(teaser => {
                            cy.wrap(teaser).scrollIntoView();
                        })
                        .get(mrec)
                        .its('length')
                        .should('eq', expectedMrecs);
                });
            });

            describe('[@homepage] [@med] viewing homepage', () => {
                beforeEach(() => {
                    cy.resizeWindow('mobile').visit('/');
                });

                it('has leaderboard slots at the top middle and bottom', () => {
                    const { topLeaderboard, middleLeaderboard, bottomLeaderboard } = selectors;

                    cy.get(topLeaderboard)
                        .scrollIntoView()
                        .should('be.visible')
                        .get(middleLeaderboard)
                        .scrollIntoView()
                        .should('be.visible')
                        .get(bottomLeaderboard)
                        .scrollIntoView()
                        .should('be.visible');
                });

                it('has the correct number of mrecs ad slots before clicking load more', () => {
                    const { mrec } = selectors;
                    const expectedMrecs = 2;

                    cy.get(mrec)
                        .as('mrecAdList')
                        .its('length')
                        .should('eq', expectedMrecs)
                        .get('@mrecAdList')
                        .each(singleMrecAd => {
                            cy.wrap(singleMrecAd)
                                .scrollIntoView()
                                .should('be.visible');
                        });
                });

                it('has the correct number of mrecs after clicking load more', () => {
                    const { mrec } = selectors;
                    const expectedMrecs = 3;

                    cy.get('.load-more > .button')
                        .scrollIntoView()
                        .click()
                        .get(':nth-child(2) > .section__list > .row .teaser')
                        .each(teaser => {
                            cy.wrap(teaser).scrollIntoView();
                        })
                        .get(mrec)
                        .its('length')
                        .should('eq', expectedMrecs);
                });
            });
        });

        describe('on tablet landscape', () => {
            describe('[@section] [@med] viewing navigation tag section page', () => {
                beforeEach(() => {
                    cy.resizeWindow('tablet landscape').visit('/real-homes');
                });

                it('has leaderboard slots at the top middle and bottom', () => {
                    const { topLeaderboard, middleLeaderboard, bottomLeaderboard } = selectors;

                    cy.get(topLeaderboard)
                        .scrollIntoView()
                        .should('be.visible')
                        .get(middleLeaderboard)
                        .scrollIntoView()
                        .should('be.visible')
                        .get(bottomLeaderboard)
                        .scrollIntoView()
                        .should('be.visible');
                });

                it('has a sticky MREC ad next to the top and bottom feed', () => {
                    const { sectionTopFeedStickyMrec, sectionBottomFeedStickyMrec } = selectors;

                    cy.get(sectionTopFeedStickyMrec)
                        .as('stickyMrecTop')
                        .scrollIntoView()
                        .should('be.visible')
                        .get('.section__featured .teaser')
                        .last()
                        .scrollIntoView({ duration: 2000 })
                        .get('@stickyMrecTop')
                        .should('be.visible')
                        .and('be.inViewport')
                        .get(sectionBottomFeedStickyMrec)
                        .as('stickyMrecBottom')
                        .scrollIntoView()
                        .should('be.visible')
                        .and('be.inViewport')
                        .get('.section__list > .row .teaser')
                        .last()
                        .scrollIntoView({ duration: 2000 })
                        .get('@stickyMrecBottom')
                        .should('be.visible')
                        .and('be.inViewport');
                });

                it('has the correct number of mrecs after clicking load more', () => {
                    const { mrec } = selectors;
                    const expectedMrecs = 3;

                    cy.get('.load-more > .button')
                        .scrollIntoView()
                        .click()
                        .get(':nth-child(2) > .section__list > .row .teaser')
                        .each(teaser => {
                            cy.wrap(teaser).scrollIntoView();
                        })
                        .get(mrec)
                        .its('length')
                        .should('eq', expectedMrecs);
                });
            });
        });

        describe.only('on tablet portrait', () => {
            describe('[@section] [@med] viewing navigation tag section page', () => {
                beforeEach(() => {
                    cy.resizeWindow('tablet portrait').visit('/real-homes');
                });

                it('has leaderboard slots at the top middle and bottom', () => {
                    const { topLeaderboard, middleLeaderboard, bottomLeaderboard } = selectors;

                    cy.get(topLeaderboard)
                        .scrollIntoView()
                        .should('be.visible')
                        .and('be.inViewport')
                        .get(middleLeaderboard)
                        .scrollIntoView()
                        .should('be.visible')
                        .and('be.inViewport')
                        .get(bottomLeaderboard)
                        .scrollIntoView()
                        .should('be.visible')
                        .and('be.inViewport');
                });

                it('has the correct number of mrecs ad slots before clicking load more', () => {
                    const { mrec } = selectors;
                    const expectedMrecs = 4;

                    cy.get(mrec)
                        .as('mrecAdList')
                        .its('length')
                        .should('eq', expectedMrecs)
                        .get('@mrecAdList')
                        .each(singleMrecAd => {
                            cy.wrap(singleMrecAd)
                                .scrollIntoView()
                                .should('be.visible');
                        });
                });

                it('has the correct number of mrecs after clicking load more', () => {
                    const { mrec } = selectors;
                    const expectedMrecs = 6;

                    cy.get('.load-more > .button')
                        .scrollIntoView()
                        .click()
                        .get(':nth-child(2) > .section__list > .row .teaser')
                        .each(teaser => {
                            cy.wrap(teaser).scrollIntoView();
                        })
                        .get(mrec)
                        .its('length')
                        .should('eq', expectedMrecs);
                });
            });
        });

        describe('on desktop', () => {
            describe('[@homepage] [@high] viewing homepage', () => {
                before(() => {
                    cy.visit('/').resizeWindow('desktop');
                });

                it('has leaderboard slots at the top middle and bottom');
                it('has a sticky MREC ad next to the top and bottom feed');
                it('has the correct number of mrecs after clicking load more');
            });

            describe('[@brand] [@med] viewing brand section page', () => {
                before(() => {
                    cy.visit('/australian-house-and-garden').resizeWindow('desktop');
                });

                it('has leaderboard slots at the top middle and bottom');
                it('has a sticky MREC ad next to the top and bottom feed');
                it('has the correct number of mrecs after clicking load more');
            });
        });
    });

    describe('verify content pages', () => {
        describe('on mobile', () => {
            describe('[@article] [@med] viewing article page', () => {
                before(() => {
                    cy.visit('/automation-test-article-with-hero-image-3193').resizeWindow('mobile');
                });

                it('has the top leadboard ad below the main site navigation');
                it('has the MREC underneath the hero image');
                it('has the MREC above the recommendations module');
                it('has the leaderboard above the footer');
            });
        });

        describe('on tablet portrait', () => {
            describe('[@gallery] [@med] viewing gallery page', () => {
                before(() => {
                    cy.visit('/automation-test-gallery-3201').resizeWindow('tablet portrait');
                });

                it('has the top leadboard ad below the main site navigation');
                it('does not have the MREC underneath the hero image');
                it('has the MREC above the recommendations module');
                it('has the MREC ads between images at the right frequency');
                it('has the leaderboard above the footer');
            });
        });

        describe('on tablet landscape', () => {
            describe('[@gallery] [@med] viewing gallery page', () => {
                before(() => {
                    cy.visit('/automation-test-article-with-hero-image-3193').resizeWindow('tablet landscape');
                });

                it('has the top leaderboard unfer the main site navigation');
                it('has the bottom leaderboard above the footer');
                it('does not have the MREC under the hero image or recommendations');
            });
        });

        describe('on desktop', () => {
            describe('[@gallery] [@high] viewing gallery page', () => {
                before(() => {
                    cy.visit('/automation-test-gallery-3201').resizeWindow('desktop');
                });

                it('has the top leaderboard unfer the main site navigation');
                it('has the bottom leaderboard above the footer');
                it('does not have the MREC under the hero image or recommendations');
            });
        });
    });

    describe('verify wallpaper', () => {
        describe('on desktop', () => {
            describe('[@brand] [@med] viewing brand section page', () => {
                before(() => {
                    cy.visit('/australian-house-and-garden').resizeWindow('desktop');
                });

                it('has the wallpaper ad visible');
            });
        });
    });

    describe('verify side panel', () => {
        describe('[@brand] [@med] viewing brand section page', () => {
            before(() => {
                cy.visit('/belle').resizeWindow('desktop');
            });

            it('has the side panel ads visible');
        });
    });
});
