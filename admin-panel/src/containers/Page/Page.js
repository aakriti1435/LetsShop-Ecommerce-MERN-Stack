import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/GenericUI/Modal";
import { Row, Col, Container } from "react-bootstrap";
import Input from "../../components/GenericUI/Input";
import { createCategoryList } from "../../helpers/linearCategories";
import { useSelector } from "react-redux";

const Page = () => {
    const category = useSelector((state) => state.category);

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [desc, setDesc] = useState("");
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setCategories(createCategoryList(category.categories));
        console.log(categories);
    }, []);

    const handleBannerImages = (e) => {
        console.log(e);
    };

    const handleProductImages = (e) => {
        console.log(e);
    };

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={show}
                size="lg"
                modalTitle={"Create New Page"}
                handleClose={() => setShow(false)}
            >
                <Row style={{ marginBottom: "17px" }}>
                    <Col>
                        <select
                            className="form-control"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                                <option value={c.value}>{c.name}</option>
                            ))}
                        </select>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            type="text"
                            placeholder={"Enter Page Title"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        ></Input>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            type="text"
                            placeholder={"Enter Page Description"}
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        ></Input>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <label style={{ marginLeft: "5px", fontWeight: "500" }}>
                            Upload Banner Images
                        </label>
                    </Col>
                    <Col md={8}>
                        <Input
                            type="file"
                            name="banners"
                            onChange={handleBannerImages}
                        ></Input>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <label style={{ marginLeft: "5px", fontWeight: "500" }}>
                            Upload Product Images
                        </label>
                    </Col>
                    <Col md={8}>
                        <Input
                            type="file"
                            name="products"
                            onChange={handleProductImages}
                        ></Input>
                    </Col>
                </Row>
            </Modal>
        );
    };

    return (
        <Layout sidebar>
            <Container>
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
                            <h3>Pages</h3>
                            <div className="btnContainers">
                                <span>Actions: </span>
                                <button onClick={(e) => setShow(true)}>
                                    Create Page
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            {renderCreatePageModal()}
        </Layout>
    );
};

export default Page;
