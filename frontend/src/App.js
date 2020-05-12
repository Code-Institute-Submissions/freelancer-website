import { hot } from "react-hot-loader";
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import WaitingListPage from './pages/WaitingListPage';
import { connect } from 'react-redux';
import * as actions from './actions'
import { Layout } from "antd";


import Login from "./containers/Login";
import Dashboard from './containers/Dashboard';
import Spinner from './components/accessories';
import QuoteRouter from "./containers/Quoute/QuoteRouter";
import Welcome from "./containers/Welcome";
import Header from './containers/Header';
function App(props) {

    const { Footer } = Layout;
    console.log(window.location.pathname);
    const { authenticated, isLoading } = props.userState;
    const { password_changed } = props.profileState;
    const welcomePath = window.location.pathname === '/welcome'
    console.log(password_changed);

    useEffect(() => {
        props.handleAuthentication();
        props.handleAcceptingProject();
        props.handleServicesFetch();


        if (authenticated && !isLoading) {
            props.handleProjectsFetch();
            // get user profile using the the id stored n session storage
            props.handleProfileFetch(sessionStorage.getItem('auth'))


        }

    }, [])

    console.log(password_changed === '0');

    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={(props) => {
                if (isLoading) {
                    return <Spinner size='large' />
                } else if (!authenticated) {
                    return <Redirect to="/login" />;

                } else if (welcomePath) {
                    return <Component {...props} />
                } else if (password_changed === '0') {
                    return <Redirect to='/welcome' />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    );

    if (isLoading) {
        return <Spinner size='large' />
    }





    return (
        <Router>
            <Header {...props.userState} />
            <main style={{ minHeight: '83vh' }}>
                <Switch>

                    <PrivateRoute exact path='/dashboard' component={Dashboard} />
                    <PrivateRoute path='/welcome' component={Welcome} />
                    <Route path='/get-quote' component={QuoteRouter} />
                    <Route path='/waiting-list' component={WaitingListPage} />

                    <Route path='/login' component={Login} />
                </Switch>
            </main>
            <Footer>
                <div className='container'>
                    Footer
                </div>
            </Footer>
        </Router >

    )
}

function mapStateToProps(state) {
    return {
        userState: state.userReducer,
        profileState: state.profileReducer
    }
}


App = connect(mapStateToProps, actions)(App)
export default hot(module)(App);