const { model, set } = require("mongoose");
const {
  CardModel,
  ReportlostModel,
  RatemeModel,
  TestimonialModel,
  forumSchemaModel,
  chatModel,
  MessageModel,
} = require("../models/Database");
const { sortArticles } = require("../middleware/utils");
const express = require("express");
const { User } = require("../models/users");
const routes = express.Router();
/** creation */
routes.route("/addcard/:id").post(async (req, res) => {
  try {
    const userid = req.params.id;
    const data = new CardModel({
      ...req.body,
      founder: userid,
    });
    const content = await data.save();

    if (content) {
      const updateuser = await User.findByIdAndUpdate(
        { _id: userid },
        {
          $push: {
            myfoundcards: content._id,
          },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      );
      res.status(200).json(updateuser);
    } else {
      res.status(502).json({ msg: "Not successfull" });
    }
  } catch (error) {
    res.status(400).json({ msg: error });
    
  }
});
const dateconverter = (dateString) => {
  const date = new Date(dateString);

  // Extract day, month, and year components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Adding 1 because months are 0-based
  const year = date.getFullYear();

  // Create the formatted date string
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
  return formattedDate;
};

function maskLast5Characters(input) {
  if (input.length >= 5) {
    const maskedPart = "*".repeat(8);
    return input.slice(0, -8) + maskedPart;
  }
  return "********"; // Return all asterisks if the input is less than 8 characters.
}

/** get queries  all */
routes.route("/getcards").get(async (req, res) => {
  try {
    const data = await CardModel.find({})
      .populate("conversation")
      .popuplate("founder");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
routes.route("/getsearch/:keyword").get(async (req, res) => {
  try {
   
    const searchkey = req.params.keyword;
    let keyword = "";
    if (searchkey) {
      keyword = searchkey.toLowerCase().trim();
    }

    let ArrayCards = [];

    const data = await CardModel.find({});

    if (data) {
   
      data.forEach((item) => {
        const dictions = { ...item };
        delete dictions._doc.date;
        let fullname = "";
        let firstname = item.firstname;
        let lastname = item.lastname;
        let middlename = item.middlename;
        let idnum = item.id_number;
        if (firstname) {
          fullname = item.firstname;
        }
        if (middlename) {
          fullname = fullname + " " + item.middlename;
        }
        if (lastname) {
          fullname = fullname + " " + item.lastname;
        }

        fullname = fullname.toLowerCase().trim();

        if (idnum) {
          idnum = idnum.toLowerCase().trim();
        }
        if (firstname) {
          firstname = firstname.toLowerCase().trim();
        }
        if (lastname) {
          lastname = lastname.toLowerCase().trim();
        }
        if (middlename) {
          middlename = middlename.toLowerCase().trim();
        }
        dictions._doc.id_number = maskLast5Characters(idnum);

        if (fullname.includes(keyword)) {
          if (!ArrayCards.includes(dictions._doc)) {
            ArrayCards.push(dictions._doc);
          }
        } else if (firstname.includes(keyword)) {
          if (!ArrayCards.includes(dictions._doc)) {
            ArrayCards.push(dictions._doc);
          }
        } else if (middlename.includes(keyword)) {
          if (!ArrayCards.includes(dictions._doc)) {
            ArrayCards.push(dictions._doc);
          }
        } else if (lastname.includes(keyword)) {
          if (!ArrayCards.includes(dictions._doc)) {
            ArrayCards.push(dictions._doc);
          }
        } else if (idnum.includes(keyword)) {
          if (!ArrayCards.includes(dictions._doc)) {
            ArrayCards.push(dictions._doc);
          }
        }
      });
    }


    res.status(200).json(ArrayCards);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/getcard/:id").get(async (req, res) => {
  try {
    const _id = req.params.id;

    const data = await CardModel.findOne({ _id })
      .populate({ path: "conversation", populate: "message" })

      .popuplate("founder");

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
routes.route("/reportlost/:id").post(async (req, res) => {
  try {
    const userid = req.params.id;
    const data = new ReportlostModel({
      ...req.body,
      by: userid,
    });
    const content = await data.save();

    if (content) {
      const updateuser = await User.findByIdAndUpdate(
        { _id: userid },
        {
          $push: {
            myreportedcards: data._id,
          },
        },
        { new: true, useFindAndModify: false }
      );
      res.status(200).json(updateuser);
    } else {
      res.status(502).json({ msg: "Not successfull" });
    }
  } catch (error) {
    res.status(400).json({ msg: error });
    
  }
});
routes.route("/getreported").get(async (req, res) => {
  try {
    const data = await reportlostSchema.find({}).populate("by");

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
routes.route("/getonereportedlost/:id").get(async (req, res) => {
  try {
    const data = await reportlostSchema
      .findById({ _id: req.params.id })
      .populate("by");
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
/**** modify */
routes.route("/modifycard/:id").patch(async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await CardModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/modifyreportedcard/:id").patch(async (req, res) => {
  try {
    
    const _id = req.params.id;
    const data = await ReportlostModel.findByIdAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});
/** delete queries */

routes.route("/deletecard/:id").delete(async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await CardModelModel.findByIdAndDelete({ _id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/deletesreportedlostcar/:id").delete(async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await ReportlostModel.findByIdAndDelete({ _id });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});

routes.route("/rateme/:id").post(async (req, res) => {
  try {
    const userid = req.params.id;
    const data = new RatemeModel({
      ...req.body,
      user: userid,
    });

    const result = await data.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
});

routes.route("/getratings").get(async (req, res) => {
  try {
    const results = await RatemeModel.find({}).populate("user");

    results.status(200).json(results);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
routes.route("/getratings/:id").get(async (req, res) => {
  try {
    const results = await RatemeModel.findById({ _id: req.params.id }).populate(
      "user"
    );

    results.status(200).json(results);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

routes.route("/testimony").post(async (req, res) => {
  try {
    const data = new TestimonialModel({
      ...req.body,
    });
    await data.save();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

routes.route("/addtestimony/:id").patch(async (req, res) => {
  try {
    const id = req.params.id;
    const rating = req.body.rating;
    const newrating = await TestimonialModel.findByIdAndUpdate(
      { _id: id },
      {
        $push: {
          testimony: rating,
        },
      },
      { new: true, useFindAndModify: false }
    );
    res.status(200).json(newrating);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

routes.route("/gettestimony").get(async (req, res) => {
  try {
    const result = await TestimonialModel.findOne({}).populate("testimony");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

routes.route("/removetestimony/:id/:rating").patch(async (req, res) => {
  try {
    const rating = req.params.rating;

    const result = await TestimonialModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $pull: {
          testimony: rating,
        },
      },
      {
        safe: true,
        new: true,
      }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

routes.route("/forum/:id").post(async (req, res) => {
  try {
    const user = req.params.id;
    const forum = new forumSchemaModel({
      ...req.body,
      user: user,
    });
    const result = await forum.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

routes.route("/getforum").get(async (req, res) => {
  try {
    const forum = await forumSchemaModel
      .find({})
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

routes.route("/deleteforum/:id").delete(async (req, res) => {
  try {
    const forum = await forumSchemaModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).json(forum);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
// chat message
routes.route("/api/chat/:user_id/:card_id").post(async (req, res) => {
  try {
    const card = req.params.card_id;
    const sender = req.params.user_id;

    const checkcard = await CardModel.findById({ _id: card });
    const founder = checkcard.founder;
    const chatexit = await chatModel.find({
      card: card,
      sender: sender,
      reciever: founder,
    });
    if (chatexit.length > 0) {
      res.status(200).json({
        msg: "In contact already",
      });
  
    } else {
      if (founder) {
        const data = new chatModel({
          card: card,
          sender: sender,
          reciever: founder,
        });
        const savedchat = await data.save();
        await CardModel.findByIdAndUpdate(
          { _id: card },
          {
            $push: {
              conversation: savedchat._id,
            },
          },
          { new: true, useFindAndModify: false }
        );
        await User.findByIdAndUpdate(
          { _id: sender },
          {
            $push: {
              chatroom: savedchat._id,
            },
          },
          { new: true, useFindAndModify: false }
        );
        res.status(200).json({ success: true });
   
      } else {
        res.status(404).json({ msg: "not sent" });
   
      }
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
   
  }
});
routes
  .route("/api/chat/message/:user_id/:receiver/:chatroom_id")
  .post(async (req, res) => {
    try {
   
      const chatroom = req.params.chatroom_id;
      const sender = req.params.user_id;
      const receiver = req.params.receiver;
      const checkchat = await chatModel.findById({ _id: chatroom });

      if (checkchat) {
        const data = new MessageModel({
          chat: checkchat._id,
          sender: sender,
          receiver: receiver,
          messsages: req.body.message,
        });
        const savedmessage = await data.save();
        await chatModel.findByIdAndUpdate(
          { _id: chatroom },
          {
            $push: {
              messsages: savedmessage._id,
            },
          },
          { new: true, useFindAndModify: false }
        );
        const chatbox = await chatModel
          .findById({ _id: chatroom })
          .populate("reciever")
          .populate("sender")
          .populate("messsages")
          .populate("card");

        if (chatbox) {
          res.status(200).json(chatbox);
        } else {
        
        }
      } else {
        res.status(404).json({ msg: "not sent" });
      }
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  });

routes.route("/api/chat/getmessages/:id").get(async (req, res) => {
  try {
  
    const chatroom = req.params.id;
    const checkchat = await chatModel
      .findById({ _id: chatroom })
      .populate("reciever")
      .populate("sender")
      .populate("messsages")
      .populate("card");

    if (checkchat) {
      res.status(200).json(checkchat);
    }
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

routes
  .route("/api/chat/delete/:message_id/:chatroom_id")
  .delete(async (req, res) => {
    try {
      const chatroom = req.params.chatroom_id;
      const message = req.query.message_id;

      const checkchat = await chatModel.findById({ _id: chatroom });

      if (checkchat) {
        await MessageModel.findByIdAndDelete({ _id: message });

        await chatModel.findByIdAndUpdate(
          { _id: chatroom },
          {
            $pull: {
              messsages: message,
            },
          },
          { new: true, useFindAndModify: false }
        );
        res.status(200).json({ success: true });
      } else {
        res.status(404).json({ msg: "not sent" });
      }
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  });

routes.route("/singlematch/:id").get(async (req, res) => {
  try {
   

    let filteredList = [];
    let diction = {};
    let matchrate = 0;
    const reportcard = await ReportlostModel.findById({ _id: req.params.id });
    const cards = await CardModel.find({});
    if (reportcard) {
      const report_firstname = reportcard.firstname;
      const report_lastname = reportcard.lastname;
      const report_middlename = reportcard.middlename;
      const report_id = reportcard.id_number;
      if (cards && cards.length > 0) {
        cards.forEach((allcards) => {
          diction={...allcards}
          matchrate = 0;
          const p_firstname = allcards.firstname;
          const p_lastname = allcards.lastname;
          const p_middlename = allcards.middlename;
          const p_id = allcards.id_number;
          if (p_firstname.toLowerCase() === report_firstname.toLowerCase()) {
            matchrate = matchrate + 25;
          }
          if (p_lastname.toLowerCase() === report_lastname.toLowerCase()) {
            matchrate = matchrate + 25;
          }
          if (p_middlename.toLowerCase() === report_middlename.toLowerCase()) {
            matchrate = matchrate + 25;
          }
          if (p_id.toLowerCase() === report_id.toLowerCase()) {
            matchrate = matchrate + 25;
          }
          if (
            p_firstname.toLowerCase() === report_firstname.toLowerCase() &&
            p_lastname.toLowerCase() === report_lastname.toLowerCase()
          ) {

         
            diction._doc.id_number = maskLast5Characters(allcards.id_number);
            diction._doc.matchrate= matchrate;
            diction._doc.date =""
            filteredList.push(diction._doc);
          } else if (p_id.toLowerCase() === report_id.toLowerCase()) {
            diction._doc.id_number = maskLast5Characters(allcards.id_number);
            diction._doc.matchrate= matchrate;
            diction._doc.date =""
            filteredList.push(diction._doc);
          } else if (
            p_firstname.toLowerCase() === report_firstname.toLowerCase()
          ) {
            diction._doc.id_number = maskLast5Characters(allcards.id_number);
            diction._doc.matchrate= matchrate;
            diction._doc.date =""
            filteredList.push(diction._doc);
          }
        });
      }
    }

    res.status(200).json(filteredList);
  } catch (error) {
    res.status(400).json({ msg: error });
    
  }
});

routes.route("/verifycard").post(async (req, res) => {
  try {
    const card = await CardModel.findById({ _id: req.body.cardId });

    if (card) {
      const carddate = new Date(card.date);
      const founder = await User.findById({ _id: card.founder });
      let username = "oo";
      if (founder) {
        user = founder.fullname;
      }
      const keydate = new Date(req.body.date);
   
      if (
        dateconverter(carddate.toString()) === dateconverter(keydate.toString())
      ) {
        card["username"] = username;
        res.status(200).json(card);
      } else {
        res.status(404).json({ msg: "Verification failed" });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: error });
    
  }
});
module.exports = routes;
