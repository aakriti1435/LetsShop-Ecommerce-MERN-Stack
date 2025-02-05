import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions/product";
import Layout from "../../components/Layout/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MUIButton } from "../../components/MUIComponents/MUIComponents";
import "./ProductDetails.css";
import { generatePublicUrl } from "../../urlConfig";
import { addToCart } from "../../actions/actions";

function ProductDetails(props) {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);

    useEffect(() => {
        const { productId } = props.match.params;
        const payload = {
            params: { productId },
        };
        console.log("Payload", payload);
        dispatch(getProductDetailsById(payload));
    }, []);

    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }

    return (
        <div>
            <Layout>
                <div className="productDescriptionContainer">
                    <div className="flexRow">
                        <div className="verticalImageStack">
                            {product.productDetails.productPictures.map(
                                (thumb, index) => (
                                    <div className="thumbnail">
                                        <img
                                            src={generatePublicUrl(thumb.img)}
                                            alt={thumb.img}
                                        />
                                    </div>
                                )
                            )}
                        </div>
                        <div className="productDescContainer">
                            <div className="productDescImgContainer">
                                <img
                                    src={generatePublicUrl(
                                        product.productDetails
                                            .productPictures[0].img
                                    )}
                                    alt={`${product.productDetails.productPictures[0].img}`}
                                />
                            </div>

                            {/* action buttons */}
                            <div className="btnContainer flexRow">
                                <MUIButton
                                    title="ADD TO CART"
                                    bgColor="#ff9f00"
                                    textColor="#ffffff"
                                    style={{
                                        marginRight: "5px",
                                        marginLeft: "-5px",
                                    }}
                                    icon={<IoMdCart />}
                                    onClick={() => {
                                        const {
                                            _id,
                                            name,
                                            price,
                                        } = product.productDetails;
                                        const img =
                                            product.productDetails
                                                .productPictures[0].img;
                                        dispatch(
                                            addToCart({ _id, name, price, img })
                                        );
                                        props.history.push(`/cart`);
                                    }}
                                />
                                <MUIButton
                                    title="BUY NOW"
                                    bgColor="#fb641b"
                                    textColor="#ffffff"
                                    style={{
                                        marginLeft: "5px",
                                    }}
                                    icon={<AiFillThunderbolt />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="DescContainer">
                        <div className="breed">
                            <ul>
                                <li>
                                    <a href="#">Home</a>
                                    <IoIosArrowForward />
                                </li>
                                <li>
                                    <a href="#">Mobiles</a>
                                    <IoIosArrowForward />
                                </li>
                                <li>
                                    <a href="#">Samsung</a>
                                    <IoIosArrowForward />
                                </li>
                                <li>
                                    <a href="#">
                                        {product.productDetails.name}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* product description */}
                        <div className="productDetails">
                            <p className="productTitle">
                                {product.productDetails.name}
                            </p>
                            <div>
                                <span className="ratingCount">
                                    4.3 <IoIosStar />
                                </span>
                                <span className="ratingNumbersReviews">
                                    72,234 Ratings & 8,140 Reviews
                                </span>
                            </div>
                            <div className="extraOffer">
                                Extra <BiRupee />
                                4500 off{" "}
                            </div>
                            <div className="flexRow priceContainer">
                                <span className="price">
                                    <BiRupee />
                                    {product.productDetails.price}
                                </span>
                                <span
                                    className="discount"
                                    style={{ margin: "0 10px" }}
                                >
                                    22% off
                                </span>
                                {/* <span>i</span> */}
                            </div>
                            <div>
                                <p
                                    style={{
                                        color: "#212121",
                                        fontSize: "16px",
                                        margin: "10px 0",
                                        fontWeight: "600",
                                    }}
                                >
                                    Available Offers
                                </p>
                                <p style={{ display: "flex" }}>
                                    <span
                                        style={{
                                            width: "100px",
                                            fontSize: "14px",
                                            color: "#878787",
                                            fontWeight: "600",
                                            marginRight: "20px",
                                        }}
                                    >
                                        Description
                                    </span>
                                    <span
                                        style={{
                                            fontSize: "14px",
                                            color: "#212121",
                                        }}
                                    >
                                        {product.productDetails.description}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default ProductDetails;
