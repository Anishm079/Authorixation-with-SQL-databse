const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");
const moment = require("moment");
const bcrypt = require("bcrypt");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "auth",
});

//APPLY USER UNAUTHORIZED LOGIN COUNT IN COOKIES

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//*register
app.post("/api/v1/auth/register", async (req, res) => {
  const { email, password } = req.body;
  let isAuthorized = false;
  console.log(email,password);
  if (!email || !password)
    return res
      .status(401)
      .json({ isAuthorized, message: "enter valid credentials" });

  const queryFind = `select * from user WHERE email=?`;
  const response = await db.query(queryFind, [email]);

  // console.log(response[0][0])
  const user = response[0][0];

  if (user) {
    res
      .status(401)
      .json({ isAuthorized, message: "user with email id already exist!!!" });
    return;
  }

  const hashPwd = await bcrypt.hash(password, 8);

  const queryInsert = "INSERT INTO user(email,password) VALUES(?,?)";
  const data = await db.query(queryInsert, [email, hashPwd]);

  isAuthorized = true;
  res.send({ isAuthorized, success:"user is created" });
});


//*login
app.post("/api/v1/auth/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password);
  let isAuthorized = false;

  if (!email || !password)
    return res
      .status(401)
      .json({ isAuthorized, message: "enter valid credentials" });

  const queryForBlockedUser = "SELECT * FROM blockeduser WHERE email=?";
  const blocked_user = await db.query(queryForBlockedUser, [email]);
  const isBlocked = blocked_user[0][0];

  if (isBlocked){
    let blocked_time = isBlocked.unblock_date.toJSON().slice(0, 19).replace("T", " ");
    let isUnblocked=await isTimeOver(blocked_time);
    console.log(isUnblocked,blocked_time)
    if (isUnblocked){
        await db.query("DELETE FROM blockeduser WHERE email=?",[email])

    }
    else
        return res.status(404).json({ isAuthorized, message: "user is Blocked for 24 hr" });
   }

  const query = `SELECT * FROM user WHERE email=?`;
  const response = await db.query(query, [email]);

  const user = response[0][0];

  if (!user) {
    res.status(404).json({ isAuthorized, message: "please register" });
    return;
  }

  const unhashPwd = await bcrypt.compare(password, user.password);

  // console.log(unhashPwd);

  if (!unhashPwd) {
    if (Number(user.inc_password_attempts) >= 4) {
      await db.query(`UPDATE user SET inc_password_attempts=? WHERE email=?`, [0,email]);
      await db.execute("SET time_zone = '+00:00'");
      let unblock_time = moment()
        .add(1, "days")
        .toJSON()
        .slice(0, 19)
        .replace("T", " ");
      await db.query(
        "INSERT INTO blockeduser(email,unblock_date) VALUES(?,?)",
        [user.email, unblock_time]
      );
      res.status(401).json({ isAuthorized, message: "user is Blocked for 24 hr" });
      return;
    }
    await db.query(`UPDATE user SET inc_password_attempts=? WHERE email=?`,[Number(user.inc_password_attempts) + 1,email]);
    res.status(401).json({ isAuthorized, message: "enter valid credentials" });   
    return; 
  }

  isAuthorized = true;
  res.status(201).json({ isAuthorized, success: "user is authorized" });
});

function isTimeOver(unblocktime) {
  let unblock_time = moment(unblocktime,"YYYYMMDD hh:mm:ss")
    .toJSON()
    .slice(0, 19)
    .replace("T", " ");
  let time = moment()
    .toJSON()
    .slice(0, 19)
    .replace("T", " ");

  console.log(unblock_time,time);
  let unblock_time_array = unblock_time.split(" ");
  let unblock_time_date = unblock_time_array[0].split("-");
  let unblock_time_time = unblock_time_array[1].split(":");
  let time_array = time.split(" ");
  let time_date = time_array[0].split("-");
  let time_time = time_array[1].split(":");

  let result =
    Number(time_date[0]) - Number(unblock_time_date[0]) || //year match
    Number(time_date[1]) - Number(unblock_time_date[1]) || //month
    Number(time_date[2]) - Number(unblock_time_date[2]); //day
  if (result > 1) return true;

  if (result == 1) {
    let hours = Number(time_time[0]) - Number(unblock_time_time[0]); //hr
    let minutes = Number(time_time[1]) - Number(unblock_time_time[1]); //minute
    let seconds = Number(time_time[2]) - Number(unblock_time_time[2]); //second
    if (hours) return true;
    if (hours === 0 && minutes) return true;
    if (hours === 0 && minutes == 0 && seconds) return true;
  }
  return false;
}

app.get("/isdb", async (req, res) => {
  const query =
    "CREATE TABLE user(id INT AUTO_INCREMENT NOT NULL PRIMARY KEY , email VARCHAR(255) NOT NULL UNIQUE , password VARCHAR(255) NOT NULL , inc_password_attempts INT DEFAULT 0)";
  const data = await db.query(query);
  console.log(data);
  res.status(200).send(data);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
