import axios from '../../Helpers/axios';

export const update_product_action = (      
    // Receiving the parameter.
    name, 
    unit, 
    qtyunit, 
    up_amt_original_price,
    up_amt_selling_price,
    up_qty_original_price,
    up_qty_selling_price,
    up_description
) => {
    return async (dispatch) => {
        await axios.post('/admin/product/update', {
            // Sending the parameter to backend
            name, 
            unit, 
            qtyunit, 
            up_amt_original_price,
            up_amt_selling_price,
            up_qty_original_price,
            up_qty_selling_price,
            up_description
        }).then(res => {
            alert('Product Updated Successfully..')
        }).catch(err => {
            alert(err.request);
        })
    }
}