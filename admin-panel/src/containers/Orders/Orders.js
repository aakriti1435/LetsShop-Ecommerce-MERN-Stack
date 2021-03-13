import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/GenericUI/Card/Card";
import { useDispatch, useSelector } from "react-redux";
import "./Orders.css";
import { updateOrder } from "../../actions/order";

function Orders(props) {
    const order = useSelector((state) => state.order);
    const [type, setType] = useState("");
    const dispatch = useDispatch();

    const onOrderUpdate = (orderId) => {
        const payload = { orderId, type };
        console.log(payload);
        dispatch(updateOrder(payload));
    };

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }
        return "";
    };

    return (
        <Layout sidebar>
            {order.orders.map((orderItem, index) => (
                <Card
                    style={{
                        margin: "10px 0",
                    }}
                    key={index}
                    headerleft={`Order ID:  ${orderItem._id}`}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "15px 20px",
                        }}
                    >
                        <div>
                            <div className="title">Items</div>
                            <ul className="titleul">
                                {orderItem.items.map((item, index) => (
                                    <li className="value" key={index}>
                                        {item.productId.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <span className="title">Total Price</span>
                            <br />
                            <span className="value">
                                {orderItem.totalAmount}
                            </span>
                        </div>
                        <div>
                            <span className="title">Payment Type</span> <br />
                            <span className="value">
                                {orderItem.paymentType}
                            </span>
                        </div>
                        <div>
                            <span className="title">Payment Status</span> <br />
                            <span className="value">
                                {orderItem.paymentStatus}
                            </span>
                        </div>
                    </div>
                    <div
                        style={{
                            boxSizing: "border-box",
                            padding: "50px 50px",
                            display: "flex",
                            alignItems: "center",
                            borderTop: "1px solid #ececec",
                            justifyContent: "space-between",
                        }}
                    >
                        <div className="orderTrack">
                            {orderItem.orderStatus.map((status) => (
                                <div
                                    className={`orderStatus ${
                                        status.isCompleted ? "active" : ""
                                    }`}
                                >
                                    <div
                                        className={`point ${
                                            status.isCompleted ? "active" : ""
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

                        {/* select input to apply order action */}
                        <div
                            style={{
                                boxSizing: "border-box",
                                marginLeft: "0px",
                            }}
                        >
                            <select onChange={(e) => setType(e.target.value)}>
                                <option value={""}>Select Status</option>
                                {orderItem.orderStatus.map((status) => {
                                    return (
                                        <>
                                            {!status.isCompleted ? (
                                                <option
                                                    key={status.type}
                                                    value={status.type}
                                                >
                                                    {status.type}
                                                </option>
                                            ) : null}
                                        </>
                                    );
                                })}
                            </select>
                        </div>

                        <div
                            style={{
                                boxSizing: "border-box",
                            }}
                        >
                            <button
                                onClick={() => onOrderUpdate(orderItem._id)}
                                style={{ border: "1px solid darkgrey" }}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </Card>
            ))}
        </Layout>
    );
}

export default Orders;
