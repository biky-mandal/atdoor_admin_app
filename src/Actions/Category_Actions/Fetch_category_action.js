import axios from "../../Helpers/axios";
import { categoryConstants } from "../Constants"

export const fetch_category_action = () => {
    return async (dispatch) => {
        dispatch({
            type: categoryConstants.FETCH_CATEGORY_REQUEST
        });

        // Connection to backend..
        await axios.get('/admin/category/fetch', {

        }).then(res => {
            // console.log(res.data.categories)
            const { categories } = res.data;

            dispatch({
                type: categoryConstants.FETCH_CATEGORY_SUCCESS,
                payload: {
                    categories
                }
            });
        }).catch(err => {
            console.log(err.request)
            const errors = JSON.parse(err.request.response)

            dispatch({
                type: categoryConstants.FETCH_CATEGORY_FAILURE,
                payload: {
                    errors
                }
            });
        });
    }
}