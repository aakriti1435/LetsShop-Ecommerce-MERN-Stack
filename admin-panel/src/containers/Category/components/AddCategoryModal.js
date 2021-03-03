import React from "react";
import Modal from "../../../components/GenericUI/Modal";
import Input from "../../../components/GenericUI/Input";

const AddCategoryModal = (props) => {
    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
    } = props;
    return (
        <Modal show={show} handleClose={handleClose} modalTitle={modalTitle}>
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
                {categoryList.map((option) => (
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

export default AddCategoryModal;
