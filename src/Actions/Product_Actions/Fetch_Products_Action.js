import axios from '../../Helpers/axios';
import { productConstants } from '../Constants';

export const fetch_product_action = () => {
    return async dispatch => {

        dispatch({
            type: productConstants.FETCH_PRODUCT_REQUEST
        });
        // Server Connect
        await axios.get('/admin/product/fetch', {

        }).then(res => {
            console.log(res.data);

            const { product } = res.data
            dispatch({
                type: productConstants.FETCH_PRODUCT_SUCCESS,
                payload:{
                    product
                }
            });

        }).catch(err => {
            console.log(err.request)
            const errors = JSON.parse(err.request.response)
            dispatch({
                type: productConstants.FETCH_PRODUCT_FAILURE,
                payload: {
                    errors
                }
            });
        });
    }
}