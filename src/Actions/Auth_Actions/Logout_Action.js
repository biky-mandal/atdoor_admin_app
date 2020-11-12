import { authConstants } from "../Constants";
import axios from '../../Helpers/axios';

export const Logout_Action = () => {
    return async dispatch => {
        dispatch({
            type: authConstants.LOGOUT_REQUEST,
        }); 

        // Performing connection to backend with axios.
        const res = await axios.post('/admin/logout');

        if(res.status === 200){
            localStorage.clear();
            dispatch({
                type: authConstants.LOGOUT_SUCCESS
            });
        }else{
            dispatch({
                type: authConstants.LOGOUT_FAILURE,
                payload: {
                    error: res.data.error
                }
            });
        }
    } 
}