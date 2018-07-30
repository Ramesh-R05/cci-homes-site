import { betterMockComponentContext } from '@bxm/flux';
import feedDataMock from '../../mock/feed';
import staticConfigurationStore from '@bxm/ui/lib/to-love/stores/staticConfigurationStore';

const Context = betterMockComponentContext();
const { React, ReactDOM, TestUtils } = Context;

const proxyquire = require('proxyquire').noCallThru();
const Icon = proxyquire('../../../app/components/teaser/icon', {
    react: React
});

describe('TeaserIcon Component', () => {
    let reactModule;
    let icon;

    it(`renders with the "video" icon when the video prop is provided`, () => {
        reactModule = TestUtils.renderIntoDocument(<Icon video={{}} />);
        icon = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__icon');
        expect(icon.props.dangerouslySetInnerHTML.__html).to.eq(Icon.videoIconSvg);
    });

    const nodeTypeProp = 'gallery';
    it(`renders with the "${nodeTypeProp}" icon when the nodeType prop is set to ${nodeTypeProp}`, () => {
        reactModule = TestUtils.renderIntoDocument(<Icon nodeType={nodeTypeProp} />);
        icon = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__icon');
        expect(icon.props.dangerouslySetInnerHTML.__html).to.eq(Icon.galleryIconSvg);
    });

    const iconPropGallery = 'gallery';
    it(`renders with the "${iconPropGallery}" icon when the icon prop is set to ${iconPropGallery}`, () => {
        reactModule = TestUtils.renderIntoDocument(<Icon icon={iconPropGallery} />);
        icon = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__icon');
        expect(icon.props.dangerouslySetInnerHTML.__html).to.eq(Icon.galleryIconSvg);
    });

    const iconPropVideo = 'video';
    it(`renders with the "${iconPropVideo}" icon when the icon prop is set to ${iconPropVideo}`, () => {
        reactModule = TestUtils.renderIntoDocument(<Icon icon={iconPropVideo} />);
        icon = TestUtils.findRenderedDOMComponentWithClass(reactModule, 'teaser__icon');
        expect(icon.props.dangerouslySetInnerHTML.__html).to.eq(Icon.videoIconSvg);
    });

    it('returns null for unknown icons', () => {
        reactModule = TestUtils.renderIntoDocument(<Icon nodeType="waldo" />);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(reactModule, 'teaser__icon')).to.have.length(0);
    });
});
