import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/GenericUI/Card/Card";
import "./OrderDetails.css";
import { getOrder } from "../../actions/order";

function OrderDetails(props) {
    const dispatch = useDispatch();
    const orderDetails = useSelector((state) => state.order.orderDetails);

    console.log(orderDetails);

    useEffect(() => {
        console.log({ props });
        const payload = {
            orderId: props.match.params.orderId,
        };
        console.log(payload);
        dispatch(getOrder(payload));
    }, []);

    return (
        <Layout>
            <div>hello</div>
        </Layout>
    );
}

export default OrderDetails;
