import {parseEntity, parseEntities} from '../../../../app/server/bff/helper/parseEntity';

const entityInput = {
    contentProfiles: 'author',
    contentBody: [
        {
            type: 'paragraph',
            label: "Paragraph",
            content: 'blah blha blah'
        },
        {
            type: "image",
            label: "Image",
            content: {
                url: "https://media.giphy.com/media/10rQojsTtZoU3S/giphy.gif",
                link: "http://testimagebody.com",
                title: "Test Body Image Title",
                caption: "Test Body Image Caption"
            }
        }
    ],
    pageDateCreated: 'created',
    contentNewsKeywords: ['keyword1', 'keyword2'],
    id: 'id',
    contentImageAltText: 'alt text',
    contentImageCaption: 'image caption',
    contentFacebookImageUrl: 'facebook img url',
    contentImageUrl: 'imageurl',
    nodeTypeAlias: 'node type',
    contentSummary: 'summary',
    articleSource: 'source',
    contentTags: 'tags',
    contentTitle: 'title',
    url: 'url',
    contentVideo: 'video',
    UnusedKey: 'blah'
};

const entityOutput = {
    authorProfiles: entityInput.contentProfiles,
    body: entityInput.contentBody,
    dateCreated: entityInput.pageDateCreated,
    googleNewsKeywords: entityInput.contentNewsKeywords,
    id: entityInput.id,
    imageAltText: entityInput.contentImageAltText,
    imageCaption: entityInput.contentImageCaption,
    imageFacebookUrl: entityInput.contentFacebookImageUrl,
    imageUrl: entityInput.contentImageUrl,
    nodeType: entityInput.nodeTypeAlias,
    summary: entityInput.contentSummary,
    source: entityInput.articleSource,
    tags: entityInput.contentTags,
    title: entityInput.contentTitle,
    url: entityInput.url,
    video: entityInput.contentVideo
};

describe('#parseEntity', () => {
    let entity;

    describe(`when passing an entity object`, () => {
        before(() => {
            entity = parseEntity(entityInput)
        });

        it('should return all required entity properties', ()=> {
            expect(entity).to.deep.equal(entityOutput);
        });

        it('should not contain data that is not needed - "UnusedKey"', ()=> {
            expect(entity).to.not.include.keys('UnusedKey');
        });
    });

    describe(`when passing an entity object and a custom mapped object`, () => {
        before(() => {
            entity = parseEntity(entityInput, {contentTitle: 'name'})
        });

        it('should return all required entity properties, also referencing the custom mapped object', ()=> {
            const output = {...entityOutput};
            output.name = entityInput.contentTitle;
            delete output.title;
            expect(entity).to.deep.equal(output);
        });
    });
});

describe('#parseEntities', () => {
    const entitiesInput = [entityInput, entityInput, entityInput];
    let entitiesOutput;
    let entities;

    describe(`when passing an array of entities`, () => {
        before(() => {
            entitiesOutput = [entityOutput, entityOutput, entityOutput];
            entities = parseEntities(entitiesInput);
        });

        it('should return all entities each with required entity properties', ()=> {
            expect(entities).to.deep.equal(entitiesOutput);
        });
    });

    describe(`when passing an array of entities and a custom mapped object`, () => {
        before(() => {
            const output = {...entityOutput};
            output.name = entityInput.contentTitle;
            delete output.title;
            entitiesOutput = [output, output, output];
            entities = parseEntities(entitiesInput, {contentTitle: 'name'});
        });

        it('should return all entities each with required entity properties', ()=> {
            expect(entities).to.deep.equal(entitiesOutput);
        });
    });
});
