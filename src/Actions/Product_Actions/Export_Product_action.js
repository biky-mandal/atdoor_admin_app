import axios from '../../Helpers/axios';

export const export_product_action = (new_stock, unit, qtyunit, name) => {
    return async (dispatch) => {
        await axios.post('/admin/product/export', {
            new_stock, unit, qtyunit, name
        }).then(res => {
            alert('Product Exported Successfully...');
        }).catch(err => {
            alert(err.request)
        });
    }
}