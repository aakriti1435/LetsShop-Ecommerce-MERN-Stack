import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/GenericUI/Modal";
import { Row, Col, Container } from "react-bootstrap";
import Input from "../../components/GenericUI/Input";
import { createCategoryList } from "../../helpers/linearCategories";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions/page";

const Page = () => {
    const category = useSelector((state) => state.category);

    const [show, setShow] = useState(false);
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [banners, setBanners] = useState([]);
    const [products, setProducts] = useState([]);
    const page = useSelector((state) => state.page);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(page);
        if (!page.loading) {
            setShow(false);
            setTitle("");
            setCategoryId("");
            setDesc("");
            setProducts([]);
            setBanners([]);
        }
    }, [page]);

    useEffect(() => {
        setCategories(createCategoryList(category.categories));
        console.log(categories);
    }, [category]);

    const handleBannerImages = (e) => {
        setBanners([...banners, e.target.files[0]]);
    };

    const handleProductImages = (e) => {
        setProducts([...products, e.target.files[0]]);
    };

    const onCategoryChange = (e) => {
        const category = categories.find((c) => c.value == e.target.value);
        console.log(">>>", category);
        setCategoryId(e.target.value);
        setType(category.type);
    };

    const createPageHandleClose = (e) => {
        const form = new FormData();

        if (title === "" || desc === "") {
            alert("Form Not Filled Correctly. Try Again");
            setShow(false);
        }

        form.append("title", title);
        form.append("description", desc);
        form.append("category", categoryId);
        form.append("type", type);
        banners.forEach((banner, index) => {
            form.append("banners", banner);
        });
        products.forEach((product, index) => {
            form.append("products", product);
        });

        dispatch(createPage(form));
        setShow(false);
    };

    const renderCreatePageModal = () => {
        return (
            <Modal
                show={show}
                size="lg"
                modalTitle={"Create New Page"}
                handleClose={createPageHandleClose}
            >
                <Row>
                    <Col>
                        <Input
                            type="select"
                            value={categoryId}
                            onChange={onCategoryChange}
                            options={categories}
                            placeholder={"Select Category"}
                        />
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
                        <label
                            style={{
                                marginBottom: "-20px !important",
                                marginLeft: "5px",
                                fontWeight: "600",
                            }}
                        >
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
                {banners.length > 0 ? (
                    <ul
                        style={{
                            marginLeft: "-20px",
                        }}
                    >
                        {banners.map((banner, index) => (
                            <li key={index}>{banner.name}</li>
                        ))}
                    </ul>
                ) : null}

                <Row>
                    <Col md={4}>
                        <label style={{ marginLeft: "5px", fontWeight: "600" }}>
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
                {products.length > 0 ? (
                    <ul
                        style={{
                            marginLeft: "-20px",
                        }}
                    >
                        {products.map((product, index) => (
                            <li key={index}>{product.name}</li>
                        ))}
                    </ul>
                ) : null}
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
