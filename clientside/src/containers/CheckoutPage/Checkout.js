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
import PriceDetails from "../../components/PriceDetails/PriceDetails";
import Cart from "../CartPage/Cart";
import { IoMdCheckmark } from "react-icons/io";

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div
                style={{ cursor: "pointer" }}
                onClick={props.onClick}
                className={`checkoutHeader ${
                    props.active ? "active" : "nonActive"
                }`}
            >
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                    {/* {!props.active && <IoMdCheckmark />} */}
                </div>
            </div>
            {props.body && props.body}
        </div>
    );
};

const Address = ({
    adr,
    selectAddress,
    enableAddressEditForm,
    ConfirmDeliveryAddress,
    onAddressSubmit,
}) => {
    return (
        <div className="flexRow addressContainer">
            <div>
                <input
                    type="radio"
                    name="address"
                    onClick={() => selectAddress(adr)}
                />
            </div>
            <div className="flexRow sb addressinfo">
                {!adr.edit ? (
                    <>
                        <div
                            style={{
                                float: "left",
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            <div
                                style={{
                                    fontSize: "15px",
                                }}
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
                                <span>{adr.mobileNumber}</span>
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
                                style={{
                                    fontSize: "14px",
                                }}
                            >
                                <span>
                                    {adr.cityDistrictTown} -{" "}
                                    <span
                                        style={{
                                            fontWeight: "500",
                                        }}
                                    >
                                        {adr.pinCode}
                                    </span>
                                </span>
                            </div>
                            {adr.selected && (
                                <MUIButton
                                    style={{
                                        width: "200px",
                                        marginTop: "15px",
                                    }}
                                    title="DELIVER HERE"
                                    onClick={() => ConfirmDeliveryAddress(adr)}
                                />
                            )}
                        </div>
                        <div className="edit">
                            {adr.selected && (
                                <Anchor
                                    name="EDIT"
                                    onClick={() => enableAddressEditForm(adr)}
                                    className="edit"
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <AddressForm
                        withoutLayout={true}
                        onSubmitForm={onAddressSubmit}
                        initialData={adr}
                        onCancel={() => {}}
                    />
                )}
            </div>
        </div>
    );
};

function Checkout(props) {
    const auth = useSelector((state) => state.auth);
    const userAddress = useSelector((state) => state.address);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const [newAddress, setNewAddress] = useState(false);
    const [address, setAddress] = useState([]);
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);

    useEffect(() => {
        auth.authenticate && dispatch(getAddress());
        auth.authenticate && dispatch(getCartItems());
    }, [auth.authenticate]);

    useEffect(() => {
        const address = userAddress.address.map((adr) => ({
            ...adr,
            selected: false,
            edit: false,
        }));
        setAddress(address);
    }, [userAddress.address]);

    const onAddressSubmit = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    };

    const selectAddress = (addr) => {
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id
                ? { ...adr, selected: true }
                : { ...adr, selected: false }
        );
        setAddress(updatedAddress);
    };

    const ConfirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    };

    const enableAddressEditForm = (addr) => {
        console.log(">>>>>>>", addr);
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id
                ? { ...adr, edit: true }
                : { ...adr, edit: false }
        );
        setAddress(updatedAddress);
    };

    const userOrderConfirmation = () => {
        setOrderConfirmation(true);
        setOrderSummary(false);
    };

    console.log(">>", newAddress);
    console.log(">>>", orderSummary);

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
                        active={!confirmAddress && auth.authenticate}
                        body={
                            <>
                                {confirmAddress ? (
                                    <div className="flexRow addressContainer">
                                        <div className="flexRow sb addressinfo">
                                            <div
                                                style={{
                                                    float: "left",
                                                    cursor: "pointer",
                                                    width: "100%",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        fontSize: "15px",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {selectedAddress.name}
                                                    </span>
                                                    <span
                                                        style={{
                                                            margin: "0px 11px",
                                                        }}
                                                        className="adrType"
                                                    >
                                                        {
                                                            selectedAddress.addressType
                                                        }
                                                    </span>
                                                    <span>
                                                        {
                                                            selectedAddress.mobileNumber
                                                        }
                                                    </span>
                                                </div>

                                                <div
                                                    className="addr"
                                                    style={{
                                                        marginTop: "10px",
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    <span>
                                                        {
                                                            selectedAddress.address
                                                        }
                                                    </span>
                                                </div>
                                                <div
                                                    className="addr"
                                                    style={{
                                                        fontSize: "14px",
                                                    }}
                                                >
                                                    <span>
                                                        {
                                                            selectedAddress.cityDistrictTown
                                                        }{" "}
                                                        -{" "}
                                                        <span
                                                            style={{
                                                                fontWeight:
                                                                    "500",
                                                            }}
                                                        >
                                                            {
                                                                selectedAddress.pinCode
                                                            }
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    (address || []).map((adr) => (
                                        <Address
                                            selectAddress={selectAddress}
                                            enableAddressEditForm={
                                                enableAddressEditForm
                                            }
                                            ConfirmDeliveryAddress={
                                                ConfirmDeliveryAddress
                                            }
                                            onAddressSubmit={onAddressSubmit}
                                            adr={adr}
                                        />
                                    ))
                                )}
                            </>
                        }
                    />

                    {confirmAddress ? null : newAddress ? (
                        <AddressForm
                            setNewAddress={setNewAddress}
                            onSubmitForm={onAddressSubmit}
                        />
                    ) : auth.authenticate ? (
                        <CheckoutStep
                            stepNumber={"+"}
                            title={"ADD NEW ADDRESS"}
                            active={false}
                            onClick={() => setNewAddress(true)}
                        />
                    ) : null}

                    <CheckoutStep
                        stepNumber={"3"}
                        title={"ORDER SUMMARY"}
                        active={orderSummary}
                        body={
                            orderSummary ? (
                                <Cart onlyCartItems={true} />
                            ) : orderConfirmation ? (
                                <div className="stepCompleted">
                                    {Object.keys(cart.cartItems).length} items
                                </div>
                            ) : null
                        }
                    />

                    {orderSummary && (
                        <Card>
                            <div
                                className="flexRow sb"
                                style={{
                                    padding: "16px 24px",
                                    alignItems: "center",
                                }}
                            >
                                <span
                                    style={{
                                        flex: "1 1 auto",
                                        fontSize: "14px",
                                    }}
                                >
                                    Order confirmation email will be sent to{" "}
                                    <strong>{auth.user.email}</strong>
                                </span>
                                <MUIButton
                                    title="CONTINUE"
                                    onClick={userOrderConfirmation}
                                    style={{
                                        width: "200px",
                                    }}
                                />
                            </div>
                        </Card>
                    )}
                </div>

                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (
                        qty,
                        key
                    ) {
                        return qty + cart.cartItems[key].qty;
                    },
                    0)}
                    totalPrice={Object.keys(cart.cartItems).reduce(
                        (totalPrice, key) => {
                            const { price, qty } = cart.cartItems[key];
                            return totalPrice + price * qty;
                        },
                        0
                    )}
                />
            </div>
        </Layout>
    );
}

export default Checkout;
