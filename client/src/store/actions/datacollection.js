import axios from "axios";
import * as notify from "./notification";
import { AutoLogin } from "./adminActions";

const {ADDCARD,SEARCRESULTS,GETCARDS,MESSAGEBOX,FILTERCARDS, REPORTCARD,NEWCONNECT,MATCHCARDS, API,FINDCARDS,VERIFIEDCARD} = require("../type");

export const Reportcards = (data) => ({
  type: REPORTCARD,
  payload: data,
});

export const searchResult=(data)=>({
  type:SEARCRESULTS,
  payload:data
})

export const messageb=(data)=>({
  type:MESSAGEBOX,
  payload: data,
})
export const matchcard = (data) => ({
  type: MATCHCARDS,
  payload: data,
});

export const Cards = (data) => ({
  type: ADDCARD,
  payload: data,
});

export const AllCards = (data) => ({
  type: GETCARDS,
  payload: data,
});

export const FindCards = (data) => ({
  type: FINDCARDS,
  payload: data,
});



export const filterCards = (data) => ({
  type: FILTERCARDS,
  payload: data,
});

export const verifiedcard = (data) => ({
  type:VERIFIEDCARD,
  payload: data,
});


export const newconnect = (data) => ({
  type:NEWCONNECT,
  payload: data,
});

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.interceptors.request.use(config => {
  config.mode = "cors";
  return config;
});


export const Addcards = (data,userid) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(`${API}/session/addcard/${userid}`, data);
    
      dispatch(
          Cards(newd.data)
      );


      dispatch(
          notify.notify_success({
            msg: `Card Added successfully`,
          }))
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        }))
    
    }
  };
};

export const ReportCards = (data,userid) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(`${API}/session/reportlost/${userid}`, data);
      dispatch(
        Reportcards(newd.data)
      );

      dispatch(
          notify.notify_success({
            msg: `Card Added successfully`,
          }))
    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        }))
    }
  };
};
export const GetAllCards = (data,userid) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.post(`${API}/session/getcards`, data);
      dispatch(
          Cards(newd.data)
      );

    } catch (error) {
  
    }
  };
};

export const GetSearcCards = (keyword) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.get(`${API}/session/getsearch/${keyword}`);
      dispatch(
        FindCards(newd.data)
      );
    } catch (error) {
   
    }
  };
};

export const GetsearchResult= (word) => {
  return async (dispatch ) => {
    try {
      
    const contents=await axios.get(`${API}/session/getsearch/${word}`);
    
     dispatch(
    searchResult(contents.data))
   
    } catch (error) {
     
     
    }
  };
};

export const Getcard = (userid) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.get(`${API}/session/getcard/${userid}`);
    
      dispatch(
        Cards(newd.data)
      );

    } catch (error) {
      dispatch(
        notify.notify_error({
          msg: `failed !`,
        }))
    }
  };
};
export const Matchcards = (userid) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.get(`${API}/user/searchmatch/${userid}`);
      dispatch(
        matchcard(newd.data)
      );
    } catch (error) {
     
    }
  };
};


export const Filtercards = (userid) => {
  return async (dispatch, getdispatch) => {
    try {
      const newd = await axios.get(`${API}/session/singlematch/${userid}`);
      dispatch(
        filterCards(newd.data)
      );
    } catch (error) {
     
    }
  };
};
export const Verifycard = (data) => {
  return async (dispatch, getdispatch) => {
    try {
      
      const newd = await axios.post(`${API}/session/verifycard`,data);
      dispatch(verifiedcard(newd.data))
      dispatch(
        notify.notify_success({
          msg: "Verification successful",
        }))
    } catch (error) {
     
     dispatch(
      notify.notify_error({
        msg:"verification failed",
      })
     )
    }
  };
};

export const CreateChat= (user_id,card_id) => {
  return async (dispatch, getdispatch) => {
    try {
     
      const newd = await axios.post(`${API}/session/api/chat/${user_id}/${card_id}`);
     
     dispatch(
      newconnect({connect: true})
     )
    } catch (error) {
     
     dispatch(
      notify.notify_error({
        msg:error,
      })
     )
    }
  };
};


export const Sendmeassge= (user_id,receiver,chatroom_id,data) => {
  return async (dispatch, getdispatch) => {
    try {
    
  
    const newd = await axios.post(`${API}/session/api/chat/message/${user_id}/${receiver}/${chatroom_id}`,data);
    
     dispatch(
      messageb(newd.data))
     dispatch(
      notify.notify_success({
        msgs: "successful",
      }))

    } catch (error) {
     
     dispatch(
      notify.notify_error({
        msg:"error",
      })
     )
    }
  };
};

export const Getmeassge= (chatroom_id) => {
  return async (dispatch ) => {
    try {
     
    const contents=await axios.get(`${API}/session/api/chat/getmessages/${chatroom_id}`);
    
     dispatch(
    messageb(contents.data))
    } catch (error) {
     
     
    }
  };
};

export const Clear_CreateChat= () => {
  return async (dispatch) => {
     dispatch(
      newconnect(null)
     )
  
  };
};


export const Clear_ChatBox= () => {
  return async (dispatch) => {
     dispatch(
      messageb(null)
     )
  
  };
};



export const Clear_SearchBox= () => {
  return async (dispatch) => {
     dispatch(
      searchResult(null)
     )
  
  };
};



























  





       
 















    

    

    

  

 