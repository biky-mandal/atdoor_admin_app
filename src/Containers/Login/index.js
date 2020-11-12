import React, { useState } from 'react';
import Layout from '../../Components/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../Components/UI/index';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { Login_Action } from '../../Actions/index';
import { Redirect } from 'react-router-dom';
import Loading from '../../Components/Loader';


/**
* @author
* @function Login_Page
**/

const Login_Page = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Creating dispatch hook
    const dispatch = useDispatch();
    // getting state
    const auth = useSelector(state => state.auth);

    // UserLogin Function. This function Runs when the login form is submitted.

    const userLogin = (e) => {
        e.preventDefault();

        // Getting from the local state input
        const user = {
            email, password
        }
        dispatch(Login_Action(user));
    }

    if (auth.authenticate) {
        return <Redirect to={'/'} />
    }
    const renderLoader = () => {
        // return <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
        return <Loading />
    }


    return (
        <Layout>
            <div className="login-div">
                {auth.authenticating ? renderLoader() : null}
                <div className="form-div-login">
                    <Container>
                        <Row style={{ marginTop: '5rem' }}>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Form onSubmit={userLogin}>
                                    <Input
                                        className="inpt-lbl"
                                        label="Email"
                                        placeholder="Email"
                                        value={email}
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <Input
                                        className="inpt-lbl"
                                        label="Password"
                                        placeholder="Password"
                                        value={password}
                                        type="password"
                                        errorMessage={auth.errorMessage ? auth.errorMessage : null}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Row>
                                        <Col md={{ offset: 4 }}>
                                            <Button variant="primary" className="login-btn" type="submit">
                                                Login
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </Layout>
    )

}

export default Login_Page