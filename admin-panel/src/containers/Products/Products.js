import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, getAllCategories } from "../../actions/actions";
import Input from "../../components/GenericUI/Input";
import Layout from "../../components/Layout/Layout";
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
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getAllCategories());
    }, []);

    const handleClose = () => {
      const form = new FormData();
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
    console.log(productPictures);

    return (
      <Layout sidebar>
        <Container>
          <Row>
            <Col md={12}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Products</h3>
                <div className="btnContainers">
                  <span>Actions: </span>
                  <button onClick={handleShow}>Add</button>
                </div>
              </div>
            </Col>
          </Row>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                <ul style={{ marginTop: "15px", marginLeft: "-20px" }}>
                  {productPictures.map((pic) => (
                    <li>{pic.name}</li>
                  ))}
                </ul>
              ) : null}
              <input
                type="file"
                onChange={handleProductImages}
                name="productPicture"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </Layout>
    );
}

export default Products;
