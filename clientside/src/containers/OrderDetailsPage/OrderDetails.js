import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/GenericUI/Card/Card";
import "./OrderDetails.css";
import { getOrder } from "../../actions/order";
import { generatePublicUrl } from "../../urlConfig";
import { Breed } from "../../components/MUIComponents/MUIComponents";
import { IoIosArrowForward } from "react-icons/io";
import Price from "../../components/GenericUI/Price";

function OrderDetails(props) {
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.order.orderDetails);

    useEffect(() => {
        console.log({ props });
        const payload = {
            orderId: props.match.params.orderId,
        };
        dispatch(getOrder(payload));
    }, []);

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }
        return "";
    };

    const formatDate2 = (date) => {
        const month = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        if (date) {
            const d = new Date(date);
            return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
        }
    };

    if (!(orderDetails && orderDetails.address)) {
        return null;
    }

    return (
        <Layout>
            <div
                style={{
                    margin: "0 auto",
                    maxWidth: "1680px",
                    minWidth: "978px",
                    padding: "6px 83px 0",
                }}
            >
                <div className="breeed">
                    <Breed
                        breed={[
                            { name: "Home", href: "/" },
                            { name: "My Account", href: "/account" },
                            { name: "My Orders", href: "/account/orders" },
                            {
                                name: `${orderDetails._id}`,
                                href: "",
                            },
                        ]}
                        breedIcon={<IoIosArrowForward />}
                    />
                </div>
                <Card
                    style={{
                        margin: "16px 0",
                        boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
                        width: "100%",
                    }}
                >
                    <div className="delAdrContainer">
                        <div className="delAdrDetails">
                            <div className="delTitle">Delivery Address</div>
                            <div className="delName">
                                {orderDetails.address.name}
                            </div>
                            <div className="delAddress">
                                {orderDetails.address.address}
                            </div>
                            <div className="delPhoneNumber">
                                Phone number &nbsp;
                                {orderDetails.address.mobileNumber}
                            </div>
                        </div>
                        <div className="rewardsContainer">
                            <div className="delTitle">Your Rewards</div>
                            <div className="rewardRow">
                                <div className="rowText">
                                    <span style={{ fontSize: "14px" }}>
                                        Free Delivery
                                    </span>
                                    <br />
                                    <span
                                        style={{
                                            color: "#878787",
                                            fontSize: "12px",
                                        }}
                                    >
                                        For Flipkart Plus Members
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="delMoreActionContainer">
                            <div className="delTitle">More Actions</div>
                            <div
                                className="delName"
                                style={{
                                    display: "flex",
                                    marginTop: "5px",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: "400",
                                        marginTop: "5px",
                                    }}
                                >
                                    Download Invoice
                                </span>
                                <button className="buttonn">Download</button>
                            </div>
                        </div>
                    </div>
                </Card>

                {orderDetails.items.map((item, index) => (
                    <Card
                        style={{
                            display: "flex",
                            padding: "20px 0",
                            margin: "10px 0",
                        }}
                    >
                        <div className="flexRow">
                            <div className="delItemImgContainer">
                                <img
                                    src={generatePublicUrl(
                                        item.productId.productPictures[0].img
                                    )}
                                    alt=""
                                />
                            </div>
                            <div style={{ width: "250px" }}>
                                <div className="delItemName">
                                    {item.productId.name}
                                </div>
                                <Price value={item.payablePrice} />
                            </div>
                        </div>
                        <div style={{ padding: "25px 50px" }}>
                            <div className="orderTrack">
                                {orderDetails.orderStatus.map((status) => (
                                    <div
                                        className={`orderStatus ${
                                            status.isCompleted ? "active" : ""
                                        }`}
                                    >
                                        <div
                                            className={`point ${
                                                status.isCompleted
                                                    ? "active"
                                                    : ""
                                            }`}
                                        ></div>
                                        <div className="orderInfo">
                                            <div className="status">
                                                {status.type}
                                            </div>
                                            <div className="date">
                                                {formatDate(status.date)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div
                            style={{
                                fontWeight: "500",
                                fontSize: "14px",
                                marginLeft: "30px",
                            }}
                        >
                            {orderDetails.orderStatus[3].isCompleted &&
                                `Delivered on ${formatDate2(
                                    orderDetails.orderStatus[3].date
                                )}`}
                        </div>
                    </Card>
                ))}
            </div>
        </Layout>
    );
}

export default OrderDetails;
