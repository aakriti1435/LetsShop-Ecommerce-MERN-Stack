import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions/actions";
import {
    MUIButton,
    MUIInput,
} from "../../components/MUIComponents/MUIComponents";

function AddressForm(props) {
    const dispatch = useDispatch();
    const userAddress = useSelector((state) => state.address);

    const { initialData } = props;
    const [name, setName] = useState(initialData ? initialData.name : "");
    const [mobileNumber, setMobileNumber] = useState(
        initialData ? initialData.mobileNumber : ""
    );
    const [pinCode, setPinCode] = useState(
        initialData ? initialData.pinCode : ""
    );
    const [locality, setLocality] = useState(
        initialData ? initialData.locality : ""
    );
    const [address, setAddress] = useState(
        initialData ? initialData.address : ""
    );
    const [cityDistrictTown, setCityDistrictTown] = useState(
        initialData ? initialData.cityDistrictTown : ""
    );
    const [state, setState] = useState(initialData ? initialData.state : "");
    const [landmark, setLandmark] = useState(
        initialData ? initialData.landmark : ""
    );
    const [alternatePhone, setAlternatePhone] = useState(
        initialData ? initialData.alternatePhone : ""
    );
    const [addressType, setAddressType] = useState(
        initialData ? initialData.addressType : ""
    );

    const [submitFlag, setSubmitFlag] = useState(false);
    const [id, setId] = useState(initialData ? initialData._id : "");

    const inputContainer = {
        width: "100%",
        marginRight: 10,
    };

    const onAddressSubmit = (e) => {
        const payload = {
            address: {
                name,
                mobileNumber,
                pinCode,
                locality,
                address,
                cityDistrictTown,
                state,
                landmark,
                alternatePhone,
                addressType,
            },
        };
        console.log(payload);
        if (id) {
            payload.address._id = id;
        }
        dispatch(addAddress(payload));
        setSubmitFlag(true);
    };

    const renderAddressForm = () => {
        return (
            <>
                <div className="flexRow">
                    <div style={inputContainer}>
                        <MUIInput
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div style={inputContainer}>
                        <MUIInput
                            label="10-digit mobile number"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flexRow">
                    <div style={inputContainer}>
                        <MUIInput
                            label="Pincode"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                        />
                    </div>
                    <div style={inputContainer}>
                        <MUIInput
                            label="Locality"
                            value={locality}
                            onChange={(e) => setLocality(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flexRow">
                    <div style={inputContainer}>
                        <MUIInput
                            label="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flexRow">
                    <div style={inputContainer}>
                        <MUIInput
                            label="City/District/Town"
                            value={cityDistrictTown}
                            onChange={(e) =>
                                setCityDistrictTown(e.target.value)
                            }
                        />
                    </div>
                    <div style={inputContainer}>
                        <MUIInput
                            label="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flexRow">
                    <div style={inputContainer}>
                        <MUIInput
                            label="Landmark (Optional)"
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                        />
                    </div>
                    <div style={inputContainer}>
                        <MUIInput
                            label="Alternate Phone (Optional)"
                            value={alternatePhone}
                            onChange={(e) => setAlternatePhone(e.target.value)}
                        />
                    </div>
                </div>
                <div style={{ margin: "15px 0px" }}>
                    <label
                        style={{
                            fontSize: "15px",
                            color: "#878787",
                        }}
                    >
                        Address Type
                    </label>
                    <div
                        style={{ marginTop: "8px", fontSize: "15px" }}
                        className="flexRow"
                    >
                        <div style={{ marginRight: "20px" }}>
                            <input
                                type="radio"
                                onClick={() => setAddressType("home")}
                                name="addressType"
                                value="home"
                            />
                            <span style={{ marginLeft: "5px" }}>Home</span>
                        </div>
                        <div>
                            <input
                                type="radio"
                                onClick={() => setAddressType("work")}
                                name="addressType"
                                value="work"
                            />
                            <span style={{ marginLeft: "5px" }}>Work</span>
                        </div>
                    </div>
                </div>
                <div className="flexRow">
                    <MUIButton
                        title="SAVE AND DELIVER HERE"
                        onClick={onAddressSubmit}
                        style={{
                            width: "250px",
                        }}
                    />
                </div>
            </>
        );
    };

    return (
        <div className="checkoutStep" style={{ background: "#f5faff" }}>
            <div className={`checkoutHeader nonActive`}>
                <div>
                    <span className="stepNumber">+</span>
                    <span className="stepTitle">{"ADD NEW ADDRESS"}</span>
                </div>
            </div>
            <div
                style={{
                    padding: "0 60px",
                    paddingBottom: "20px",
                    boxSizing: "border-box",
                }}
            >
                {renderAddressForm()}
            </div>
        </div>
    );
}

export default AddressForm;
