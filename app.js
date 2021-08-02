
const express = require("express")
const sql = require("mysql")
const nodemailer = require('nodemailer');
const path = require("path")
const port = process.env.PORT || '5000'
const app = express()




// config
const public = path.join(__dirname, "./sources")
app.set("view engine", "hbs")
app.use(express.static(public))
app.use(express.urlencoded())
app.use(express.json())





// routes and controll

app.get("/", (req, res) => {
    res.render("contact")
})
app.post("/send", (req, res) => {
    const { name, skill, email, phone, message } = req.body

    const output = `
                            
                            <p>You submitted data</p>
                            <h3>Contact Details</h3>
                            <ul>  
                            <li>Name: ${name}</li>
                            <li>Company: ${skill}</li>
                            <li>Email: ${email}</li>
                            <li>Phone: ${phone}</li>
                            </ul>
                            <h3>Message</h3>
                            <p>${message}</p>
                              `;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'webdesigneravi@gmail.com', // generated ethereal user
            pass: 'askjlkajdklasjlk'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"ZAIRA " <webdesigneravi@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'ZAira member request data', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.render("submit")

    });
}
);

app.listen(port, () => {
    console.log("server statred")
})

