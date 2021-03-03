import Page from "../../models/page.js";

export const createPage = (req, res) => {
    const { banners, products } = req.files;

    if (banners && banners.length > 0) {
        req.body.banners = banners.map((banner, index) => ({
            img: `${process.env.BASEURL}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`,
        }));
    }

    if (products && products.length > 0) {
        req.body.products = products.map((product, index) => ({
            img: `${process.env.BASEURL}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`,
        }));
    }

    res.status(200).json({ body: req.body });
};
