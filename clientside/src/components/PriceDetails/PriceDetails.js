import React from "react";
import Card from "../GenericUI/Card/Card";
import "./PriceDetails.css";

function PriceDetails(props) {
    return (
        <Card headerLeft={"Price Details"} style={{ maxWidth: "380px" }}>
            <div
                style={{
                    padding: "20px",
                    boxSizing: "border-box",
                }}
            >
                <div className="pdetails">
                    <span>PRICE DETAILS</span>
                </div>

                <div className="flexRow sb" style={{ margin: "15px 0" }}>
                    <div>Price ({props.totalItem} items)</div>
                    <div>{props.totalPrice}</div>
                </div>
                <div className="flexRow sb" style={{ margin: "15px 0" }}>
                    <div>Delivery Charges</div>
                    <div>FREE</div>
                </div>
                <div
                    className="flexRow sb"
                    style={{
                        margin: "15px 0",
                        borderTop: "2px solid #ececec",
                        borderBottom: "2px solid #ececec",
                        padding: "10px 0",
                        fontSize: "19px",
                        fontWeight: "500",
                    }}
                >
                    <div>Total Amount</div>
                    <div>{props.totalPrice}</div>
                </div>
                <div
                    className="flexRow sb"
                    style={{ marginTop: "15px", color: "#388e3c" }}
                >
                    <div>Your Total Savings on this Order is </div>
                </div>
            </div>
        </Card>
    );
}

export default PriceDetails;
