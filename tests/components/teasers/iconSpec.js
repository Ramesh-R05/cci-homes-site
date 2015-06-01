import {betterMockComponentContext} from '@bxm/flux';
import feedDataMock from '../../mock/feed.json';
import staticConfigurationStore from '@bxm/ui/lib/to-love/stores/staticConfigurationStore';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const Icon = proxyquire('../../../app/components/teaser/icon', {
    'react': React,
    'react/addons': React
});

describe('TeaserIcon Component', () => {
    let reactModule;
    let icon;

    it('renders with the "video" icon', () => {
        reactModule = TestUtils.renderIntoDocument(<Icon video={{}}/>);
        icon = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__icon');
        expect(icon.props.dangerouslySetInnerHTML.__html).to.eq(Icon.videoIconSvg);
    });

    it('renders with the "video" icon', () => {
        reactModule = TestUtils.renderIntoDocument(<Icon nodeType="gallery"/>);
        icon = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__icon');
        expect(icon.props.dangerouslySetInnerHTML.__html).to.eq(Icon.galleryIconSvg);
    });

    it('returns null for unknown icons', () => {
        reactModule = TestUtils.renderIntoDocument(<Icon nodeType="waldo"/>);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'teaser__icon'))
            .to.have.length(0);
    });
});
