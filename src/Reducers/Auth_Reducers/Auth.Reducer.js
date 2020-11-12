import { authConstants } from "../../Actions/Constants"

const initState = {
    token: null,
    user: {
        _id: '',
        firstName: '',
        lastName: '',
        email:'',
        role:'',
        fullName: ''
    },
    authenticate: false,
    authenticating: false,
    errorMessage: null,
    message: '',
    loading: false,
    toLoginPage: false
}

export default (state = initState, action) => {
    switch(action.type){
        // For Login Actions

        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
            }   
            break;
        
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                authenticating: false,
                authenticate: true
            }
            break;
        
        case authConstants.LOGIN_FAILURE:
            state = {
                ...initState,
                errorMessage: action.payload.errors.error
            }
            break;

        // For logout actions 

        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initState
            }
            break;
        
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                errorMessage: action.payload.error,
                loading: false
            }
            break;

        // For SignUp Actions
        case authConstants.REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        
        case authConstants.REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message,
                toLoginPage: true
            }
            break;
        
        case authConstants.REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                errorMessage: action.payload.errors.error
            }
            break;
    }
    return state;

}