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
import AddressForm from "./AddressForm";

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div
                onClick={props.onClick}
                className={`checkoutHeader ${
                    props.active ? "active" : "nonActive"
                }`}
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

    const onAddressSubmit = () => {};
    console.log(">>>>", userAddress.address);

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
                                <div
                                    className="loggedInId"
                                    style={{ fontSize: "15px" }}
                                >
                                    <div
                                        className="flexRow"
                                        style={{
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <div className="inputContainer">
                                            <label>Username: </label>
                                        </div>
                                        <div className="inputContainer">
                                            <span style={{ fontWeight: 500 }}>
                                                {auth.user.fullName}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flexRow">
                                        <div className="inputContainer">
                                            <label>Email Address: </label>
                                        </div>
                                        <div className="inputContainer">
                                            <span style={{ fontWeight: 500 }}>
                                                {auth.user.email}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="loggedIn">
                                        <div className="flexRow ">
                                            <div className="inputContainer">
                                                <MUIInput
                                                    label="Email"
                                                    // value={}
                                                    // onChange={(e) => {}}
                                                />
                                            </div>
                                            <div className="inputContainer">
                                                <MUIInput
                                                    label="Password"
                                                    // value={}
                                                    // onChange={(e) => {}}
                                                />
                                            </div>
                                        </div>
                                        <div className="flexRow">
                                            <MUIButton
                                                title="LOGIN"
                                                style={{
                                                    width: "200px",
                                                    marginTop: "20px",
                                                }}
                                            />
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    />

                    <CheckoutStep
                        stepNumber={"2"}
                        title={"DELIVERY ADDRESS"}
                        active={auth.authenticate}
                        body={
                            <>
                                {(userAddress.address || []).map((adr) => (
                                    <div className="flexRow addressContainer">
                                        <div>
                                            <input
                                                type="radio"
                                                name="address"
                                            />
                                        </div>
                                        <div className="flexRow sb addressinfo">
                                            <div
                                                style={{
                                                    float: "left",
                                                    cursor: "pointer",
                                                    width: "100%",
                                                }}
                                            >
                                                <div
                                                    style={{ fontSize: "15px" }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {adr.name}
                                                    </span>
                                                    <span
                                                        style={{
                                                            margin: "0px 11px",
                                                        }}
                                                        className="adrType"
                                                    >
                                                        {adr.addressType}
                                                    </span>
                                                    <span>
                                                        {adr.mobileNumber}
                                                    </span>
                                                </div>

                                                <div
                                                    className="addr"
                                                    style={{
                                                        marginTop: "10px",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    <span>{adr.address}</span>
                                                </div>
                                                <div
                                                    className="addr"
                                                    style={{ fontSize: "14px" }}
                                                >
                                                    <span>
                                                        {adr.cityDistrictTown} -{" "}
                                                        <span
                                                            style={{
                                                                fontWeight:
                                                                    "500",
                                                            }}
                                                        >
                                                            {adr.pinCode}
                                                        </span>
                                                    </span>
                                                </div>
                                                <MUIButton
                                                    style={{
                                                        width: "200px",
                                                        marginTop: "15px",
                                                    }}
                                                    title="DELIVER HERE"
                                                />
                                            </div>
                                            <div className="edit">
                                                <span>EDIT</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    />

                    <AddressForm
                        onSubmit={onAddressSubmit}
                        onCancel={() => {}}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default Checkout;
