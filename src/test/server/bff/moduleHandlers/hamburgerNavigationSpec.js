import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const parseEntitiesStub = sinon.stub();

const hamburgerNavigation = proxyquire('../../../../app/server/bff/moduleHandlers/hamburgerNavigation', {
    '../helper/parseEntity': { parseEntities: parseEntitiesStub }
});

const mockModuleData = () => [
    {
        url: '/home-tours',
        tagsDetails: [[]],
        contentTitle: 'Home Tours',
        nodeTypeAlias: 'NavigationSection'
    },
    {
        url: '/diy-and-craft',
        tagsDetails: [[]],
        contentTitle: 'DIY & Craft',
        nodeTypeAlias: 'NavigationSection'
    },
    {
        url: '/rooms',
        tagsDetails: [[], [], [], [], [], []],
        contentTitle: 'Rooms',
        nodeTypeAlias: 'NavigationSection'
    }
];

function resetStubs() {
    parseEntitiesStub.reset();
}

describe('hamburgerNavigation module handler', () => {
    describe('handling hamburgernavigation module data', () => {
        const moduleData = mockModuleData();
        let returnValue;

        before(() => {
            parseEntitiesStub.withArgs(moduleData, { contentTitle: 'name' }).returns(moduleData);
            returnValue = hamburgerNavigation(moduleData);
        });

        after(() => {
            resetStubs();
        });

        it('calls parseEntities with the moduleData', () => {
            expect(parseEntitiesStub).to.be.calledWith(moduleData);
        });

        it('returns an object with the correct items', () => {
            expect(returnValue).to.deep.eq({
                items: [{ name: 'Home', url: '/' }, ...moduleData]
            });
        });
    });
    describe('error handling', () => {
        describe('when moduleResponse is not an array', () => {
            it('returns an object with items as an empty array', () => {
                expect(hamburgerNavigation({ key: 'value' })).to.deep.eq({
                    items: []
                });
            });
        });
    });
});
