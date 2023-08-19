const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv')
const PORT =process.env.PORT || 3000; 


dotenv.config()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.post('/sendEmail', (req, res) => {
    const { name ,email,message} = req.body ;
    const transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: 'saad123mn123@gmail.com', 
        pass: process.env.GPASS,
        clientSecret:process.env.clientSecret
      }
    });
    const mailOptions = {
      from: email,  
      to: 'saad123mn123@gmail.com',    
      subject: `${name} message you from portfolio`,
      text: message
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent succesfully:', info.response);
      }
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
