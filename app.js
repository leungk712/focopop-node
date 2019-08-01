const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res) =>{
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

let message = `Today is ${dayOfWeek}, ${month} ${date}, the perfect day to go to FoCo Pop! See you soon!`
    
   res.render('home', {message: message}); 
});

app.get("/orders", (req, res) => {
   res.render('orders'); 
});


app.listen(process.env.PORT, process.env.IP, function () {
  console.log(`FoCo Pop! Let's get going!`);
});