import tagsToQuery from '../../../../app/server/bff/helper/tagsToQuery';

describe('tagsToQueryHelp', () => {
    const tags = ['food:Dish:type:Cupcake', 'food:Dish:type:Cake'];
    const expectExcludeOutput = 'tagsDetails/fullName%20ne%20%27food_Dish_type_Cupcake,food_Dish_type_Cake%27';
    const expectIncludeOutput = 'tagsDetails/fullName%20eq%20%27food_Dish_type_Cupcake,food_Dish_type_Cake%27';

    it('should return empty string, if not input proper tags argument', () => {
        expect(tagsToQuery('')).eq('');
        expect(tagsToQuery('Some string')).eq('');
        expect(tagsToQuery([])).eq('');
    });

    it('should return expect query string, if input proper arguments', () => {
        expect(tagsToQuery(tags)).eq(expectExcludeOutput);
        expect(tagsToQuery(tags, 'eq')).eq(expectIncludeOutput);
    });
});
