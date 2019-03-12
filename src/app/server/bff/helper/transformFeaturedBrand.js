import config from '../../../config';

export default function transformFeaturedBrand(item) {
    const brandConfig = config.brands.site;

    return brandConfig.find(b => b.title === item.articleSource);
}
