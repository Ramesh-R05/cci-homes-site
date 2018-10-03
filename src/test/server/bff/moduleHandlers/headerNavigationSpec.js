import proxyquire, { noCallThru } from 'proxyquire';
noCallThru();

const parseEntitiesStub = sinon.stub();
const addSubsectionsToNavItemStub = sinon.stub();

const headerNavigation = proxyquire('../../../../app/server/bff/moduleHandlers/headerNavigation', {
    '../helper/parseEntity': { parseEntities: parseEntitiesStub },
    '../helper/addSubsectionsToNavItem': addSubsectionsToNavItemStub
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
    addSubsectionsToNavItemStub.reset();
}

describe('headerNavigation module handler', () => {
    describe('handling headernavigation module data', () => {
        const moduleData = mockModuleData();
        let returnValue;

        before(() => {
            parseEntitiesStub.withArgs(moduleData, { contentTitle: 'name' }).returns(moduleData);
            addSubsectionsToNavItemStub
                .onFirstCall()
                .returns(moduleData[0])
                .onSecondCall()
                .returns(moduleData[1])
                .onThirdCall()
                .returns(moduleData[2]);
            returnValue = headerNavigation(moduleData);
        });

        after(() => {
            resetStubs();
        });

        it('calls parseEntities with the moduleData', () => {
            expect(parseEntitiesStub).to.be.calledWith(moduleData);
        });

        it(`calls addSubSectionsToNavItem ${moduleData.length} times`, () => {
            expect(addSubsectionsToNavItemStub.callCount).to.eq(moduleData.length);
        });

        it('calls addSubsectionsToNavItem on every member of the array', () => {
            moduleData.forEach((item, i) => {
                expect(addSubsectionsToNavItemStub.args[i][0]).to.deep.eq(item);
            });
        });

        it('returns an object with the correct items', () => {
            expect(returnValue).to.deep.eq({
                items: moduleData
            });
        });
    });
    describe('error handling', () => {
        describe('when moduleResponse is not an array', () => {
            it('returns an object with items as an empty array', () => {
                expect(headerNavigation({ key: 'value' })).to.deep.eq({
                    items: []
                });
            });
        });
    });
});
