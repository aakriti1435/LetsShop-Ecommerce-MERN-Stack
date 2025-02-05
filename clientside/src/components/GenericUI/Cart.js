import React from "react";
import { IoIosCart } from "react-icons/io";

function Cart(props) {
    return (
        <div style={{ fontSize: "20px", position: "relative" }}>
            <span
                style={{
                    position: "absolute",
                    background: "red",
                    width: "15px",
                    height: "15px",
                    borderRadius: "5px",
                    fontSize: "10px",
                    border: "1px solid #fff",
                    textAlign: "center",
                    alignSelf: "center",
                    top: "-12px",
                    right: "-6px",
                }}
            >
                {props.count}
            </span>
            <IoIosCart style={{ marginBottom: "-3px" }} />
        </div>
    );
}

export default Cart;
