import config from '../../../config';

export default function transformFeaturedBrand(item) {
    const brandConfig = config.brands.uniheader;

    return brandConfig.find(b => b.title === item.articleSource);
}
