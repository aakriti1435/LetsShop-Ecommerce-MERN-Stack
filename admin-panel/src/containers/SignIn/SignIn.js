import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import Input from '../../components/GenericUI/Input';
import { login } from '../../actions/user';


function SignIn() {
    return (
        <Layout>
            <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={() => login({ email: 'abc@gmail.com', password: '1234' })}>
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
