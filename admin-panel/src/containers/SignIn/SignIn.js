import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/GenericUI/Input';
import { login } from '../../actions/user';
import { useDispatch } from 'react-redux';


function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPasssword] = useState('');
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const userLogin = (e) => {
        e.preventDefault();
        const user = { email, password };
        dispatch(login(user));
    };

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
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

export default SignIn;
