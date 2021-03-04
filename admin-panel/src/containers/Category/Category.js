import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    addCategory,
    getAllCategories,
    updateCategories,
    deleteCategories as deleteCategoriesAction,
} from "../../actions/actions";
import Layout from "../../components/Layout/Layout";
import "./Category.css";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import UpdateCategoryModal from "./components/UpdateCategoryModal";
import AddCategoryModal from "./components/AddCategoryModal";
import DeleteCategoryModal from "./components/DeleteCategoryModal";
import { createCategoryList } from "../../helpers/linearCategories";
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
    const [categoryType, setCategoryType] = useState("");
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

    useEffect(() => {
        if (!category.loading) {
            setShow(false);
        }
    }, [category.loading]);

    const handleClose = () => {
        const form = new FormData();
        if (categoryName === "") {
            alert("Category name is required");
            setShow(false);
            return;
        }
        form.append("name", categoryName);
        form.append("parentId", parentCategoryId);
        form.append("categoryImg", categoryImage);
        form.append("type", categoryType);
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

        dispatch(updateCategories(form));
        setUpdateCategoryModal(false);
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

        if (checkedIdsArray.length > 0) {
            dispatch(deleteCategoriesAction(checkedIdsArray));
        }

        setDeleteCategoryModal(false);
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
            <AddCategoryModal
                show={show}
                handleClose={handleClose}
                size="lg"
                modalTitle={"Add New Category"}
                categoryName={categoryName}
                setCategoryName={setCategoryName}
                categoryType={categoryType}
                setCategoryType={setCategoryType}
                parentCategoryId={parentCategoryId}
                setParentCategoryId={setParentCategoryId}
                categoryList={createCategoryList(category.categories)}
                handleCategoryImage={handleCategoryImage}
            />
            <UpdateCategoryModal
                show={updateCategoryModal}
                handleClose={updateCategoryHandleClose}
                modalTitle={"Update Selected Category"}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
                handleCategoryInput={handleCategoryInput}
                categoryList={createCategoryList(category.categories)}
            />
            <DeleteCategoryModal
                modalTitle={"Delete Selected Category"}
                show={deleteCategoryModal}
                handleClose={deleteCategoryHandleClose}
                setDeleteCategoryModal={setDeleteCategoryModal}
                deleteCategories={deleteCategories}
                checkedArray={checkedArray}
            />
        </Layout>
    );
}

export default Category;
