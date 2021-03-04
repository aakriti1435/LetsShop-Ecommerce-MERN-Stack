import React, { useEffect } from "react";
import "./App.css";
import Home from "./containers/HomePage/Home";
import { Route, Switch } from "react-router-dom";
import ProductList from "./containers/ProductListPage/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn } from "./actions/user";
import ProductDetails from "./containers/ProductDetailsPage/ProductDetails";
import Cart from "./containers/CartPage/Cart";

function App() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);

    useEffect(() => {
        if (!auth.authenticate) {
            dispatch(isUserLoggedIn());
        }
    }, [auth.authenticate]);

    return (
        <div className="app">
            <Switch>
                <Route path="/cart" component={Cart} />
                <Route
                    path="/:produtSlug/:productId/p"
                    component={ProductDetails}
                />
                <Route path="/:slug" component={ProductList} />
                <Route path="/" exact component={Home} />
            </Switch>
        </div>
    );
}

export default App;
