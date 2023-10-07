import { ADDCARD } from "../type";



export default function card(state=null,action){

    switch(action.type){
        case ADDCARD:
            return {...state, data:action.payload}
        default:
            return state
    }



}