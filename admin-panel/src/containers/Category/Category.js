import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions/actions";
import Input from "../../components/GenericUI/Input";
import Layout from "../../components/Layout/Layout";
import Modal from "../../components/GenericUI/Modal";
import "./Category.css";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload,
} from "react-icons/io";

function Category() {
    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

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
            myCategories.push({
                label: category.name,
                value: category._id,
                children:
                    category.children.length > 0 &&
                    renderCategories(category.children),
            });
        }

        return myCategories;
    };

    //Creating a linear list
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

    const updateCategory = () => {
        setUpdateCategoryModal(true);
        const categories = createCategoryList(category.categories);

        const checkedArray = [];
        checked.length > 0 &&
            checked.forEach((categoryId, index) => {
                const category = categories.find(
                    (category, _index) => categoryId == category.value
                );
                category && checkedArray.push(category);
            });
        const expandedArray = [];
        expanded.length > 0 &&
            expanded.forEach((categoryId, index) => {
                const category = categories.find(
                    (category, _index) => categoryId == category.value
                );
                category && expandedArray.push(category);
            });

        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
    };

    const handleCategoryInput = (key, value, index, type) => {
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item
            );
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item
            );
            setExpandedArray(updatedExpandedArray);
        }
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
                                <button onClick={handleShow}>
                                    <IoIosAdd /> <span>Add</span>
                                </button>
                                <button>
                                    <IoIosTrash /> <span>Delete</span>
                                </button>
                                <button onClick={updateCategory}>
                                    <IoIosCloudUpload /> <span>Edit</span>
                                </button>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={(checked) => setChecked(checked)}
                            onExpand={(expanded) => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />,
                            }}
                        />
                    </Col>
                </Row>
                <Modal
                    show={updateCategoryModal}
                    handleClose={() => setUpdateCategoryModal(false)}
                    modalTitle={"Update Category"}
                    size="lg"
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
                                        {createCategoryList(
                                            category.categories
                                        ).map((option) => (
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
                                        {createCategoryList(
                                            category.categories
                                        ).map((option) => (
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
