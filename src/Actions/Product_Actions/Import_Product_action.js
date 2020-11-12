import axios from '../../Helpers/axios';

export const import_product_action = (new_stock,unit, qtyunit, name) => {
    return async (dispatch) => {
        await axios.post('/admin/product/import', {
            new_stock, unit, qtyunit, name
        }).then(res => {
            alert('Product Imported Successfully...')
        }).catch(err => {
            alert(err.request)
        });
    }
}