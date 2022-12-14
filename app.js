require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("./model/user");
const auth = require('./middleware/auth');

const app = express();
// config json
app.use(express.json());


app.get("/home", (req, res) => {
  res.send("Hello auth system");
});
/* Route - /register
   Type - POST
   DESC - To register new user
*/

app.post("/register", async (req, res) => {
  try {
    const { fullname, phone, email, password } = req.body;
    // Check all data is there
    if (!(email && password && phone && fullname)) {
      res.status(400).send("All fields required");
    }
    // check user already exist
    const existingUser = await User.findOne({ email }); //Promise

    if (existingUser) {
      res.status(401).send("User already exist");
    }

    // encrypt password
    const encryptPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      phone,
      email: email.toLowerCase(),
      password: encryptPassword,
    });

    // generate token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "10h",
      }
    );
    user.token = token;

    // handle password
    user.password = undefined;

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

/* Route - /login
   Type - POST
   DESC - To login user
*/
app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!(email && password)) {
        res.status(400).send("Field is missing");
      }
  
      const user = await User.findOne({ email });
  
      // Check user and password
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
  
        user.token = token;
        user.password = undefined;
  
        res.status(200).json(user);
      }
  
      res.status(400).send("email or password is incorrect");
    } catch (error) {
      console.log(error);
    }
  });

module.exports = app;
