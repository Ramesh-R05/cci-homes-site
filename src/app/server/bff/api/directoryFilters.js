const hardCodedFilters = {
    category: [
        {
            id: 5812,
            name: 'listing:category:Artist & Galleries',
            createdAt: '2018-08-30T00:58:32.000Z',
            updatedAt: '2018-08-30T00:58:32.000Z',
            displayName: 'Artist & Galleries',
            urlName: 'artist-and-galleries',
            fullName: 'listing_category_artist_and_galleries'
        },
        {
            id: 5813,
            name: 'listing:category:Children & Family',
            createdAt: '2018-08-30T00:58:32.000Z',
            updatedAt: '2018-08-30T00:58:32.000Z',
            displayName: 'Children & Family',
            urlName: 'children-and-family',
            fullName: 'listing_category_children_and_family'
        },
        {
            id: 5814,
            name: 'listing:category:Fashion & Beauty',
            createdAt: '2018-08-30T00:58:33.000Z',
            updatedAt: '2018-08-30T00:58:33.000Z',
            displayName: 'Fashion & Beauty',
            urlName: 'fashion-and-beauty',
            fullName: 'listing_category_fashion_and_beauty'
        },
        {
            id: 5815,
            name: 'listing:category:Furniture & Interiors',
            createdAt: '2018-08-30T00:58:33.000Z',
            updatedAt: '2018-08-30T00:58:33.000Z',
            displayName: 'Furniture & Interiors',
            urlName: 'furniture-and-interiors',
            fullName: 'listing_category_furniture_and_interiors'
        },
        {
            id: 5816,
            name: 'listing:category:Home & Decor',
            createdAt: '2018-08-30T00:58:33.000Z',
            updatedAt: '2018-08-30T00:58:33.000Z',
            displayName: 'Home & Decor',
            urlName: 'home-and-decor',
            fullName: 'listing_category_home_and_decor'
        },
        {
            id: 5817,
            name: 'listing:category:Travel & Accomodation',
            createdAt: '2018-08-30T00:58:33.000Z',
            updatedAt: '2018-08-30T00:58:33.000Z',
            displayName: 'Travel & Accomodation',
            urlName: 'travel-and-accomodation',
            fullName: 'listing_category_travel_and_accomodation'
        }
    ],
    location: [
        {
            id: 5809,
            name: 'location:australian_state:Victoria',
            createdAt: '2018-08-30T00:48:29.000Z',
            updatedAt: '2018-08-30T00:48:29.000Z',
            displayName: 'Victoria',
            urlName: 'victoria',
            fullName: 'location_australianstate_victoria'
        },
        {
            id: 5810,
            name: 'location:australian_state:Tasmania',
            createdAt: '2018-08-30T00:48:29.000Z',
            updatedAt: '2018-08-30T00:48:29.000Z',
            displayName: 'Tasmania',
            urlName: 'tasmania',
            fullName: 'location_australianstate_tasmania'
        },
        {
            id: 5811,
            name: 'location:australian_state:South Australia',
            createdAt: '2018-08-30T00:48:29.000Z',
            updatedAt: '2018-08-30T00:48:29.000Z',
            displayName: 'South Australia',
            urlName: 'south-australia',
            fullName: 'location_australianstate_south_australia'
        },
        {
            id: 1549,
            name: 'location:australian_state:Queensland',
            createdAt: '2016-02-16T23:15:11.480Z',
            updatedAt: '2016-02-16T23:15:11.480Z',
            displayName: 'Queensland',
            urlName: 'queensland',
            fullName: 'location_australian_state_Queensland'
        },
        {
            id: 1550,
            name: 'location:australian_state:New South Wales',
            createdAt: '2016-02-16T23:15:11.480Z',
            updatedAt: '2016-02-16T23:15:11.480Z',
            displayName: 'New South Wales',
            urlName: 'new-south-wales',
            fullName: 'location_australian_state_New_South_Wales'
        },
        {
            id: 5729,
            name: 'location:australian_territory:Northern Territory',
            createdAt: '2017-08-18T01:54:06.000Z',
            updatedAt: '2017-08-18T01:54:06.000Z',
            displayName: 'Northern Territory',
            urlName: 'northern-territory',
            fullName: 'location_australianterritory_northern_territory'
        },
        {
            id: 1552,
            name: 'location:australian_territory:Australian Capital Territory',
            createdAt: '2016-02-16T23:15:11.480Z',
            updatedAt: '2016-02-16T23:15:11.480Z',
            displayName: 'Australian Capital Territory',
            urlName: 'australian-capital-territory',
            fullName: 'location_australian_territory_Australian_Capital_Territory'
        },
        {
            id: 1542,
            name: 'location:country:New Zealand',
            createdAt: '2016-02-16T23:15:11.480Z',
            updatedAt: '2016-02-16T23:15:11.480Z',
            displayName: 'New Zealand',
            urlName: 'new-zealand',
            fullName: 'location_country_New_Zealand'
        },
        {
            id: 5818,
            name: 'location:online',
            createdAt: '2018-09-07T00:03:26.000Z',
            updatedAt: '2018-09-07T00:03:26.000Z',
            displayName: 'online',
            urlName: 'online',
            fullName: 'location_online'
        }
    ]
};

/* 
    TODO: replace me with a function that gets tags by groupings
*/
export default function getDirectoryFilters() {
    return hardCodedFilters;
}
