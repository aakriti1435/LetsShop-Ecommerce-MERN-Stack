import { categoryConstants } from "../actions/constants";

const initialState = {
    categories: [],
    loading: false,
    error: null,
    message: "",
};

const createCategoryList = (parentId, categories, category) => {
    let myCategories = [];

    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: [],
            },
        ];
    }

    for (let c of categories) {
        if (c._id == parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: [],
            };
            myCategories.push({
                ...c,
                children:
                    c.children.length > 0
                        ? [...c.children, newCategory]
                        : [newCategory],
            });
        } else {
            myCategories.push({
                ...c,
                children: c.children
                    ? createCategoryList(parentId, c.children, category)
                    : [],
            });
        }
    }

    return myCategories;
};

export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;

        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories: action.payload.categories,
            };
            break;

        case categoryConstants.GET_ALL_CATEGORIES_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
            break;
    }
    return state;
};
