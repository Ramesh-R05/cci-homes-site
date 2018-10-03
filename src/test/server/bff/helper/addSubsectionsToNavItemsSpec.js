import addSubsectionsToNavItem from '../../../../app/server/bff/helper/addSubsectionsToNavItem';

const navItemMock = {
    url: '/rooms',
    tagsDetails: [
        {
            displayName: 'homes',
            urlName: '/homes'
        },
        {
            displayName: 'kitchen',
            urlName: '/kitchen'
        },
        {
            displayName: 'bathroom',
            urlName: '/bathroom'
        }
    ],
    contentTitle: 'Rooms',
    nodeTypeAlias: 'NavigationSection'
};

describe('addSubsectionsToNavItem', () => {
    describe('with includeUrl set to false', () => {
        let returnValue;

        before(() => {
            returnValue = addSubsectionsToNavItem(navItemMock, false);
        });

        it('should set the url to null', () => {
            expect(returnValue.url).to.eq(null);
        });
    });
    describe('when an item has multiple tags', () => {
        let returnValue;

        before(() => {
            returnValue = addSubsectionsToNavItem(navItemMock);
        });

        it('should have subsections equal to the length of tags', () => {
            expect(returnValue.tagsDetails.length).to.eq(returnValue.subsections.length);
        });

        it('should turn the tags into subsections', () => {
            expect(returnValue.subsections).to.deep.eq([
                {
                    contentTitle: 'homes',
                    url: '/homes'
                },
                {
                    contentTitle: 'kitchen',
                    url: '/kitchen'
                },
                {
                    contentTitle: 'bathroom',
                    url: '/bathroom'
                }
            ]);
        });
    });
    describe('error handling', () => {
        describe('when passed an item without tags', () => {
            let returnValue;
            const mockWithoutTags = { ...navItemMock };
            delete mockWithoutTags.tagsDetails;

            before(() => {
                returnValue = addSubsectionsToNavItem(mockWithoutTags);
            });

            it('should return an unmodified item', () => {
                expect(returnValue).to.deep.eq(mockWithoutTags);
            });
        });
    });
});
