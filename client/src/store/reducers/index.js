import {combineReducers} from "redux";

import notification from "./notification";
import personal from "./personal";

import authuser from "./authuser";


import card from "./cards";
import cards from "./allcards";
import matchcards from "./matchcard";
import validcard from "./verifiedc";
import connection_c from "./newconnect";
import Messages from "./mbox";
import searchCards from "./searccards";
import filtercard from "./filtercard";

const appReducers=combineReducers({
    personal,
    authuser,
    notification,
    card,
    cards,
    matchcards,validcard,
    connection_c,
    Messages,
    searchCards,filtercard
})

export default appReducers