import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/GenericUI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function SignUp() {

    const user = useSelector(state => state.auth);

    if (user.authenticate) {
        return <Redirect to={`/`} />
    };

    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input value="" onChange={() => { }} label="First Name" type="text" placeholder="First Name" />
                                </Col>
                                <Col md={6}>
                                    <Input value="" onChange={() => { }} label="Last Name" type="text" placeholder="Last Name" />
                                </Col>
                            </Row>
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

export default SignUp
