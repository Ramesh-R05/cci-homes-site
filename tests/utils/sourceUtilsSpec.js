import * as sourceUtils from '../../app/utils/sourceUtils';

describe(`Source utils`, () => {
    describe(`normalise source`, () => {
        it(`strips out certain HTML entities`, () => {
            expect(sourceUtils.normalise(`cool characters:&amp;&lt;&gt;&quot;&#39;&#96;`))
                .to.eq(`cool-characters`);
        });

        it(`strips out invalid characters`, () => {
            expect(sourceUtils.normalise(`foo:bar+biz?baz`)).to.eq(`foobarbizbaz`);
        });

        it(`replaces whitespace and underscore characters with a single dash`, () => {
            expect(sourceUtils.normalise(`foo  bar\r\nbiz__baz`)).to.eq(`foo-bar-biz-baz`);
        });

        it(`strips accents`, () => {
            expect(sourceUtils.normalise(`Über Ångström`)).to.eq(`uber-angstrom`);
        });

        it(`makes everything lowercase`, () => {
            expect(sourceUtils.normalise(`AlPhAbEt`)).to.eq(`alphabet`);
        });
    });
});
