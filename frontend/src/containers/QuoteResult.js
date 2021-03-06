import React, { useState } from 'react'
import {
    Col,
    Layout,
    Typography,
    Row,
    Button,
    Modal,
    Form,
    Input,
    Card,
    Space
} from 'antd'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { postRequest } from '../utils/requests'
import { QuoteButtonBack } from '../components/buttons';

/**
    * @module QuoteResult
    * @description this module shows the calculated price of the 
    * @since we are using the modal as the submit button, dont use
    *  the form onFinish as the trigger
    */

function QuoteResult(props) {
    const { quoteState, history, userState } = props;
    const [modalState, setModalState] = useState(false);
    // const [loginState, setLoginState] = useState({
    //     username: quoteState.email || '',
    //     password: ''
    // });

    const [form] = Form.useForm();


    const onClickButton = () => {
        if (!userState.authenticated) {
            // promise to check if the user exist
            const checkUserExist = postRequest({
                url: '/api/user/check',
                body: { email: quoteState.email }
            })
            checkUserExist.then(res => {
                if (res) {
                    // then stop the payment process

                    // prompt a login modal
                    return setModalState(true)
                }
            }).catch(error => {

                // if caugth any error means the user does not exist 
                // continue with the payment process
                if (error) {
                    props.handleQuoteChange({ current: quoteState.current + 1 })
                    history.push('/get-quote/payment')
                }
            })

        }
        if (userState.authenticated) {
            props.handleQuoteChange({ current: quoteState.current + 1 })
            history.push('/get-quote/payment')
        }



    }

    const onModalCancel = () => {
        setModalState(false)
    }


    const title = quoteState.project_type.charAt(0).toUpperCase() + quoteState.project_type.slice(1)
    return (
        <Layout.Content>
            <Row justify='center'>

                <Col md={11} className='text-center border border-circle'>
                    <Card>
                        <Typography.Title level={3}>{title} Estimated Price</Typography.Title>

                        <Typography.Title level={1}>€{quoteState.quote_price}</Typography.Title>
                        <Space>
                            <Button onClick={onClickButton} type='primary'>
                                Pay Now
                        </Button>

                            <QuoteButtonBack
                                current={quoteState.current}
                                handleQuoteChange={props.handleQuoteChange}
                                link='/get-quote/user' />

                        </Space>



                    </Card>
                </Col>

            </Row>
            <Form
                form={form}
                labelCol={{ span: 24 }}>
                <Modal
                    title="Your account already exist"
                    visible={modalState}
                    onCancel={onModalCancel}
                    onOk={async () => {
                        try {
                            const values = await form.validateFields();

                            const user_id = await props.handleLogin(values);

                            if (user_id) {
                                props.handleProfileFetch(user_id);
                                history.push('/get-quote/payment');
                            }

                        } catch (error) {
                            console.log(error);

                        }

                    }}
                    okText='Login'
                >

                    <Form.Item
                        name='username'
                        label='Username'
                        rules={[{ required: true, message: 'Please enter your username!' }]}
                    >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label='Password'
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input type='password'

                        />
                    </Form.Item>

                </Modal>
            </Form>
        </Layout.Content>
    )
}


export default connect(({ quoteReducer, userReducer }) =>
    ({
        quoteState: quoteReducer,
        userState: userReducer
    }), actions)(withRouter(QuoteResult));