import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    Typography,
    Form,
    Row,
    Col,
    Input,
    Button,
    Card
} from 'antd';
import { postAuth } from '../utils/requests';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions'
function Welcome(props) {
    const { profileState, history, handleChangePassword } = props;
    const [state, setState] = useState('')
    const onPasswordChange = values => {

        const token = sessionStorage.getItem('token')

        postAuth({
            token,
            url: '/api/password/change',
            body: values
        }).then(res => {
            if (res) {
                handleChangePassword()
                history.push('/dashboard')
            }

        }).catch(error => {
            console.log(error);
            setState(error.message)
        })

    }
    return (

        <section id='welcome'>
            <div className='container'>
                <Row justify='center'>
                    <Card className=' p-2 mt-10' md={10}>
                        <div className='text-center'>
                            <Typography.Title level={1}>
                                Welcome {profileState.first_name}
                            </Typography.Title>
                            <Typography.Text>
                                Before you continue, please change your password with your own.
                        </Typography.Text>
                        </div>
                        <Form

                            onFinish={onPasswordChange}
                            className='mt-2' labelCol={{ span: 24 }}>
                            <Form.Item

                                validateStatus={state ? 'error' : null}
                                name='password_old'
                                label='Old Password'
                                help={state ? state : null}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your old password!'
                                    }
                                ]}>

                                <Input onChange={() => setState('')} type='password' />
                            </Form.Item>



                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter a new password!'
                                    },
                                    () => ({
                                        validator(rule, value) {

                                            if (!value || value.length < 7) {

                                                return Promise.reject('Password must be at least 7 characters!')
                                            }

                                            return Promise.resolve()
                                        }
                                    })


                                ]}
                                name='password_new'
                                label='New Password'>
                                <Input type='password' />
                            </Form.Item>



                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter confirm new password!'
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {

                                            if (!value || getFieldValue('password_new') !== value) {

                                                return Promise.reject('Passwords does not match!')
                                            }

                                            return Promise.resolve()
                                        }
                                    })

                                ]}
                                name='password_confirm'
                                label='Confirm Password'>
                                <Input type='password' />
                            </Form.Item>

                            <Form.Item >
                                <Button htmlType='submit' type='primary'>
                                    Change Password
                                    </Button>
                            </Form.Item>
                        </Form>
                    </Card>

                </Row>

            </div>
        </section>



    )
}

const mapStateToProps = state => {
    return {
        profileState: state.profileReducer
    }
}

export default connect(mapStateToProps, actions)(withRouter(Welcome));