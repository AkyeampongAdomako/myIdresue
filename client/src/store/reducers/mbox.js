import {MESSAGEBOX} from "../type";
export default function Messages(state=null,action){
    switch(action.type){
        case MESSAGEBOX:
            return {...state,data:action.payload};
        default:
            return state;
    }
}


