import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/GenericUI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../actions/user';

function SignUp() {

    const user = useSelector(state => state.auth);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPasssword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const userSignUp = (e) => {
        e.preventDefault();
        const user = { firstName, lastName, email, password };
        dispatch(signup(user));
    };

    if (user.authenticate) {
        return <Redirect to={`/`} />
    };

    if (user.loading) {
        return <p>Loading.....</p>
    };

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignUp}>
                            <Row>
                                <Col md={6}>
                                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} label="First Name" type="text" placeholder="First Name" />
                                </Col>
                                <Col md={6}>
                                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} label="Last Name" type="text" placeholder="Last Name" />
                                </Col>
                            </Row>
                            <Input value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" type="email" placeholder="Email Address" />
                            <Input value={password} onChange={(e) => setPasssword(e.target.value)} label="Password" type="password" placeholder="Password" />
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default SignUp
