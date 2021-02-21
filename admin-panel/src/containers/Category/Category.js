import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { getAllCategories } from '../../actions/actions';
import Layout from '../../components/Layout/Layout';
import './Category.css';

function Category() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

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
