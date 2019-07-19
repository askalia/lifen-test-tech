
require('dotenv').config();
const bodyParser = require('body-parser');
const app = require('express')();

// Set up mongoose connection
const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URI;

if (! DATABASE_URL){
    throw 'DATABASE_URL must be defined. exit.';
}

mongoose.connect(DATABASE_URL, { 
    useNewUrlParser: true ,
    useCreateIndex: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.on('open', () => console.log('Connected to db'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', require('./routes'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is up and running on http://0.0.0.0:${port}`);
});
