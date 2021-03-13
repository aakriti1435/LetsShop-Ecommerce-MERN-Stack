import React from "react";
import { IoIosStar } from "react-icons/io";

function Rating(props) {
    return (
        <span
            style={{
                display: "inline-block",
                background: "#388e3c",
                color: "#fff",
                fontWeight: "400",
                fontSize: "12px",
                borderRadius: "3px",
                padding: "4px 7px",
            }}
        >
            {props.value} <IoIosStar style={{ marginBottom: "-2px" }} />
        </span>
    );
}

export default Rating;
