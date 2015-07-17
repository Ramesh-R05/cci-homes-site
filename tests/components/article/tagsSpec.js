import React from 'react';
import {betterMockComponentContext} from '@bxm/flux';
import Tags from '../../../app/components/article/tags';

const ComponentContext = betterMockComponentContext();
const TestUtils = ComponentContext.TestUtils;

describe(`ArticleTags`, () => {
    let reactModule;

    describe(`when passing tags that matches some of the filters`, () => {
        let renderedTags;
        let metaTag;
        const tags = [
            'homes:Audience:Designer',
            'homes:Building:Type:House',
            'homes:Building Type:Wrong',
            'homes:Interior:Decoration',
            'homes:Garden/Outdoor:Garden style:Arid garden',
            'homes:Garden/Outdoor:Foo',
            'homes:Topic:How To',
            'homes:Topic:Shopping'
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={tags} />);
            renderedTags = TestUtils.findRenderedDOMComponentWithClass(reactModule, `article__tags`);
            metaTag = TestUtils.findRenderedDOMComponentWithTag(reactModule, 'meta');
        });

        const expectedTags = 'Designer, House, Arid garden, How To';
        const expectedTagsWithTitle = `RELATED TAGS: ${expectedTags}`;
        it(`should have the rendered tags equal to '${expectedTagsWithTitle}'`, () => {
            expect(React.findDOMNode(renderedTags).textContent).to.equal(expectedTagsWithTitle);
        });

        const expectedItemProp = 'keywords';
        it(`should have the meta tag itemProp equal to '${expectedItemProp}'`, () => {
            expect(metaTag.props.itemProp).to.equal(expectedItemProp);
        });

        it(`should have the meta tag content equal to '${expectedTags}'`, () => {
            expect(metaTag.props.content).to.deep.equal(expectedTags);
        });
    });

    describe(`when passing tags that don't matches any of the filters`, () => {
        const tags = [
            'homes:Interior:Decoration',
            'homes:Outdoor:Foo'
        ];

        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags tags={tags} />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });

    describe(`without the tags prop`, () => {
        before(() => {
            reactModule = TestUtils.renderIntoDocument(<Tags />);
        });

        it('should not be rendered', () => {
            expect(React.findDOMNode(reactModule)).to.not.exist;
        });
    });
});
