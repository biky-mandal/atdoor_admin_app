import { productConstants } from "../../Actions/Constants"

const initState = {
    products: [],
    loading: false,
    errorMessage: null,
}

export default (state = initState, action) => {
    switch (action.type) {
        case productConstants.FETCH_PRODUCT_REQUEST:
            state = {
                ...state,
            }
            break;
        case productConstants.FETCH_PRODUCT_SUCCESS:
            state = {
                ...state,
                products: action.payload.product
            }
            break;
        case productConstants.FETCH_PRODUCT_FAILURE:
            state = {
                ...state,
            }
            break;
        case productConstants.CREATE_PRODUCT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.CREATE_PRODUCT_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case productConstants.CREATE_PRODUCT_FAILURE:
            state = {
                ...state,
                loading: false
            }
            break;

    }
    return state;
}