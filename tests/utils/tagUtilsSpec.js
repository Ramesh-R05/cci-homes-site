import * as tagUtils from '../../app/utils/tagUtils';

describe('TagUtils', () => {

    describe('get a single tag name', () => {
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

    describe('get a single tag category', () => {
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

    describe('get the first tag with the specified category', () => {
        it('should return the first tag with the provided category', () => {
            const tags = ['homes:Alpha:baz', 'homes:Beta:foo', 'homes:Beta:bar'];
            expect(tagUtils.getCategoryFirstTag(tags, 'Beta')).to.eql('homes:Beta:foo');
        });

        it('should skip invalid tags and yield the first matching tag', () => {
            const tags = [{}, 'homes:Foo:alpha'];
            expect(tagUtils.getCategoryFirstTag(tags, 'Foo')).to.eql('homes:Foo:alpha');
        });
    });

    describe('get the tags with the provided category', () => {
        it('returns empty array when the tags are empty', () => {
            expect(tagUtils.getTagsForCategory([], 'Navigation')).to.eql([]);
        });

        it('returns undefined when the tags are not an array', () => {
            expect(tagUtils.getTagsForCategory({}, 'Navigation')).to.be.undefined;
        });

        it('returns undefined when the category is not a string', () => {
            expect(tagUtils.getTagsForCategory(['foo:Navigation:Alpha'], ['Navigation'])).to.be.undefined;
        });

        it('returns a collection of tags that match the provided category', () => {
            const tags = ['foo:Navigation:Alpha', 'foo:Ducky:Alpha', 'foo:Navigation:Beta'];
            expect(tagUtils.getTagsForCategory(tags, 'Navigation')).to.be.eql([
                'foo:Navigation:Alpha',
                'foo:Navigation:Beta'
            ]);
        });

        it('returns an empty array if none of the tags match the matching category', () => {
            const tags = ['foo:Navigation:Alpha', 'foo:Navigation:Beta'];
            expect(tagUtils.getTagsForCategory(tags, 'foo')).to.be.eql([]);
        });
    });

    describe('get the name of the first tag with the specified category', () => {
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

    describe('get one tag for each of the provided categories', () => {
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
