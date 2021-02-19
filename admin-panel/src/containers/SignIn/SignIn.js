import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/GenericUI/Input';
import { isUserLoggedIn, login } from '../../actions/user';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


function SignIn() {

    const [email, setEmail] = useState('');
    const [password, setPasssword] = useState('');
    const [error, setError] = useState('');
    const user = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.authenticate)
            dispatch(isUserLoggedIn());
    }, []);

    const userLogin = (e) => {
        e.preventDefault();
        const user = { email, password };
        dispatch(login(user));
    };

    if (user.authenticate) {
        return <Redirect to={`/`} />
    }

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
