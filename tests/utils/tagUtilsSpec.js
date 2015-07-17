import * as tagUtils from '../../app/utils/tagUtils';

describe('TagUtils', () => {

    describe('getTagName()', () => {
        it('get undefined when tag is not a String', () => {
            expect(tagUtils.getTagName([])).to.be.undefined;
        });

        it('should return the name of a tag', () => {
            expect(tagUtils.getTagName('homes:foo:bar')).to.eq('bar');
        });

        it('should return the name of a tag without a category', () => {
            expect(tagUtils.getTagName('homes:bar')).to.eq('bar');
        });

        it('should return the name of a tag with multiple categories', () => {
            expect(tagUtils.getTagName('homes:foo:baz:bar')).to.eq('bar');
        });

        it('should return the name of a tag with multiple categories', () => {
            expect(tagUtils.getTagName('bar')).to.eq('bar');
        });

        it('should return undefined when the tag is not a string', () => {
            expect(tagUtils.getTagCategory([])).to.be.undefined;
        });

        it('should return undefined when there is less than 3 elements', () => {
            expect(tagUtils.getTagCategory('foo:bar')).to.be.undefined;
        });

        it('should return the second element when there is 3 elements', () => {
            expect(tagUtils.getTagCategory('foo:bar:cat')).to.eq('bar');
        });

        it('should return the second element when there is more than 3 elements', () => {
            expect(tagUtils.getTagCategory('foo:bar:cat:dog')).to.eq('bar');
        });
    });

    describe('getCategoryFirstTag()', () => {
        it('should return the first tag with the provided category', () => {
            const tags = ['homes:Alpha:baz', 'homes:Beta:foo', 'homes:Beta:bar'];
            expect(tagUtils.getCategoryFirstTag(tags, 'Beta')).to.eql('homes:Beta:foo');
        });

        it('should skip invalid tags and yield the first matching tag', () => {
            const tags = [{}, 'homes:Foo:alpha'];
            expect(tagUtils.getCategoryFirstTag(tags, 'Foo')).to.eql('homes:Foo:alpha');
        });
    });

    describe('getTagsForCategory()', () => {
        it('should return an empty array when the tags are empty', () => {
            expect(tagUtils.getTagsForCategory([], 'Navigation')).to.eql([]);
        });

        it('should return undefined when the tags are not an array', () => {
            expect(tagUtils.getTagsForCategory({}, 'Navigation')).to.be.undefined;
        });

        it('should return undefined when the category is not a string', () => {
            expect(tagUtils.getTagsForCategory(['foo:Navigation:Alpha'], ['Navigation'])).to.be.undefined;
        });

        it('should return a collection of tags that match the provided category', () => {
            const tags = ['foo:Navigation:Alpha', 'foo:Ducky:Alpha', 'foo:Navigation:Beta'];
            expect(tagUtils.getTagsForCategory(tags, 'Navigation')).to.be.eql([
                'foo:Navigation:Alpha',
                'foo:Navigation:Beta'
            ]);
        });

        it('should return an empty array if none of the tags match the matching category', () => {
            const tags = ['foo:Navigation:Alpha', 'foo:Navigation:Beta'];
            expect(tagUtils.getTagsForCategory(tags, 'foo')).to.be.eql([]);
        });
    });

    describe('getFirstTagNameForCategory()', () => {
        it('should return undefined when the tags is not an Array ', () => {
            expect(tagUtils.getFirstTagNameForCategory('foo:bar:cat', 'foo')).to.be.undefined;
        });

        it('should return undefined when the category is not a String', () => {
            expect(tagUtils.getFirstTagNameForCategory(['foo:bar:cat'], [])).to.be.undefined;
        });

        it('should return undefined when the category is an empty string', () => {
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

    describe('getRelatedTags()', () => {
        it('should return an empty array when tags is not an array', () => {
            expect(tagUtils.getRelatedTags('', ['Topics'])).to.deep.equal([]);
        });

        it('should return an empty array when categories is not an array', () => {
            expect(tagUtils.getRelatedTags(['foo:bar:baz'], '')).to.deep.equal([]);
        });

        it('should return an empty array when tags is an empty array', () => {
            expect(tagUtils.getRelatedTags([], ['Topics'])).to.eql([]);
        });

        it('should return an empty array when categories is an empty array', () => {
            expect(tagUtils.getRelatedTags(['foo:bar:baz'], [])).to.eql([]);
        });

        it('should only return tags for specified categories', () => {
            const tags = ['homes:A:Bar', 'homes:B:Foo', 'homes:C:Baz'];
            const categories = [
                { category: 'A' },
                { category: 'C' }
            ];
            expect(tagUtils.getRelatedTags(tags, categories)).to.eql(['homes:A:Bar', 'homes:C:Baz']);
        });

        it('should not return more than one tags per category', () => {
            const tags = ['homes:A:Bar', 'homes:A:Foo', 'food:A:Baz'];
            const categories = [ { category: 'A' } ];
            expect(tagUtils.getRelatedTags(tags, categories)).to.eql(['homes:A:Bar']);
        });

        it(`should only return the tag name when the 'nameOnly' options is provided`, () => {
            const tags = ['homes:A:Bar', 'homes:B:Foo', 'homes:C:Baz'];
            const categories = [
                { category: 'A' },
                { category: 'C' }
            ];
            expect(tagUtils.getRelatedTags(tags, categories, { nameOnly: true })).to.eql(['Bar', 'Baz']);
        });

        it('should not return more than one tags per subcategory', () => {
            const tags = [
                'homes:A:A:Foo',
                'homes:A:B:C:Foo',
                'homes:A:B:Bar',
                'homes:A:C:Foo',
                'homes:A:Foo',
                'homes:B:A:Foo',
                'homes:B:Bar',
                'homes:C:Foo',
                'homes:D:Bar'
            ];
            const filters = [
                { category: 'A', subCategory: 'B'},
                { category: 'A', subCategory: 'C'},
                { category: 'B', subCategory: 'A'}
            ];
            const expectedResult = [
                'homes:A:B:C:Foo',
                'homes:A:C:Foo',
                'homes:B:A:Foo'
            ];
            expect(tagUtils.getRelatedTags(tags, filters)).to.eql(expectedResult);
        });

        it('should only return the tag specified in the filters', () => {
            const tags = [
                'homes:A:Foo',
                'homes:A:Bar',
                'homes:A:A:Foo',
                'homes:B:Foo',
                'homes:C:Foo'
            ];
            const filters = [{ category: 'A', tag: 'Foo'}];
            const expectedResult = ['homes:A:Foo'];
            expect(tagUtils.getRelatedTags(tags, filters)).to.eql(expectedResult);
        });

    });
});
