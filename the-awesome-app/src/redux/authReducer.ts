type AuthState = {
    isAuthenticated: boolean;
    username: string;
    accessToken : string;
    refreshToken: string
}

const initialState: AuthState = {
    isAuthenticated: false,
    username: "",
    accessToken: "",
    refreshToken: ""
}

type AuthAction = {
    type: string;
    payload? : AuthState
}

// login {type: "login", paylaod: {isAuthenticated: true, ...}}}
// logout {type: "logout"}
export const authReducer = (state=initialState, action: AuthAction) => {

    if(action.type === "login" && action.payload){
        return action.payload;
    }
    if(action.type === "logout"){
        return initialState;
    }
    return state;
}