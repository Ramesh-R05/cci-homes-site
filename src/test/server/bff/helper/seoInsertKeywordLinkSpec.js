import {
    init,
    keywordLinkExist,
    getLinksRange,
    searchKeyword,
    replaceContent
} from '../../../../app/server/bff/helper/seoInsertKeywordLink';

describe('utils', () => {
    describe('seoInsertKeywordLink', () => {
        describe('init', () => {
            describe('when keywords are empty or primaryUrl is empty', () => {
                it('should return default body', () => {
                    const body = [
                        { type: 'paragraph'},
                        { type: 'paragraph'}
                    ];
                    expect(init(body, {
                        keywords: '',
                        primaryUrl: 'test'
                    })).to.be.deep.equal(body);
                });
            });

            describe('when keywords is not defined', () => {
                it('should return default body', () => {
                    const body = [
                        { type: 'paragraph'},
                        { type: 'paragraph'}
                    ];
                    expect(init(body, {
                    })).to.be.deep.equal(body);
                });
            });

            describe('when there is no paragraphs found', () => {
                it('should return default body', () => {
                    const body = [
                        { type: 'home'},
                        { type: 'page'}
                    ];

                    expect(init(body, {
                        keywords: 'test',
                        primaryUrl: 'test'
                    })).to.be.deep.equal(body);
                });
            });

            describe('when keywords is next to each others', () => {
                const keywords = [
                    {
                        keyword: "step"
                    }
                ];

                const body = [
                    { type: 'home'},
                    {
                        type: 'paragraph',
                        content: '[Steps](http://test.com) Step 1 Preheat oven to 120?C. Arrange six 1 1/2-cup ramekins in large baking dish lined with a cloth.'
                    }
                ];

                it('should replace the keyword', () => {
                    expect(init(body, {
                        keywords,
                        primaryUrl: 'test'
                    })).to.be.deep.equal([
                            { type: 'home' },
                            {
                                type: 'paragraph',
                                content: "[Steps](http://test.com) [Step](test) 1 Preheat oven to 120?C. Arrange six 1 1/2-cup ramekins in large baking dish lined with a cloth."
                            }
                        ]);
                });
            });

            describe('when multiple keywords', () => {
                const keywords = [
                    {
                        keyword: "with"
                    },
                    {
                        keyword: "arrange"
                    },
                    {
                        keyword: "step"
                    }
                ];

                const body = [
                    { type: 'home'},
                    {
                        type: 'paragraph',
                        content: 'Steps: Step 1 Preheat oven to 120?C. Arrange six 1 1/2-cup ramekins in large baking dish lined with a cloth.'
                    }
                ];

                it('should replace all keyword', () => {
                    expect(init(body, {
                        keywords,
                        primaryUrl: 'test'
                    })).to.be.deep.equal([
                            { type: 'home' },
                            {
                                type: 'paragraph',
                                content: "Steps: [Step](test) 1 Preheat oven to 120?C. [Arrange](test) six 1 1/2-cup ramekins in large baking dish lined [with](test) a cloth."
                            }
                        ]);
                });
            })
        });

        describe('keywordLinkExsit', () => {
            it('should return true if exact keyword is found', () => {
                const content = 'link [test]';
                const keyword = {
                    keyword: 'test'
                };
                expect(keywordLinkExist(content, keyword)).to.be.true;
            });
        });

        describe('getLinksRange', () => {
            describe('when url is found', () => {
                it('should find all the links with it\'s range', () => {
                    const content = 'test [test](http://test.com.au), [test] test test (test) [test](test) [test]{()';
                    expect(getLinksRange(content)).to.be.deep.equal([
                        [5, 32]
                    ]);
                });
            });

            describe('when url name contain speical characters', () => {
                it('should find the links with it\'s range', () => {
                    const content = '"The best part of the weekend is the recipes that can now be shared with our family and friends. I present you with [‘The world’s best donut recipe’, by Justin Gellatly](http://www.foodtolove.com.au/recipes/the-worlds-best-donut-recipe-16551|target="_blank")."';
                    expect(getLinksRange(content)).to.be.deep.equal([
                        [116, 260]
                    ]);
                });
            });

            describe('when url link start a new line or space', () => {
                it('should not find the links with it\'s range', () => {
                    let content = `asd [test](http://te
                    st.com.au) asd`;
                    expect(getLinksRange(content)).to.be.deep.equal([]);

                    content = `asd [test](http://te st.com.au) asd`;
                    expect(getLinksRange(content)).to.be.deep.equal([]);
                });
            });

            describe('when url is not found', () => {
                it('should return empty array', () => {
                    const content = 'test [test](test), [test] test test (test) [test](test) [test]{()';
                    expect(getLinksRange(content)).to.be.deep.equal([]);
                });
            });

            describe('when there are multiple urls in the sentence', () => {
                it('should return all results in array' , () => {
                    const content = 'test what [hey](http://test.com) haha [what]test anotherone [hey](http://test.com)';
                    expect(getLinksRange(content).length).to.be.equal(2);
                });
            });
        });

        describe('replaceContent', () => {
            it('should replace keywords with link attached', () => {
                const params = {
                    content: 'this thinks is about think test',
                    matchIndex: 20,
                    keyword: 'think',
                    primaryUrl: 'example.com.au'
                };

                expect(replaceContent(params)).to.equal('this thinks is about [think](example.com.au) test');
            });

            it('should replace keywords with link attached and with it\'s origin', () => {
                const params = {
                    content: 'this thinks is about Think test',
                    matchIndex: 20,
                    keyword: 'think',
                    primaryUrl: 'example.com.au'
                };

                expect(replaceContent(params)).to.equal('this thinks is about [Think](example.com.au) test');
            });

            describe('when the keyword was found in the begining of the paragraph', () => {
                it('should replace the keyword correctly too', () => {
                    const params = {
                        content: 'think that is about think test',
                        matchIndex: 0,
                        keyword: 'think',
                        primaryUrl: 'example.com.au'
                    };
                    expect(replaceContent(params)).to.equal('[think](example.com.au) that is about think test');
                });
            });
        });

        describe('searchKeyword', () => {
            describe('when url is found', () => {
                it('should return content as original', () => {
                    const content = 'sfsdfsf [vitamins](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673)](asdasd) sdf  thinkasd [asd think asd](test) sd [think](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673) sdf think1 sdfsdf think ';
                    const keywordObj = {
                        keyword: 'think'
                    };
                    const primaryUrl = 'example.com';
                    const output = searchKeyword(content, keywordObj, primaryUrl);

                    expect(output).to.be.equal(output);
                });

                it('should not replace keyword with url', () => {
                    const content = 'The best part of the weekend is the recipes that can now be shared with our family and friends. I present you with [‘The world’s best donut recipe’, by Justin Gellatly](http://www.foodtolove.com.au/recipes/the-worlds-best-donut-recipe-16551|target="_blank").';
                    const keywordObj = {
                        keyword: 'best donut recipe'
                    };
                    const primaryUrl = 'example.com';
                    const output = searchKeyword(content, keywordObj, primaryUrl);
                    const expected = {
                        updateContent: content
                    };
                    expect(output).to.be.deep.equal(expected);
                });
            });

            describe('when url is not found', () => {
                it('should replace keyword with url', () => {
                    const content = 'sfsdfsf [vitamins](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673)](asdasd) sdf  thinkasd sd [think](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673) sdf think1 sdfsdf think,';
                    const keywordObj = {
                        keyword: 'think'
                    };
                    const primaryUrl = 'example.com';
                    const output = searchKeyword(content, keywordObj, primaryUrl);
                    const expected = {
                        updateContent: 'sfsdfsf [vitamins](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673)](asdasd) sdf  thinkasd sd [think](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673) sdf think1 sdfsdf [think](example.com),',
                        replaced: true
                    };
                    expect(output).to.be.deep.equal(expected);
                });

                it('should replace case insensitive keyword with url', () => {
                    const content = 'test Think sdf';
                    const keywordObj = {
                        keyword: 'think'
                    };
                    const primaryUrl = 'example.com';
                    const output = searchKeyword(content, keywordObj, primaryUrl);
                    const expected = {
                        updateContent: 'test [Think](example.com) sdf',
                        replaced: true
                    };
                    expect(output).to.be.deep.equal(expected);
                });
            });

            describe('when url found in the begin of the link', () => {
                it('should not replace keyword with url', () => {
                    const content = 'think sfsdfsf [vitamins](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673)](asdasd) sdf  thinkasd sd [think](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673) sdf think1 sdfsdf think,';
                    const keywordObj = {
                        keyword: 'vitamins'
                    };
                    const primaryUrl = 'example.com';
                    const output = searchKeyword(content, keywordObj, primaryUrl);
                    const expected = {
                        updateContent: 'think sfsdfsf [vitamins](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673)](asdasd) sdf  thinkasd sd [think](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673) sdf think1 sdfsdf think,'
                    };
                    expect(output).to.be.deep.equal(expected);
                });
            });

            describe('when url found at the end of the link', () => {
                it('should not replace keyword with url', () => {
                    const content = 'think sfsdfsf [test vitamins](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673)](asdasd) sdf  thinkasd sd [think](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673) sdf think1 sdfsdf think,';
                    const keywordObj = {
                        keyword: 'vitamins'
                    };
                    const primaryUrl = 'example.com';
                    const output = searchKeyword(content, keywordObj, primaryUrl);
                    const expected = {
                        updateContent: 'think sfsdfsf [test vitamins](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673)](asdasd) sdf  thinkasd sd [think](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673) sdf think1 sdfsdf think,'
                    };
                    expect(output).to.be.deep.equal(expected);
                });
            });

            describe('when url found in the begin of the sentence', () => {
                it('should replace keyword with url', () => {
                    const content = 'think sfsdfsf [vitamins](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673)](asdasd) sdf  thinkasd sd [think](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673) sdf think1 sdfsdf think,';
                    const keywordObj = {
                        keyword: 'think'
                    };
                    const primaryUrl = 'example.com';
                    const output = searchKeyword(content, keywordObj, primaryUrl);
                    const expected = {
                        updateContent: '[think](example.com) sfsdfsf [vitamins](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673)](asdasd) sdf  thinkasd sd [think](http://www.foodtolove.com.au/recipes/fresh-apricot-jam-17673) sdf think1 sdfsdf think,',
                        replaced: true
                    };
                    expect(output).to.be.deep.equal(expected);
                });
            });
        });
    });
});
