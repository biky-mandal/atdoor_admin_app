import { authConstants } from '../Constants';
import axios from '../../Helpers/axios';

export const Register_Action = (user) => {
    console.log(user);
    return async dispatch => {
        // dispatch({
        //     type: authConstants.REGISTER_REQUEST
        // });

        // Backend connection
        await axios.post('/admin/signup', {
            ...user
        }).then(res => {
            console.log(res.data);
            const { message } = res.data;
            dispatch({
                type: authConstants.REGISTER_SUCCESS,
                payload: {
                    message
                }
            });
        }).catch(err => {
            const errors = JSON.parse(err.request.response)
            console.log(errors);
            dispatch({
                type: authConstants.REGISTER_FAILURE,
                payload: {
                    errors
                }
            });
        });
    }
}