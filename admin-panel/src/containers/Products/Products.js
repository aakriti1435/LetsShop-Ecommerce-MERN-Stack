import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    addCategory,
    addProduct,
    getAllCategories,
} from "../../actions/actions";
import Input from "../../components/GenericUI/Input";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/GenericUI/Modal";
import "./Products.css";
import { generatePublicUrl } from "../../urlConfig";
import { createCategoryList } from "../../helpers/linearCategories";

function Products() {
    const [show, setShow] = useState(false);
    const [showPDModal, setShowPDModal] = useState(false);

    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productPictures, setProductPictures] = useState([]);

    const [productDetails, setProductDetails] = useState(null);

    const category = useSelector((state) => state.category);
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();
        form.append("name", productName);
        console.log(productName);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);
        for (let pic of productPictures) {
            form.append("productPicture", pic);
        }
        dispatch(addProduct(form));
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

    const handleProductImages = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
    };

    const renderAddProductsModal = () => {
        return (
            <Modal
                show={show}
                handleClose={handleClose}
                modalTitle={"Add New Product"}
            >
                <Input
                    type="text"
                    value={productName}
                    placeholder={`Enter Product Name`}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <Input
                    type="number"
                    value={quantity}
                    placeholder={`Enter Product Quantity `}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <Input
                    type="text"
                    value={price}
                    placeholder={`Enter Product Price`}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <Input
                    type="text"
                    value={description}
                    placeholder={`Enter Product Description`}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="form-control"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    {createCategoryList(category.categories).map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                {productPictures.length > 0 ? (
                    <ul
                        style={{
                            marginTop: "15px",
                            marginLeft: "-20px",
                        }}
                    >
                        {productPictures.map((pic) => (
                            <li>{pic.name}</li>
                        ))}
                    </ul>
                ) : null}
                <Input
                    style={{ marginTop: "17px" }}
                    type="file"
                    onChange={handleProductImages}
                    name="productPicture"
                />
            </Modal>
        );
    };

    const handleClosePDModal = () => {
        setShowPDModal(false);
    };
    const handleShowPDModal = (product) => {
        setProductDetails(product);
        setShowPDModal(true);
        console.log(product);
    };

    const renderProductDetailsModal = () => {
        if (!productDetails) return null;
        return (
            <Modal
                show={showPDModal}
                handleClose={handleClosePDModal}
                modalTitle={"Product Details"}
                size="lg"
            >
                <Row>
                    <Col md="6">
                        <label className="key">Name</label>
                        <p className="value">{productDetails.name}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Price</label>
                        <p className="value">{productDetails.price}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="6">
                        <label className="key">Quantity</label>
                        <p className="value">{productDetails.quantity}</p>
                    </Col>
                    <Col md="6">
                        <label className="key">Category</label>
                        <p className="value">{productDetails.category.name}</p>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <label className="key">Description</label>
                        <p className="value">{productDetails.description}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label className="key">Product Pictures</label>
                        <div style={{ display: "flex" }}>
                            {productDetails.productPictures.map((picture) => (
                                <div className="productImgContainer">
                                    <img
                                        src={generatePublicUrl(picture.img)}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Modal>
        );
    };

    const renderProducts = () => {
        return (
            <Table bordered hover style={{ fontSize: 16 }} responsive="sm">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {product && product.products.length > 0
                        ? product.products.map((p) => (
                              <tr
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleShowPDModal(p)}
                                  key={p._id}
                              >
                                  <td>{p._id}</td>
                                  <td>{p.name}</td>
                                  <td>{p.price}</td>
                                  <td>{p.quantity}</td>
                                  <td>{p.category.name}</td>
                                  <td>--</td>
                              </tr>
                          ))
                        : null}
                </tbody>
            </Table>
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
                            <h3>Products</h3>
                            <div className="btnContainers">
                                <span>Actions: </span>
                                <button onClick={handleShow}>Add</button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>{renderProducts()}</Col>
                </Row>
                {renderAddProductsModal()}
                {renderProductDetailsModal()}
            </Container>
        </Layout>
    );
}

export default Products;
