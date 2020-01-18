require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const {verification , test} = require('./controllers/verification');
const {messageWebhook} = require('./helpers/messageWebhook');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', verification);
app.post('/', messageWebhook);

app.listen(3000, () => console.log('Webhook Server is listening, port 3000'));