import React from "react";
import "./App.css";
import Home from "./containers/HomePage/Home";
import { Route, Switch } from "react-router-dom";
import ProductList from "./containers/ProductListPage/ProductList";

function App() {
    return (
        <div className="app">
            <Switch>
                <Route path="/:slug" component={ProductList} />
                <Route path="/" exact component={Home} />
            </Switch>
        </div>
    );
}

export default App;
