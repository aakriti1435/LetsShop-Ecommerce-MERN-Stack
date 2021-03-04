import React from "react";
import Modal from "../../../components/GenericUI/Modal";

const DeleteCategoryModal = (props) => {
    const {
        show,
        modalTitle,
        handleClose,
        checkedArray,
        deleteCategories,
        setDeleteCategoryModal,
    } = props;
    return (
        <Modal
            modalTitle={modalTitle}
            show={show}
            handleClose={handleClose}
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
                    paddingTop: "10px",
                    paddingBottom: "5px",
                }}
            >
                <b>Checked Categories</b>
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

export default DeleteCategoryModal;
