export default function getBrand(config, brandTitle) {
    return config.brands.site.find(brand => brand.title === brandTitle) || {};
}
