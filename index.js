import express from "express"
import bodyParser from "body-parser"
import nodemailer from "nodemailer";
import pg from "pg";
import bcrypt from "bcrypt";
import env from "dotenv"

const app = express()
const port = 3000
env.config();

const saltRounds=10;
let optsendtime ="";
let otp="";
let email="";
let password="";
let name="";

const db = new pg.Client({
  user: process.env.PG_USER,      
  host: process.env.PG_HOST,     
  database: process.env.PG_DATABASE,   
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});
db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render("home.ejs")
})

app.get('/signup', (req, res) => {
  res.render("signup.ejs")
})

app.get('/signin', (req, res) => {
  res.render("signin.ejs")
})

app.post('/signin',async (req, res) => {
 email = req.body.email
password = req.body.password 

const result= await db.query("SELECT * FROM users WHERE email=$1",[email])

if(result.rows.length>0){
let storedpassword= result.rows[0].password
let storedname= result.rows[0].name
const match = await bcrypt.compare(password , storedpassword)
if(match){
    res.render("web.ejs",{name:storedname})
}else{
    res.send("Incorrect Password")
}
}else{
    res.send("This Email is not Exist! Registered Your Account First")
}
})

app.post('/signup', async (req, res) => {
     email = req.body.email
    password = req.body.password 
    name = req.body.name
   const result= await db.query("SELECT * FROM users WHERE email=$1",[email])

   if( result.rows.length>0){
   res.send("<h2>User Already Exists! <a href='/signin'>Login Here</a></h2>");
   }else{
    otp = Math.floor(100000 + Math.random() * 900000);
optsendtime= Date.now()
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "khanrohaan476@gmail.com",
        pass: "asxulyuvtqhymsze",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    async function main() {
      const info = await transporter.sendMail({
        to: email,
        subject: "For OTP verification ✔",
        html: `Your OTP is ${otp}`,
      });
      console.log("Message sent: %s", info.messageId);
    }
    await main();
  res.render("otp.ejs",{email:email})
   }  
})

app.get('/Resendcode', async(req, res) => {
   otp = Math.floor(100000 + Math.random() * 900000);
optsendtime= Date.now()
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "khanrohaan476@gmail.com",
        pass: "asxulyuvtqhymsze",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    async function main() {
      const info = await transporter.sendMail({
        to: email,
        subject: "For OTP verification ✔",
        html: `Your OTP is ${otp}`,
      });
      console.log("Message sent: %s", info.messageId);
    }
    await main();
  res.render("otp.ejs",{email:email})
   }
)

app.post('/verify-otp',async (req, res) => {
const otp2 = req.body.otp2

if (otp == otp2 && (Date.now() - optsendtime) <= 60000){
      const hashpassword= await bcrypt.hash( password , saltRounds )
 let result=  await db.query("INSERT INTO users (email , password , name) VALUES ($1 , $2 ,$3) RETURNING *",[email , hashpassword , name])
 let username = result.rows[0].name
 res.render("web.ejs",{name: username})
    }else {
    res.send("<h2>Invalid OTP! Try again.</h2>");
  }
})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
