import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions/actions";
import { MUIButton } from "../../../components/MUIComponents/MUIComponents";
import Card from "../../../components/GenericUI/Card/Card";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import "./ProductsView.css";

function ProductsView(props) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return (
        <div style={{ padding: "10px" }}>
            <Card
                style={{
                    boxSizing: "border-box",
                    padding: "10px",
                    display: "flex",
                }}
            >
                {product.products.map((product) => (
                    <div className="caContainer">
                        <Link
                            className="caImgContainer"
                            to={`/${product.slug}/${product._id}/p`}
                        >
                            <img
                                src={generatePublicUrl(
                                    product.productPictures[0].img
                                )}
                            />
                        </Link>
                        <div>
                            <div className="caProductName">{product.name}</div>
                            <div className="caProductPrice">
                                <BiRupee
                                    style={{
                                        marginBottom: "-2px",
                                        fontSize: "14px",
                                    }}
                                />
                                {product.price}
                            </div>
                        </div>
                    </div>
                ))}
            </Card>
        </div>
    );
}

export default ProductsView;
