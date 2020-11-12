import { categoryConstants } from "../../Actions/Constants"

const initState = {
    categories: [],
    loading: false,
    errorMessage: null,
    redirect_2: false,
    redirect_3: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.CREATE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
                redirect_3: false
            }
            break;
        case categoryConstants.CREATE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                redirect_3: true
            }
            break;
        case categoryConstants.CREATE_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                redirect_3: false
            }
            break;
        case categoryConstants.FETCH_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstants.FETCH_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                categories: action.payload.categories
            }
            break;
        case categoryConstants.FETCH_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
            }
            break;
        case categoryConstants.DELETE_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true,
                redirect_2:false
            }
            break;
        case categoryConstants.DELETE_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                redirect_2:true
            }
            break;
        case categoryConstants.DELETE_CATEGORY_FAILURE:
            state = {
                ...state,
                loading: false,
                redirect_2:false
            }
            break;
    }
    return state;
}