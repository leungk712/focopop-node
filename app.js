const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const modal = require('./Orders');
const request = require('request');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", (req, res) => {
    let month = new Date().getMonth();
    let dayOfWeek = new Date().getDay();
    const date = new Date().getDate();

  switch(dayOfWeek){
    case 0:
      dayOfWeek = "Sunday";
      break;
    case 1:
      dayOfWeek = "Monday";
      break;
    case 2:
      dayOfWeek = "Tuesday";
      break;
    case 3:
      dayOfWeek = "Wednesday";
      break;
    case 4:
      dayOfWeek = "Thursday";
      break;
    case 5:
      dayOfWeek = "Friday";
      break;
    case 6:
      dayOfWeek = "Saturday";
      break;
  }
  
  switch(month){
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    default:
      month = "December";
      break;
  }

  const message = `Today is ${dayOfWeek}, ${month} ${date}, the perfect day to go to FoCo Pop! See you soon!`;
  res.render('home', { message: message }); 
});

app.post("/", (req, res) => {
  const { firstName, lastName, email } = req.body;
  
  // Make sure fields are filled
  if(!firstName || !lastName || !email) {
    res.redirect('home');
    return;
  }
  
  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
      ]
  };
  
  const postData = JSON.stringify(data);
  
  const options = {
    url: 'https://us3.api.mailchimp.com/3.0/lists/4a98c9b6f1',
    method: 'POST',
    headers: {
      Authorization: 'auth ba07980f5620910dc65d48120fefab83-us3'
    },
    body: postData
  };
  
  request(options, (err, response, body) => {
    if(err) {
      res.redirect('/');
    } else {
      if(response.statusCode === 200) {
        res.render('home');
      } else {
        res.render('home');
      }
    }
  });
});

app.get("/orders", (req, res) => {
  res.render('orders'); 
});

app.post("/orders-receipt", (req, res) => {
  const { name, email, phone, textarea } = req.body;
  console.log(name, email, phone, textarea);
  res.render('orders-receipt', {Name: name, Email: email, Phone: phone, Textarea: textarea, error: false}); 
});

app.listen(process.env.PORT, process.env.IP, () => {
  console.log(`FoCo Pop! Let's get going!`);
});