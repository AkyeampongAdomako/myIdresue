const bcryt = require("bcrypt");
const mongoose = require("mongoose");

const CardSchema = mongoose.Schema({
  founder:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  type: 
    {
      type:String,   
    },
   firstname: {
    type: String,
  },
  lastname:{
    type: String,
  },
  middlename: {
    type: String,
  },
  id_number:{
    type: String,
  },
  date:{
    type:String
  },

  status:{
    type:Boolean,
    default:false
  },
  possibleowner:{
    type:Boolean,
    default:false
  },
  conversation:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"chats"
    }
  ]


},{timestamps:true});
const reportlostSchema = mongoose.Schema({
  type:{
type:String,

  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
 
  
  firstname: {
    type: String,
 
  },
  lastname:{
    type: String,
  },
  

  middlename: {
    type: String,
  },

  id_number:{
    type: String,
  },
  date:{
    type:String
  },
  status:{
    type:Boolean,
    default:false
  },
  cardfound:{
    type:Boolean,
    default:false
  }
});
const ratemyfinderSchema =mongoose.Schema({

  user:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"users"
  }
  ,message:{
    type:String
  },
  rate:{
    type:Number
  }
},{timestamps:true})
const Testimonial=mongoose.Schema({

  testimony:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"rating"
  }]
})

const forumSchema=mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
  ref:"users"
  },
  message:{
    type:String
  }
},{timestamps:true})

const chatSchema=mongoose.Schema({
  card:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"cards"
  },
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  reciever:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  }

  ,messsages:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"messages"
  }
  ]
},{timestamps:true})

const messageSchema=mongoose.Schema({
  chat:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"chats"
    
  },
  sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  receiver:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users"
  },
  messsages:{
    type:String
  }
   
  
  
},{timestamps:true})



const CardModel = mongoose.model("cards", CardSchema);
const ReportlostModel = mongoose.model("reportlost", reportlostSchema);
const RatemeModel= mongoose.model("ratings", ratemyfinderSchema);
const TestimonialModel = mongoose.model(
  "testimony",
  Testimonial
);
const forumSchemaModel = mongoose.model("forum", forumSchema);
const chatModel = mongoose.model("chats", chatSchema);
const MessageModel=mongoose.model("messages",messageSchema)
module.exports = {
  CardModel,
  ReportlostModel,
  RatemeModel,
  TestimonialModel,
  forumSchemaModel,
  chatModel,
  MessageModel
};
