export default function (state = {}, action){
    switch(action.type){
        case "LOGIN_USER":
            
            localStorage.setItem(
                "Auth",
                JSON.stringify({ token : action.payload.token , name : action.payload.name ,avatar: action.payload.avatar , userId:action.payload.userId})
              );
            return {...state, loginSuccess : action.payload};  //spread operator
            break;
        case "REGISTER_USER":
            return {...state,register:action.payload};
            break;
        case "AUTH_USER":
            return {...state,isAuth:action.payload};
            break;
        default:
            return state;
    }
}