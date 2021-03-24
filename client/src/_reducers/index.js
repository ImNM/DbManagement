import {combineReducers} from 'redux';
import user from './user_reducer.js';


//어떻게 state 가 변하는지 보여주고 난뒤에 그 return 값을 store에 올려주는게 redux다.
//combinReducer 이용해서 rootreducer로 올려준다
//const rootReducer = combineReducers({
//   user
//})

export default combineReducers({
       user
})
