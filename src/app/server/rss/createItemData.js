import mime from 'mime';
import removeMarkdown from 'remove-markdown';
import { parseWithParagraphs } from '@bxm/markdown';
import config from '../../config';
import sanitise from './sanitise';

export default function createItemData(entity, onlySummaryData = false) {
    const { contentProfiles = [] } = entity;
    const author = (contentProfiles[0] && contentProfiles[0].name) || config.site.name;

    const itemData = {
        title: entity.contentSummaryTitle || entity.contentTitle || entity.nodeName,
        description: sanitise(entity.pageMetaDescription || entity.contentSummary),
        url: `${entity.siteUrl}${entity.url}`,
        enclosure: {
            url: `${entity.contentImageUrl}?height=600`,
            type: mime.getType(entity.contentImageUrl)
        },
        custom_elements: [
            { 'mi:dateTimeWritten': entity.pageDateCreated },
            { 'mi:hasSyndicationRights': 1 },
            { 'mi:licensorName': 'BAUER MEDIA PTY LIMITED' },
            {
                'media:content': [
                    {
                        _attr: {
                            url: `${entity.contentImageUrl}?height=600`,
                            type: mime.getType(entity.contentImageUrl)
                        }
                    },
                    {
                        'media:thumbnail': [
                            {
                                _attr: {
                                    url: `${entity.contentImageUrl}?height=600`,
                                    type: mime.getType(entity.contentImageUrl)
                                }
                            }
                        ]
                    },
                    {
                        'media:title': entity.contentSummaryTitle || entity.contentTitle || entity.nodeName
                    },
                    {
                        'media:text': entity.contentImageCaption || entity.pageMetaDescription || entity.contentSummary
                    },
                    {
                        'media:credit': entity.contentPhotoCredit || 'Provided by Bauer Media Pty Ltd'
                    }
                ]
            }
        ],
        date: entity.pageDateCreated,
        updatedDate: entity.nodeDateIndexed,
        author
    };

    if (!onlySummaryData) {
        let content = '';
        entity.contentBody.forEach((item) => {
            switch (item.type) {
            case 'paragraph':
            case 'quote':
                content += parseWithParagraphs(item.content);
                break;
            case 'heading':
                content += `<h2>${item.content}</h2>`;
                break;
            case 'image':
                content += `<img src="${item.content.url}" alt="${removeMarkdown(item.content.caption)}"` +
                    ' data-portal-copyright="Provided by Bauer Media Pty Ltd" data-has-syndication-rights="1"/>';
                break;
            case 'video':
                if (item.content.properties && item.content.properties.videoConfiguration &&
                    item.content.properties.videoConfiguration.brightcoveId) {
                    content += `<a href="${entity.siteUrl}${entity.url}" target="_blank">Watch video</a>`;
                }
                break;
            default:
                break;
            }
        });

        itemData.custom_elements.push({
            'content:encoded': {
                _cdata: content
            }
        });
    }

    return itemData;
}
