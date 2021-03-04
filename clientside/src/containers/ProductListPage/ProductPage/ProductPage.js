import React, { useEffect } from "react";
import "./ProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import getParams from "../../../utils/getParams";
import { getProductPage } from "../../../actions/product";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Card from "../../../components/GenericUI/Card/Card";

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    const { page } = product;

    useEffect(() => {
        const params = getParams(props.location.search);
        const payload = { params };

        dispatch(getProductPage(payload));
    }, []);

    return (
        <div style={{ margin: "0 10px" }}>
            <h3 style={{ margin: "10px 0" }}>{page.title}</h3>
            <Carousel renderThumbs={() => {}}>
                {page.banners &&
                    page.banners.map((banner, index) => (
                        <a
                            style={{ display: "block" }}
                            href={banner.navigateTo}
                            key={index}
                        >
                            <img src={banner.img} alt="" />
                        </a>
                    ))}
            </Carousel>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    margin: "10px 0",
                }}
            >
                {page.products &&
                    page.products.map((product, index) => (
                        <Card
                            style={{
                                width: "200px",
                                height: "200px",
                                margin: "15px",
                                padding: "15px",
                                // boxShadow: "none",
                            }}
                            key={index}
                        >
                            <img
                                style={{
                                    objectFit: "contain",
                                    width: "100%",
                                    height: "100%",
                                }}
                                src={product.img}
                                alt=""
                            />
                        </Card>
                    ))}
            </div>
        </div>
    );
};

export default ProductPage;
