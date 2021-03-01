import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions/actions";
import Input from "../../components/GenericUI/Input";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/GenericUI/Modal";
import "./Category.css";

function Category() {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");

    const category = useSelector((state) => state.category);
    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();
        form.append("name", categoryName);
        form.append("parentId", parentCategoryId);
        form.append("categoryImg", categoryImage);
        dispatch(addCategory(form));
        setCategoryName("");
        setParentCategoryId("");
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category._id}>
                    {category.name}
                    {category.children.length > 0 ? (
                        <ul>{renderCategories(category.children)}</ul>
                    ) : null}
                </li>
            );
        }

        return myCategories;
    };

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
                type: category.type,
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    return (
        <Layout sidebar>
            <Container>
                {" "}
                <Row>
                    <Col md={12}>
                        <div
                            style={{
                                marginTop: "25px",
                                marginBottom: "15px",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <h3>Category</h3>
                            <div className="btnContainers">
                                <span>Actions: </span>
                                <button onClick={handleShow}>Add</button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <ul>{renderCategories(category.categories)}</ul>
                    </Col>
                </Row>
                <Modal
                    show={show}
                    handleClose={handleClose}
                    modalTitle={"Add New Category"}
                >
                    <Input
                        type="text"
                        value={categoryName}
                        placeholder={`Enter Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <select
                        className="form-control"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}
                    >
                        <option>Select Category</option>
                        {createCategoryList(category.categories).map(
                            (option) => (
                                <option key={option.value} value={option.value}>
                                    {option.name}
                                </option>
                            )
                        )}
                    </select>
                    <input
                        style={{ marginTop: "15px" }}
                        type="file"
                        onChange={handleCategoryImage}
                        name="categoryImage"
                    />
                </Modal>
            </Container>
        </Layout>
    );
}

export default Category;
