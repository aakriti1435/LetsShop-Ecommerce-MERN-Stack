import React from "react";
import Modal from "../../../components/GenericUI/Modal";
import Input from "../../../components/GenericUI/Input";
import { Col, Row } from "react-bootstrap";

const AddCategoryModal = (props) => {
    const {
        show,
        size,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        categoryType,
        setCategoryType,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
    } = props;
    return (
        <Modal
            show={show}
            size={size}
            handleClose={handleClose}
            modalTitle={modalTitle}
        >
            <Row>
                <Col>
                    <Input
                        type="text"
                        value={categoryName}
                        placeholder={`Enter Category Name`}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Col>
                <Col>
                    <select
                        className="form-control"
                        value={parentCategoryId}
                        onChange={(e) => setParentCategoryId(e.target.value)}
                    >
                        <option>Select Category</option>
                        {categoryList.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </Col>
                <Col>
                    <select
                        className="form-control"
                        value={categoryType}
                        onChange={(e) => setCategoryType(e.target.value)}
                    >
                        <option value="">Select Type</option>
                        <option value="store">Store</option>
                        <option value="product">Product</option>
                        <option value="page">Page</option>
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input
                        type="file"
                        onChange={handleCategoryImage}
                        name="categoryImage"
                    />
                </Col>
            </Row>
        </Modal>
    );
};

export default AddCategoryModal;
