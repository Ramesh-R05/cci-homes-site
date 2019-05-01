import transformListingGalleries from '../../../../app/server/bff/helper/transformListingGalleries';
import listingMock from '../../../mock/listing';

describe('transformListingGalleries function', () => {
    describe('when galleries is not passed', () => {
        let result;

        before(() => {
            result = transformListingGalleries();
        });

        it('returns an empty array', () => {
            expect(result).to.be.empty;
        });
    });

    describe('when galleries array is passed', () => {
        describe('and one of the galleries is empty', () => {
            let result;
            let args;

            before(() => {
                args = [...listingMock.galleries]; // listingMock.galleries[1] has no items
                result = transformListingGalleries(args);
            });

            it('returns an array of the galleries with items', () => {
                expect(result.length).to.eq(1);
            });
        });

        describe('and all of the galleries are empty', () => {
            it('returns an empty array', () => {
                let result;
                let args;

                before(() => {
                    args = [
                        {
                            ...listingMock.galleries,
                            galleryItems: '[]' // galleryItems are stringified JSON
                        }
                    ];
                    result = transformListingGalleries(args);
                });

                it('returns an empty array', () => {
                    expect(result).to.be.empty;
                });
            });
        });

        describe('and all of the galleries have items', () => {
            let result;
            let args;

            before(() => {
                args = [
                    { ...listingMock.galleries[0] },
                    {
                        id: '1234',
                        name: 'bar',
                        galleryItems: [{ url: 'http://google.com', caption: 'test caption' }]
                    }
                ];
                result = transformListingGalleries(args);
            });

            it('returns an array of the galleries with items', () => {
                expect(result).to.have.length(args.length);
            });

            it('returns a reduced array of galleries with a top level image, url, id, name, caption and galleryItems keys', () => {
                result.forEach((gallery, index) => {
                    const { galleryItems } = args[index];

                    expect(gallery).to.deep.eq({
                        url: galleryItems[0].url,
                        id: args[index].id,
                        name: args[index].name,
                        caption: galleryItems[0].caption,
                        galleryItems
                    });
                });
            });

            it('every item returned has a galleryItems array that is not empty', () => {
                result.forEach(gallery => {
                    expect(gallery.galleryItems).not.to.have.length(0);
                });
            });
        });
    });
});
