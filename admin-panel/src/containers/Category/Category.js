import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    addCategory,
    getAllCategories,
    updateCategories,
    deleteCategories as deleteCategoriesAction,
} from "../../actions/actions";
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
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);

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

    const updateCheckedExpandedArray = () => {
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

    const updateCategory = () => {
        updateCheckedExpandedArray();
        setUpdateCategoryModal(true);
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

    const updateCategoryHandleClose = () => {
        const form = new FormData();
        expandedArray.forEach((item, index) => {
            form.append("_id", item.value);
            form.append("name", item.name);
            form.append("parentId", item.parentId ? item.parentId : "");
            form.append("type", item.type);
        });

        checkedArray.forEach((item, index) => {
            form.append("_id", item.value);
            form.append("name", item.name);
            form.append("parentId", item.parentId ? item.parentId : "");
            form.append("type", item.type);
        });

        dispatch(updateCategories(form)).then((result) => {
            if (result) dispatch(getAllCategories());
        });

        setUpdateCategoryModal(false);
    };

    const renderAddCategoryModal = () => {
        return (
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
                    {createCategoryList(category.categories).map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>
                <input
                    style={{ marginTop: "15px" }}
                    type="file"
                    onChange={handleCategoryImage}
                    name="categoryImage"
                />
            </Modal>
        );
    };

    const deleteCategoryHandleClose = () => {
        setDeleteCategoryModal(false);
    };

    const deleteCategory = () => {
        updateCheckedExpandedArray();
        setDeleteCategoryModal(true);
    };

    const deleteCategories = () => {
        const checkedIdsArray = checkedArray.map((item, index) => ({
            _id: item.value,
        }));
        const expandedIdsArray = expandedArray.map((item, index) => ({
            _id: item.value,
        }));
        const idsArray = expandedIdsArray.concat(checkedIdsArray);
        dispatch(deleteCategoriesAction(idsArray));
        setDeleteCategoryModal(false);
    };

    const renderDeleteCategoryModal = () => {
        return (
            <Modal
                modalTitle={"Delete Selected Category"}
                show={deleteCategoryModal}
                handleClose={deleteCategoryHandleClose}
                buttons={[
                    {
                        label: "Cancel",
                        color: "primary",
                        onClick: () => setDeleteCategoryModal(false),
                    },
                    {
                        label: "Delete",
                        color: "danger",
                        onClick: deleteCategories,
                    },
                ]}
            >
                <h6
                    style={{
                        borderBottom: "1px solid gray",
                        paddingBottom: "5px",
                    }}
                >
                    <b>Expanded</b>
                </h6>
                {expandedArray.map((item, index) => (
                    <span key={index}>
                        {item.name}
                        <br />
                    </span>
                ))}
                <h6
                    style={{
                        borderBottom: "1px solid gray",
                        paddingTop: "10px",
                        paddingBottom: "5px",
                    }}
                >
                    <b>Checked</b>
                </h6>
                {checkedArray.map((item, index) => (
                    <span key={index}>
                        {item.name}
                        <br />
                    </span>
                ))}
            </Modal>
        );
    };

    const renderUpdateCategoryModal = () => {
        return (
            <Modal
                show={updateCategoryModal}
                handleClose={updateCategoryHandleClose}
                modalTitle={"Update Selected Category"}
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
        );
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
                                <button onClick={deleteCategory}>
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
            </Container>
            {renderAddCategoryModal()}
            {renderUpdateCategoryModal()}
            {renderDeleteCategoryModal()}
        </Layout>
    );
}

export default Category;
