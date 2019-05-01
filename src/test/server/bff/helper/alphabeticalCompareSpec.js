import alphabeticalCompare from '../../../../app/server/bff/helper/alphabeticalCompare';

describe('alphabetical compare function', () => {
    describe('when itemA and itemB have no contentTitle property', () => {
        let result;

        before(() => {
            result = alphabeticalCompare({}, {});
        });

        it('should return 0', () => {
            expect(result).to.eq(0);
        });
    });

    describe('when itemA and itemB both have a contentTitle property', () => {
        describe('and the contentTitle of itemA comes before the content title of itemB in the alphabet', () => {
            let result;

            before(() => {
                result = alphabeticalCompare({ contentTitle: 'a' }, { contentTitle: 'b' });
            });

            it('should return -1', () => {
                expect(result).to.eq(-1);
            });
        });

        describe('and the contentTitle of itemB comes before the content title of itemA in the alphabet', () => {
            let result;

            before(() => {
                result = alphabeticalCompare({ contentTitle: 'b' }, { contentTitle: 'a' });
            });

            it('should return 1', () => {
                expect(result).to.eq(1);
            });
        });
    });
});
