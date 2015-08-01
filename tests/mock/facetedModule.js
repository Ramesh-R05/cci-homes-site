export default {
    contentPayload: {
        body: {
            entity: {
                id: 'ENTITY-ID'
            },
            stores: {
                store1: {module: {id: "MDOULE-1", storeName: "module1"}},
                store2: {module: {id: "MDOULE-2", storeName: "module2"}}
            }
        }
    },
    pageReceivedPayload: {
        lynxStoreName: 'storeName',
        content: {
            "entity": {"id": "HOMES-1206"},
            "module": {"storeName": "taggedArticles", "id": "HOMES-1208"},
            "faceting": {
                "facetCounts": {
                    "facetFields": [{"name": "tags", "values": [{"value": "food:Audience:All", "count": 1}]}]
                }
            },
            "settings": {"pageSize": 8},
            "items": [
                {
                    "tags": ["food:Building:Building style:Industrial", "food:Topic:Inspired by", "food:Location and setting:Australia:New South Wales:Blue Mountains", "food:Price range:Renovating:$250,001 - $500,000", "food:Season:Autumn", "food:Building:Type:Apartment/unit", "food:Room:Living:Open plan living room", "food:Decorating:Style:Minimalist", "food:Homes navigation:Indoor"], "source": "Australian House and Garden",
                    "body": [
                        {"type": "paragraph", "label": "Paragraph", "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan ex non tortor condimentum, non iaculis felis consequat. Duis in iaculis metus. Duis ut metus elementum, imperdiet dui eu, vulputate tortor. Ut at est nulla. Nunc vehicula urna erat, a lobortis tellus viverra nec. "},
                        {"type": "image", "label": "Image", "content": {"url": "http://dev.assets.cougar.bauer-media.net.au/s3/digital-cougar-assets-dev/homes/2015/06/11/1433988041609_1290369106179f.jpg", "valid": true, "title": "Good news everybody", "caption": "Caption: Good news everybody"}},
                    ],
                    "title": "Marina's Article - This is my long title, I like to be descriptive",
                    "summaryTitle": "Marina's Article - Short Title",
                    "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum accumsan ex non tortor condimentum, non iaculis felis consequat. Duis in iaculis metus.",
                    "imageUrl": "http://dev.assets.cougar.bauer-media.net.au/s3/digital-cougar-assets-dev/homes/2015/06/11/1229/anne-marina_d.jpg",
                    "id": "HOMES-1229",
                    "name": "Marina Test Article"
                }
            ],
            "paging": {
                "pages": 4,
                "totalResults": 31
            }
        }
    }
}
