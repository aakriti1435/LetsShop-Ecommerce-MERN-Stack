import React, { useEffect } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn } from './actions/user';
import { useDispatch, useSelector } from 'react-redux';
import Products from './containers/Products/Products';
import Orders from './containers/Orders/Orders';
import Category from './containers/Category/Category';
import { getAllCategories } from "./actions/actions";

function App() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);

    useEffect(() => {
        if (!user.authenticate)
            dispatch(isUserLoggedIn());
        
        dispatch(getAllCategories());
    }, []);

    return (
        <div className="app">
            <Switch>
                <Route exact path='/signIn' component={SignIn} />
                <Route exact path='/signUp' component={SignUp} />

                <PrivateRoute exact path='/category' component={Category} />
                <PrivateRoute exact path='/products' component={Products} />
                <PrivateRoute exact path='/orders' component={Orders} />
                <PrivateRoute exact path='/' component={Home} />
            </Switch>
        </div>
    );
}

export default App;
