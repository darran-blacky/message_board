const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const messages = require('./db/messages');

const app = express();

//middleware

app.use(morgan('tiny')); //tiny is just the type of log
app.use(cors());
app.use(bodyParser.json());

//route

app.get('/', (req, res) => {
 res.json({
  message: 'full stack message board!'
 });
});

app.get('/messages', (req, res) => { //when a request comes in on 'messages'
    messages.getAll().then((messages) =>{ //get all the messages in the database
        res.json(messages); //display them in json format
    });
});

app.post('/messages', (req, res) => {
    console.log(req.body);

    messages.create(req.body).then((message) => {
        res.json(message);
    }).catch((error) =>{
        res.status(500);
        res.json(error);
    });
});
const port = process.env.PORT || 1234;
app.listen(port, () => {
 console.log(`Listening on ${port}`);
});
