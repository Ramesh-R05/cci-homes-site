import theme from '../../../../app/server/bff/moduleHandlers/theme';

describe('theme module handler', () => {
    describe('handling theme module data', () => {
        const themeData = {
            backgroundImage: 'url'
        };
        let returnValue;

        before(() => {
            returnValue = theme(themeData);
        });

        it('returns the theme module data', () => {
            expect(returnValue).to.deep.eq(themeData);
        });
    });
});
