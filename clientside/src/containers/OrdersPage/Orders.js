import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions/order";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/GenericUI/Card/Card";
import { BiRupee } from "react-icons/bi";
import { Breed } from "../../components/MUIComponents/MUIComponents";
import { IoIosArrowForward } from "react-icons/io";
import "./Orders.css";
import { generatePublicUrl } from "../../urlConfig";

function Orders(props) {
    const dispatch = useDispatch();
    const userOrder = useSelector((state) => state.order);

    useEffect(() => {
        dispatch(getOrders());
    }, []);

    return (
        <Layout>
            <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
                <div className="breeed">
                    <Breed
                        breed={[
                            { name: "Home", href: "/" },
                            { name: "My Account", href: "/account" },
                            { name: "My Orders", href: "/account/orders" },
                        ]}
                        breedIcon={<IoIosArrowForward />}
                    />
                </div>
                {userOrder.orders.map((order) => {
                    return order.items.map((item) => (
                        <Card style={{ display: "block", margin: "8px 0" }}>
                            <Link
                                to={`/order_details/${order._id}`}
                                className="orderItemContainer"
                            >
                                <div className="orderImgContainer">
                                    <img
                                        className="orderImg"
                                        src={generatePublicUrl(
                                            item.productId.productPictures[0]
                                                .img
                                        )}
                                    />
                                </div>
                                <div className="orderRow">
                                    <div className="orderName">
                                        {item.productId.name}
                                    </div>
                                    <div className="orderPrice">
                                        <BiRupee style={{ fontSize: "15px" }} />
                                        {item.payablePrice}
                                    </div>
                                    <div className="orderStatus">
                                        <span>Order Status: &nbsp;</span>
                                        {order.paymentStatus}
                                    </div>
                                </div>
                            </Link>
                        </Card>
                    ));
                })}
            </div>
        </Layout>
    );
}

export default Orders;
