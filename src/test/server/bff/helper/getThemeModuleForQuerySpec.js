import getThemeModuleForQuery from '../../../../app/server/bff/helper/getThemeModuleForQuery';

describe('getThemeModuleForQuery helper function', () => {
    let query = {};

    describe('when url is home', () => {
        before(() => {
            query = {
                url: '/'
            };
        });
        it('should return a string of "hometheme"', () => {
            expect(getThemeModuleForQuery(query)).to.equal('hometheme');
        });
    });
    describe('when brand is set to belle', () => {
        before(() => {
            query = {
                brand: 'belle'
            };
        });
        it('should return a string of "belletheme"', () => {
            expect(getThemeModuleForQuery(query)).to.equal('belletheme');
        });
    });
    describe('when navSection set to home-tours', () => {
        before(() => {
            query = {
                navSection: 'home-tours'
            };
        });
        it('should return a string of "home-tourstheme"', () => {
            expect(getThemeModuleForQuery(query)).to.equal('home-tourstheme');
        });
    });
    describe('when tag is set to feature home', () => {
        before(() => {
            query = {
                tag: 'feature-home'
            };
        });
        it('should return a string of "belletheme"', () => {
            expect(getThemeModuleForQuery(query)).to.equal('feature-hometheme');
        });
    });
    describe('when url is not home and brand/tag/navsection are not in query', () => {
        before(() => {
            query = {};
        });
        it('should return theme', () => {
            expect(getThemeModuleForQuery(query)).to.equal('theme');
        });
    });
});
