import {GETCARDS} from "../type";



export default function cards(state=null,action){
    switch(action.type){
        case  GETCARDS:
            return {...state,data:action.payload};
       
        default:
            return state;
    }
}


