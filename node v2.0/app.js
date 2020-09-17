const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();

const serverResponseHandler = require("./middleware/serverResponseHandler");
const contentTypeHandler = require("./middleware/contentTypeHandler");
const Login = require("./routes/login");
const Register = require("./routes/register");
const Model = require("./routes/dl_model/model");
const Profile = require("./routes/profile");
// const Verification = require('./routes/verification/verification');
const authorization = require("./middleware/authorization");

require("dotenv").config();
require("./dependencies");

mongoose
  .connect("mongodb://localhost:27017/WeBase", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Conncected to database"));

// mongoose
//   .connect(
//     `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-uegxx.mongodb.net/test?retryWrites=true&w=majority`,
//     { dbName: "WeBase", useNewUrlParser: true }
//   )
//   .then((res) => console.log("Connected to datatbase"))
//   .catch((err) => console.log(err));

//middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Custome middleware
app.use(contentTypeHandler());
app.use(serverResponseHandler());

//Routes
app.use("/profile", authorization, Profile);
app.use("/model", authorization, Model);
// app.use('/verification', Verification)
app.use("/login", Login);
app.use("/register", Register);

app.get("/", (req, res) => {
  res.send("Hello world - Node");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
