import React from 'react';
import { Link } from 'react-router-dom';
import {

    Row,
    Col,
    Button,
    Avatar,
    Dropdown,
    Menu,
    Spin
} from 'antd';
import { connect } from 'react-redux';
import * as actions from '../actions';

function Header(props) {

    const { profileState, userState } = props;
    const first_name = profileState.first_name;
    const last_name = profileState.last_name;
    const menu = (
        <Menu>
            <Menu.Item>
                <Link to='/profile'>{first_name} {last_name}</Link>
            </Menu.Item>

            <Menu.Item >

                <span onClick={() => props.handleLogout()}>Logout</span>
            </Menu.Item>
        </Menu>
    );
    const AvatarRender = () => {
        return (
            <Dropdown overlay={menu}>
                <Avatar size='large'>
                    {first_name.charAt(0) + last_name.charAt(0)}
                </Avatar>
            </Dropdown>

        )
    }
    return (
        <>
            {!userState.authenticated && (<aside >
                <div className='container'>
                    <Row justify='end' >
                        <Link to='/login'>Client Login</Link>
                    </Row>
                </div>
            </aside>)}
            <header className="header">

                <Row className='container' justify='space-between d-flex content-center'>
                    <Col>
                        <Link to={userState.authenticated ? '/dashboard' : '/'}>
                            <img src='https://jomari-designs-2020.s3-eu-west-1.amazonaws.com/static/4934b82af4909d1dff4c003050a15d8e.svg' alt='brand-logo' />
                        </Link>
                        {!userState.authenticated && <Link
                            className='ml-2 color-white'
                            to={userState.authenticated ? '/dashboard' : '/'}>
                            Home
                        </Link>}
                        {userState.authenticated && (
                            <>
                                <Link
                                    className='ml-3 color-white'
                                    to='/dashboard'>Dashboard</Link>
                                <Link
                                    className='ml-2 color-white'
                                    to='/projects'>Projects</Link>

                            </>
                        )}
                        <Link
                            className='ml-2 color-white'
                            to='/works'>Works</Link>
                    </Col>
                    <Col>

                        {!userState.authenticated && (

                            <Button type='primary'>
                                <Link to='/get-quote'>Get started</Link>
                            </Button>

                        )}
                        {userState.authenticated && (

                            <AvatarRender />

                        )}


                    </Col>

                </Row>
            </header>
        </>
    )
}


const mapStateToProps = state => {
    return {
        profileState: state.profileReducer,
        userState: state.userReducer
    }
}
export default connect(mapStateToProps, actions)(Header);