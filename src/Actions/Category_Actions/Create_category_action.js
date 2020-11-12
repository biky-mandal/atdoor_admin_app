import axios from "../../Helpers/axios";
import { categoryConstants } from "../Constants";

export const create_category_action = (new_category) => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstants.CREATE_CATEGORY_REQUEST
        })
        await axios.post('/admin/category/create', {
            ...new_category
        }).then(res => {
            dispatch({
                type: categoryConstants.CREATE_CATEGORY_SUCCESS
            })
            alert(`${res.data.category.name} Category Created Successfully.`);

        }).catch(err => {
            dispatch({
                type: categoryConstants.CREATE_CATEGORY_FAILURE
            })
            alert(err.request.response)
        });
    }
}