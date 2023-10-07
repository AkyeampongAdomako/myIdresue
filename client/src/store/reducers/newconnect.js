
import { NEWCONNECT } from "../type";



export default function connection_c(state=null,action){

    switch(action.type){
        case NEWCONNECT:
            return action.payload
        default:
            return state
        }



    }



