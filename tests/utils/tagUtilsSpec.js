import tagUtils from '../../app/utils/tagUtils';

describe('TagUtils', () => {

    describe('geTagName(tag)', () => {
        it('get undefined when tag is not a String', () => {
            expect(tagUtils.getTagName([])).to.be.undefined;
        });

        it('gets the name of a tag', () => {
            expect(tagUtils.getTagName('homes:foo:bar')).to.eq('bar');
        });

        it('gets the name of a tag without a category', () => {
            expect(tagUtils.getTagName('homes:bar')).to.eq('bar');
        });

        it('gets the name of a tag with multiple categories', () => {
            expect(tagUtils.getTagName('homes:foo:baz:bar')).to.eq('bar');
        });

        it('gets the name of a tag with multiple categories', () => {
            expect(tagUtils.getTagName('bar')).to.eq('bar');
        });
    });

    describe('getTagCategory(tag)', () => {
        it('get undefined when the tag is not a string', () => {
            expect(tagUtils.getTagCategory([])).to.be.undefined;
        });

        it('get undefined when there is less than 3 elements', () => {
            expect(tagUtils.getTagCategory('foo:bar')).to.be.undefined;
        });

        it('get the second element when there is 3 elements', () => {
            expect(tagUtils.getTagCategory('foo:bar:cat')).to.eq('bar');
        });

        it('get the second element when there is more than 3 elements', () => {
            expect(tagUtils.getTagCategory('foo:bar:cat:dog')).to.eq('bar');
        });
    });

    describe('getCategoryFirstTagName(category, tags)', () => {
        it('get undefined when the tags is not an Array ', () => {
            expect(tagUtils.getFirstTagNameForCategory('foo:bar:cat', 'foo')).to.be.undefined;
        });

        it('get undefined when the category is not a String', () => {
            expect(tagUtils.getFirstTagNameForCategory(['foo:bar:cat'], [])).to.be.undefined;
        });

        it('get undefined when the category is an empty string', () => {
            expect(tagUtils.getFirstTagNameForCategory(['foo:bar:cat'], '')).to.be.undefined;
        });

        it('should return the name of the first tag with the provided category', () => {
            const tags = ['homes:Alpha:baz', 'homes:Beta:foo', 'homes:Beta:bar'];
            expect(tagUtils.getFirstTagNameForCategory(tags, 'Beta')).to.eq('foo');
        });

        it('should skip invalid tags and yield the first matching tag', () => {
            const tags = [{}, 'homes:Foo:alpha'];
            expect(tagUtils.getFirstTagNameForCategory(tags, 'Foo')).to.eq('alpha');
        });
    });

    describe('getRelatedTags(tags, categories', () => {

        it('should return undefined when tags is not an array', () => {
            expect(tagUtils.getRelatedTags('', ['Topics'])).to.be.undefined;
        });

        it('should return undefined when categories is not an array', () => {
            expect(tagUtils.getRelatedTags(['foo:bar:baz'], '')).to.be.undefined;
        });

        it('should return an empty array when tags is an empty array', () => {
            expect(tagUtils.getRelatedTags([], ['Topics'])).to.eql([]);
        });

        it('should return an empty array when categories is an empty array', () => {
            expect(tagUtils.getRelatedTags(['foo:bar:baz'], [])).to.eql([]);
        });

        it('should only return tags for specified categories', () => {
            const tags = ['homes:A:Bar', 'homes:B:Foo', 'homes:C:Baz'];
            const categories = ['A', 'C'];
            expect(tagUtils.getRelatedTags(tags, categories)).to.eql(['homes:A:Bar', 'homes:C:Baz']);
        });

        it('should not return more than one tags per category', () => {
            const tags = ['homes:A:Bar', 'homes:A:Foo', 'food:A:Baz'];
            const categories = ['A'];
            expect(tagUtils.getRelatedTags(tags, categories)).to.eql(['homes:A:Bar']);
        });

    });
});
