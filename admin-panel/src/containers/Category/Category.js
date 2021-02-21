import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../../actions/actions';
import Layout from '../../components/Layout/Layout';
import './Category.css';

function Category() {

    const category = useSelector((state) => state.category)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategories());
    }, []);

    const renderCategories = (categories) => {
        console.log(">>>>", categories);
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category._id}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            )
        };

        return myCategories;
    }

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
                <Row>
                    <Col md={12}>
                        <ul>
                            {renderCategories(category.categories)}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Category;
