import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions/actions";
import { MUIButton } from "../../../components/MUIComponents/MUIComponents";
import Card from "../../../components/GenericUI/Card/Card";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import Rating from "../../../components/GenericUI/Rating";
import Price from "../../../components/GenericUI/Price";

import "./ProductStore.css";

const ProductStore = (props) => {
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const priceRange = product.priceRange;

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
        console.log(match.params.slug);
    }, []);
    console.log(product);

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
                        headerRight={
                            <MUIButton
                                title={"VIEW ALL"}
                                style={{
                                    width: "96px",
                                }}
                                bgColor="#2874f0"
                                fontSize="12px"
                            />
                        }
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
                                            <Rating value="4.3" />
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
                                            <Price value={product.price} />
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
