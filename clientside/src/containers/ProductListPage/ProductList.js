import React from "react";
import Layout from "../../components/Layout/Layout";

import "./ProductList.css";
import ProductStore from "./ProductStore/ProductStore";

function ProductList(props) {
    return (
        <Layout>
            <ProductStore {...props} />
        </Layout>
    );
}

export default ProductList;
