import axios from '../../Helpers/axios';

export const delete_product_action = (product_name) => {
    return async dispatch => {
        await axios.post('/admin/product/delete', {
            product_name
        }).then(res => {
            alert('Product Deleted Successfully..');
        }).catch(err => {
            alert(err.request);
        });
    }
}