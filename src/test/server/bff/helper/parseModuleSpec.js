import {parseModules} from '../../../../app/server/bff/helper/parseModule';
import {parseEntities} from '../../../../app/server/bff/helper/parseEntity';

const module1 = {
    id: 'MODULE-123',
    moduleName: 'module1',
    moduleManualContent: {
        totalCount: 2,
        data: [
            {
                id: 'module1-111',
                url: '/module1/111',
                contentTitle: 'Module 1 Title 1',
                nodeTypeAlias: 'Gallery',
                contentSummary: "some content 111",

            },
            {
                id: 'module1-222',
                url: '/module1/222',
                contentTitle: 'Module 1 Title 2',
                nodeTypeAlias: 'Article',
                contentSummary: "some content 222",
            }
        ]
    }
};

const module2 = {
    id: 'MODULE-234',
    moduleName: 'module2',
    moduleManualContent: {
        totalCount: 3,
        data: [
            {
                id: 'module2-111',
                url: '/module2/111',
                contentTitle: 'Module 2 Title 1',
                nodeTypeAlias: 'Gallery',
                contentSummary: "some more content 111",

            },
            {
                id: 'module2-222',
                url: '/module2/222',
                contentTitle: 'Module 2 Title 2',
                nodeTypeAlias: 'Article',
                contentSummary: "some more content 222",
            },
            {
                id: 'module2-333',
                url: '/module2/333',
                contentTitle: 'Module 2 Title 3',
                nodeTypeAlias: 'Article',
                contentSummary: "some more content 333",
            }
        ]
    }
};

const moduleInput = {
    totalCount: 2,
    data: [
        module1,
        module2
    ]
};

const exptedModules = {
    module1: {
        module: {
            id: module1.id,
            storeName: module1.moduleName
        },
        items: parseEntities(module1.moduleManualContent.data)
    },
    module2: {
        module: {
            id: module2.id,
            storeName: module2.moduleName
        },
        items: parseEntities(module2.moduleManualContent.data)
    }
};

describe('#parseModules', () => {
    let modules;

    describe(`when passing an empty object`, () => {
        before(() => {
            modules = parseModules({})
        });

        it('should return all modules in the desired structure', ()=> {
            expect(modules).to.deep.equal({});
        });
    });

    describe(`when passing a module response object`, () => {
        before(() => {
            modules = parseModules(moduleInput)
        });

        it('should return all modules in the desired structure', ()=> {
            expect(modules).to.deep.equal(exptedModules);
        });
    });
});
