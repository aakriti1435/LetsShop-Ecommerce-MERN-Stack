import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsBySlug } from "../../actions/actions";
import Layout from "../../components/Layout/Layout";

function ProductList(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        const { match } = props;
        dispatch(getProductsBySlug(match.params.slug));
    }, []);

    return <Layout>ProductList</Layout>;
}

export default ProductList;
