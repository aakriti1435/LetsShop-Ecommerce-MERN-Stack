import React, { useEffect } from "react";
import "./ProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import getParams from "../../../utils/getParams";
import { getProductPage } from "../../../actions/product";

const ProductPage = (props) => {
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);

    useEffect(() => {
        const params = getParams(props.location.search);
        const payload = { params };

        dispatch(getProductPage(payload));
    }, []);

    return <div>ProductPage</div>;
};

export default ProductPage;
