import React from "react";
import Layout from "../../components/Layout/Layout";
import getParams from "../../utils/getParams";
import "./ProductList.css";
import ProductPage from "./ProductPage/ProductPage";
import ProductStore from "./ProductStore/ProductStore";

function ProductList(props) {
    const renderProducts = () => {
        const params = getParams(props.location.search);
        console.log(params);

        let content = null;
        switch (params.type) {
            case "store":
                content = <ProductStore {...props} />;
                break;

            case "page":
                content = <ProductPage {...props} />;
                break;

            default:
                content = null;
        }
        return content;
    };

    return <Layout>{renderProducts()}</Layout>;
}

export default ProductList;
