const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Login = require('./routes/login/Login');
const Register = require('./routes/register/Register')
const bodyParser = require('body-parser');
const cors = require('cors');
const Model = require('./routes/dl_model/model');
const UpdateProfile = require('./routes/user_profile/profile');
const Verification = require('./routes/verification/verification');
const authorization = require('./middleware/authorization');
const Repos = require('./routes/githubOrg/github');
const Portfolio = require('./routes/portfolio/portfolio');

require('dotenv').config();
require('./dependencies');

// mongoose.connect('mongodb://localhost:27017/WeBase', {useNewUrlParser: true, useCreateIndex: true})
//     .then(() => console.log('Conncected to database'));

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-uegxx.mongodb.net/test?retryWrites=true&w=majority`, {dbName:'WeBase',useNewUrlParser: true})
    .then(res => console.log('Connected to datatbase'))
    .catch(err => console.log(err))

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/model', authorization, Model);
app.use('/profile', authorization, UpdateProfile);
app.use('/verification', Verification)
app.use('/login', Login);
app.use('/register', Register);
app.use('/repos', Repos);
app.use('/portfolio', Portfolio);

app.get('/', (req, res) => {
    res.send('Hello world - Node')
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Listening to port 3000')
})