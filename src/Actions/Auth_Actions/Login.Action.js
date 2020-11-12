import { authConstants } from "../Constants";
import axios from '../../Helpers/axios';


export const Login_Action = (user) => {
    return async (dispatch) => {
        // console.log(user)
        dispatch({
            type: authConstants.LOGIN_REQUEST
        });

        // contact to backend
        // We pass the user information like email and password in user by spreading it.
        await axios.post("/admin/login", {
            ...user
        }).then(res => {
            // console.log(res)
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // dispatch success
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }).catch(err => {
            const errors = JSON.parse(err.request.response)

            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {
                    errors
                }
            });
            
            // console.log(errors)
        });
    }
}