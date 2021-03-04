import React from "react";
import Modal from "../../../components/GenericUI/Modal";
import { Row, Col } from "react-bootstrap";
import Input from "../../../components/GenericUI/Input";

const UpdateCategoryModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        size,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList,
    } = props;
    return (
        <Modal
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            size={size}
        >
            <Row>
                <Col>
                    <h6>
                        <b>Expanded Categories</b>
                    </h6>
                </Col>
            </Row>
            {expandedArray.length > 0 &&
                expandedArray.map((item, index) => (
                    <Row key={index}>
                        <Col>
                            <Input
                                type="text"
                                value={item.name}
                                placeholder={`Enter Category Name`}
                                onChange={(e) =>
                                    handleCategoryInput(
                                        "name",
                                        e.target.value,
                                        index,
                                        "expanded"
                                    )
                                }
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) =>
                                    handleCategoryInput(
                                        "parentId",
                                        e.target.value,
                                        index,
                                        "expanded"
                                    )
                                }
                            >
                                <option>Select Category</option>
                                {categoryList.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </Col>
                        <Col>
                            <select
                                value={item.type}
                                onChange={(e) =>
                                    handleCategoryInput(
                                        "type",
                                        e.target.value,
                                        index,
                                        "expanded"
                                    )
                                }
                                className="form-control"
                            >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                ))}

            <Row>
                <Col>
                    <h6>
                        <b>Checked Categories</b>
                    </h6>
                </Col>
            </Row>
            {checkedArray.length > 0 &&
                checkedArray.map((item, index) => (
                    <Row key={index}>
                        <Col>
                            <Input
                                type="text"
                                value={item.name}
                                placeholder={`Enter Category Name`}
                                onChange={(e) =>
                                    handleCategoryInput(
                                        "name",
                                        e.target.value,
                                        index,
                                        "checked"
                                    )
                                }
                            />
                        </Col>
                        <Col>
                            <select
                                className="form-control"
                                value={item.parentId}
                                onChange={(e) =>
                                    handleCategoryInput(
                                        "parentId",
                                        e.target.value,
                                        index,
                                        "checked"
                                    )
                                }
                            >
                                <option>Select Category</option>
                                {categoryList.map((option) => (
                                    <option
                                        key={option.value}
                                        value={option.value}
                                    >
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </Col>
                        <Col>
                            <select
                                value={item.type}
                                onChange={(e) =>
                                    handleCategoryInput(
                                        "type",
                                        e.target.value,
                                        index,
                                        "checked"
                                    )
                                }
                                className="form-control"
                            >
                                <option value="">Select Type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                ))}
        </Modal>
    );
};

export default UpdateCategoryModal;
