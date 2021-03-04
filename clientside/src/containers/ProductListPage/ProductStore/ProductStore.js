import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug, getProductPage } from "../../../actions/actions";
import Card from "../../../components/GenericUI/Card/Card";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import "./ProductStore.css";

const ProductStore = (props) => {
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
        under15k: 15000,
        under20k: 20000,
        under30k: 30000,
    });

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <>
            {Object.keys(product.productsByPrice).map((key, index) => {
                return (
                    <Card
                        headerleft={`${props.match.params.slug} mobile under ${priceRange[key]} `}
                        style={{
                            width: "calc(100% - 40px)",
                            margin: "20px",
                        }}
                    >
                        <div style={{ display: "flex" }}>
                            {product.productsByPrice[key].map((product) => (
                                <Link
                                    to={`/${product.slug}/${product._id}/p`}
                                    style={{
                                        display: "block",
                                        textDecoration: "none",
                                        color: "#000",
                                    }}
                                    className="productContainer"
                                >
                                    <div className="productImgContainer">
                                        <img
                                            src={generatePublicUrl(
                                                product.productPictures[0].img
                                            )}
                                            alt=""
                                        />
                                    </div>
                                    <div className="productInfo">
                                        <div style={{ margin: "10px 0" }}>
                                            {product.name}
                                        </div>
                                        <div>
                                            <span>4.3</span>
                                            &nbsp;&nbsp;
                                            <span
                                                style={{
                                                    color: "#777",
                                                    fontWeight: "500",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                (3353)
                                            </span>
                                        </div>
                                        <div className="productPrice">
                                            {product.price}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Card>
                );
            })}
        </>
    );
};

export default ProductStore;
