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

function Products() {
    const [show, setShow] = useState(false);

    const [productName, setProductName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [productPictures, setProductPictures] = useState([]);

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

    const handleProductImages = (e) => {
        setProductPictures([...productPictures, e.target.files[0]]);
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
                    {product.products.length > 0
                        ? product.products.map((p) => (
                              <tr key={p._id}>
                                  <td>{p._id}</td>
                                  <td>{p.name}</td>
                                  <td>{p.price}</td>
                                  <td>{p.quantity}</td>
                                  <td>hey</td>
                                  <td>hey</td>
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
                        {createCategoryList(category.categories).map(
                            (option) => (
                                <option key={option.value} value={option.value}>
                                    {option.name}
                                </option>
                            )
                        )}
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
                    <input
                        style={{ marginTop: "5px" }}
                        type="file"
                        onChange={handleProductImages}
                        name="productPicture"
                    />
                </Modal>
            </Container>
        </Layout>
    );
}

export default Products;
