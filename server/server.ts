import { getAllJSDocTagsOfKind } from "typescript";
import Messages from "./model/messageModel";

const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const http = require("http");
const cors = require("cors");

const server = http.createServer(app);
const socketIO = require("socket.io");
const cookieParser = require("cookie-parser");

// app.use(express.static("../citizenClient/build"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
require("dotenv").config();

mongoose.connect(
  `mongodb+srv://${process.env.ATLAS_NAME}:${process.env.CLUSTER_PASS}@cluster0.qqi5o.mongodb.net/test`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to DB!");
});

const accidentRouter = require("./routers/accidentRouter");
app.use("/accidents", accidentRouter);
const userRouter = require("./routers/userRouter");
app.use("/users", userRouter);

const orgRouter = require("./routers/orgRouter");
app.use("/org", orgRouter);

const previousAccidentRouter = require("./routers/previousAccidentsRouter");
app.use("/previousAccidents", previousAccidentRouter);

const messagesBetweemOrgRouter = require("./routers/messagesBetweemOrgRouter");
app.use("/messagesBetweemOrg", messagesBetweemOrgRouter);

const path = require("path");
app.use("/orgCLI", express.static(path.join(__dirname, "..", "public", "org")));
app.use("/", express.static(path.join(__dirname, "..", "public", "citizen")));

// app.get('/*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', "public", 'citizen', 'index.html'));
// })

server.listen(port, () => {
  console.log(`Listening on port ${port} 🔥`);
});

// saleem part
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let userId;
let orgId;
io.on("connection", (socket) => {
  console.log("new client join socket");
 
 
  socket.on("disconnect", () => {
    console.log("Client disconnected");
   
  });

  socket.on("join room", (roomId) => {
    console.log("join room", roomId);
    socket.join(roomId); //the client is now in that room
    console.log(socket.rooms);
  });

  socket.on("message", (value) => handleMessage(value));
  socket.on("setUserData", (userData) => {
    //When user creation on server is complete, retrieve and save data to local storage
    console.log("user id is " + userData);
    userId = userData;
  });
  socket.on("setOrgData", (userData) => {
    //When user creation on server is complete, retrieve and save data to local storage
    console.log("org id is " + userData);
    orgId = userData;
  });

  async function handleMessage(value: any) {
    console.log(value.message);
    socket.emit('message', value);
   
    const message = new Messages(value);

    await message.save(function (err, Messages) {
      if (err) return console.error(err);
      console.log("message saved to users collection.");
    });

    //save last message to collection chatrooms, with org ID

    // 2nd task, to let organization, chat with the user 
    console.log(value);
    
  }
});

const getApiAndEmit = async (socket) => {
  const messagesPreview = await Messages.find({
    $or: [
      { from: userId, to: orgId },
      { to: userId, from: orgId },
    ],
  }).sort({ date: 1 });
  console.log("check", userId, orgId, messagesPreview);
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", messagesPreview);
};


/* end of saleem */
// app.use(express.static("../public/citizen"));
// app.use(express.static('../public/org'))

// app.get('/orgCLI/*', (req, res) => {
//   console.log("cli")
//   // app.use(express.static(path.join(__dirname, '..', 'public', 'org')));
//   res.sendFile(path.join(__dirname, '..', "public", 'org', 'index.html'));
// })
