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

        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;

        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = createCategoryList(
                category.parentId,
                state.categories,
                category
            );
            state = {
                ...state,
                loading: true,
                categories: updatedCategories,
            };
            break;

        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
            break;

        case categoryConstants.UPDATE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;

        case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;

        case categoryConstants.UPDATE_CATEGORIES_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
            break;
        case categoryConstants.DELETE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true,
            };
            break;

        case categoryConstants.DELETE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false,
            };
            break;

        case categoryConstants.DELETE_CATEGORIES_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            };
            break;
    }
    return state;
};
