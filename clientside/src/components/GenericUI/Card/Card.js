import React from "react";
import "./Card.css";

function Card(props) {
    return (
        <div className="card" {...props}>
            {(props.headerleft || props.headerRight) && (
                <div className="cardHeader">
                    {props.headerleft && (
                        <div
                            style={{
                                alignSelf: "center",
                                fontSize: "20px",
                                fontWeight: "500",
                            }}
                        >
                            {props.headerleft}
                        </div>
                    )}
                    {props.headerRight && props.headerRight}
                </div>
            )}

            {props.children}
        </div>
    );
}

export default Card;
