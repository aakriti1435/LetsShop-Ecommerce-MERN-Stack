import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../../components/Layout/Layout';
import './Category.css';

function Category() {
    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <h3>Category</h3>
                            <div className="btnContainers">
                                <span>Actions: </span>
                                <button>Add</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Category;
