import axios from '../../Helpers/axios';

export const update_category_action = (category_name, description) => {
    return async dispath => {
        // Connecting to backend using axios.
        await axios.post('/admin/category/update', {
            category_name, description
        }).then(res => {
            alert('Updated Successfully..')
        }).catch(err => {
            alert(err.request);
        })
    }
}