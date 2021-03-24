export default function (state = {}, action){
    switch(action.type){
        case "LOGIN_USER":
            return {...state, loginSuccess : action.payload};  //spread operator
            break;
        default:
            return state;
    }
}