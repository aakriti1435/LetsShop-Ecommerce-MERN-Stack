import React, { useState } from "react";
import { generatePublicUrl } from "../../../urlConfig";
import "./CartItem.css";

function CartItem(props) {
    const [qty, setQty] = useState(props.cartItem.qty);

    const { _id, name, price, img } = props.cartItem;

    const onQtyIncrement = () => {
        setQty(qty + 1);
        props.onQtyIncrement(_id, qty + 1);
    };

    const onQtyDecrement = () => {
        if (qty <= 1) return;
        setQty(qty - 1);
        props.onQtyDecrement(_id, qty - 1);
    };

    return (
        <div className="cartItemContainer">
            <div className="flexRow">
                <div className="cartProImgContainer">
                    <img src={generatePublicUrl(img)} alt={""} />
                </div>
                <div className="cartItemDetails">
                    <div>
                        <p className="name">{name}</p>
                        <p className="pp">Rs. {price}</p>
                    </div>
                    <div>Delivery in 3 - 5 days</div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    margin: "5px 0",
                }}
            >
                <div className="quantityControl">
                    <button onClick={onQtyDecrement}>-</button>
                    <input value={qty} readOnly />
                    <button onClick={onQtyIncrement}>+</button>
                </div>
                <button className="cartActionBtn">Save for later</button>
                <button className="cartActionBtn">Remove</button>
            </div>
        </div>
    );
}

export default CartItem;
