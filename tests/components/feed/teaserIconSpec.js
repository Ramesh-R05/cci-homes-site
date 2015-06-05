import {betterMockComponentContext} from '@bxm/flux';
import feedDataMock from '../../mock/feed.json';
import staticConfigurationStore from '@bxm/ui/lib/to-love/stores/staticConfigurationStore';

const Context = betterMockComponentContext();
const React = Context.React;
const TestUtils = Context.TestUtils;

const proxyquire = require('proxyquire').noCallThru();
const TeaserIcon = proxyquire('../../../app/components/feed/teaserIcon', {
    'react': React,
    'react/addons': React
});

describe('TeaserIcon Component', () => {
    let reactModule;
    let icon;

    it('renders with the "video" icon', () => {
        reactModule = TestUtils.renderIntoDocument(<TeaserIcon type="video"/>);
        icon = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser-icon');
        expect(icon.props.dangerouslySetInnerHTML.__html).to.eq(TeaserIcon.videoIconSvg);
    });

    it('renders with the "video" icon', () => {
        reactModule = TestUtils.renderIntoDocument(<TeaserIcon type="gallery"/>);
        icon = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser-icon');
        expect(icon.props.dangerouslySetInnerHTML.__html).to.eq(TeaserIcon.galleryIconSvg);
    });

    it('returns null for unknown icons', () => {
        reactModule = TestUtils.renderIntoDocument(<TeaserIcon type="waldo"/>);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'teaser-icon'))
            .to.have.length(0);
    });
});
