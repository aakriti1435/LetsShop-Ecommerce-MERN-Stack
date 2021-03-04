import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductDetailsById } from "../../actions/product";
import Layout from "../../components/Layout/Layout";

function ProductDetails(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        const { productId } = props.match.params;
        const payload = {
            params: { productId },
        };
        console.log("Payload", payload);
        dispatch(getProductDetailsById(payload));
    }, []);

    return (
        <div>
            <Layout></Layout>
        </div>
    );
}

export default ProductDetails;
