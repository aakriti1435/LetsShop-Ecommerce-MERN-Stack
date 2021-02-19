import React, {useEffect} from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home/Home';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn } from './actions/user';
import { useDispatch, useSelector } from 'react-redux';

function App() {

    const dispatch = useDispatch();
    const user = useSelector(state => state.auth);

    useEffect(() => {
        if (!user.authenticate)
            dispatch(isUserLoggedIn());
    }, []);

    return (
        <div className="app">
            <Switch>
                <Route exact path='/signIn' component={SignIn} />
                <Route exact path='/signUp' component={SignUp} />
                <PrivateRoute exact path='/' component={Home} />
            </Switch>
        </div>
    );
}

export default App;
