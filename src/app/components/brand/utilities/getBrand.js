export default function getBrand(config, brandTitle) {
    return config.brands.uniheader.find((brand) => {
            return brand.title === brandTitle;
        }) || {};
}
