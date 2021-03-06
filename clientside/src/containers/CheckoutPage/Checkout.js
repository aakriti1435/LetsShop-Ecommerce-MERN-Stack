import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAddress, getCartItems } from "../../actions/actions";
import Layout from "../../components/Layout/Layout";
import Card from "../../components/GenericUI/Card/Card";
import {
    MUIButton,
    MUIInput,
    Anchor,
} from "../../components/MUIComponents/MUIComponents";
import "./Checkout.css";

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div
                onClick={props.onClick}
                className={`checkoutHeader ${props.active && "active"}`}
            >
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    );
};

function Checkout(props) {
    const auth = useSelector((state) => state.auth);
    const userAddress = useSelector((state) => state.address);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAddress());
    }, []);

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                <div className="checkoutContainer">
                    <CheckoutStep
                        stepNumber={"1"}
                        title={"LOGIN"}
                        active={!auth.authenticate}
                        body={
                            auth.authenticate ? (
                                <div className="loggedInId">
                                    <span style={{ fontWeight: 500 }}>
                                        {auth.user.fullName}
                                    </span>
                                    <span style={{ margin: "0 5px" }}>
                                        {auth.user.email}
                                    </span>
                                </div>
                            ) : (
                                <div>
                                    <MUIInput label="Email" />
                                </div>
                            )
                        }
                    />
                </div>
            </div>
        </Layout>
    );
}

export default Checkout;
