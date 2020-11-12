import React, { useState } from 'react';
import Layout from '../../Components/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../Components/UI/index';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { Register_Action } from '../../Actions';
import { Redirect } from 'react-router-dom';
import Loading from '../../Components/Loader';

/**
* @author
* @function SignUp_Page
**/

const SignUp_Page = (props) => {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth)

    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // this function will run when signup form is submitted.
    const signup = (e) => {
        e.preventDefault();

        const user = {
            firstName, lastName, email, password
        }
        dispatch(Register_Action(user));
    }
    // performing spme user experience.
    if(auth.toLoginPage){
        return <Redirect to ={'/login'} />
    }

    const renderLoader = () => {
        // return <Loader type="TailSpin" color="#00BFFF" height={40} width={40} />
        return <Loading/>
    }
    return (
        <Layout>
            <div className="signup-div">
            {auth.loading ? renderLoader() : null}
                <div className="form-div-signup">
                    <Container>
                        <Row style={{ marginTop: '5rem' }}>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Form onSubmit={signup}>
                                    <Row>
                                        <Col md={6}>
                                            <Input
                                                label="First Name"
                                                placeholder="First Name"
                                                value={firstName}
                                                type="text"
                                                onChange={(e) => setfirstName(e.target.value)}
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <Input
                                                label="Last Name"
                                                placeholder="Last Name"
                                                value={lastName}
                                                type="text"
                                                onChange={(e) => setlastName(e.target.value)}
                                            />
                                        </Col>
                                    </Row>
                                    <Input
                                        label="Email"
                                        placeholder="Email"
                                        value={email}
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <Input
                                        label="Password"
                                        placeholder="Password"
                                        value={password}
                                        type="password"
                                        errorMessage={auth.errorMessage ? auth.errorMessage : null}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Row>
                                        <Col md={{ offset: 4 }}>
                                            <Button variant="primary" className="signup-btn" type="submit">
                                                Register
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

export default SignUp_Page