import { count } from 'console';
import {createStore} from 'redux';

const initialState = {
    message: "Hello",
    count: 5
}

//reducer
const reducer = (state=initialState, action)=> {

    //return the updated state
    if(action.type === "increment_ctr"){
        return {
            ...state,
            count: state.count + 1
        }
    }
    if(action.type === "update_ctr"){
        return {
            ...state,
            count: action.ctr
        }
    }


    return state;
}

//store
const store = createStore(reducer);
console.log("state: ", store.getState());

store.subscribe(() => {
    console.log("state in subscriber: ", store.getState());
})

store.dispatch({type: "increment_ctr"});
//console.log("state: ", store.getState());
store.dispatch({type: "update_ctr", ctr: 10});
//console.log("state: ", store.getState());
