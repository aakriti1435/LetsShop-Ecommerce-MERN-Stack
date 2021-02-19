import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/GenericUI/Input';
import { login } from '../../actions/user';
import { useDispatch } from 'react-redux';


function SignIn() {

    const dispatch = useDispatch();

    const userLogin = (e) => {
        e.preventDefault();
        const user = { email: 'abc@gmail.com', password: '1234' };
        dispatch(login(user));
    };

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input value="" onChange={() => { }} label="Email Address" type="email" placeholder="Email Address" />
                            <Input value="" onChange={() => { }} label="Password" type="password" placeholder="Password" />
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default SignIn;
