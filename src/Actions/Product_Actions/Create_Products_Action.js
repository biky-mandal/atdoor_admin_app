import axios from "../../Helpers/axios"
import { productConstants } from "../Constants"

export const create_product_action = (new_product) => {
    return async (dispatch) => {

        dispatch({
            type: productConstants.CREATE_PRODUCT_REQUEST
        })

        await axios.post('/admin/product/create', new_product ).then(res => {
            alert('Product Created Successfully.')
            dispatch({
                type: productConstants.CREATE_PRODUCT_SUCCESS
            })
        }).catch(err => {
            console.log(err.request);
            alert('There Might be Some Problem In Backend.')
            dispatch({
                type: productConstants.CREATE_PRODUCT_FAILURE
            })
        })
    }
}