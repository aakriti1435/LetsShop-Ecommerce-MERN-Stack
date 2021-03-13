import React from "react";
import { BiRupee } from "react-icons/bi";

function Price(props) {
    return (
        <div
            style={{
                fontSize: props.fontSize ? props.fontSize : "14px",
                fontWeight: "bold",
                margin: "5px 0",
            }}
        >
            <BiRupee style={{ marginBottom: "-3px", fontSize: "16px" }} />
            {props.value}
        </div>
    );
}

export default Price;
