const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const controller = require('./controller/main');
const userController = require('./controller/userController');

// const bodyParser = require('body-parser');
const auth = require('./auth');

var cors = require('cors')
var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
// app.use(bodyParser.json())


app.use(cors({
    methods: [ 'GET', 'POST' , 'DELETE' , 'PUT' ],
    origin: ['http://localhost:3000'],
    preflightContinue: false,
    optionsSuccessStatus:204,
    credentials:true
}));

// Connecting the DB
mongoose.connect('mongodb+srv://pasha1234:mehdipasha@cluster0.xwavmap.mongodb.net/?retryWrites=true&w=majority')
    .then( () => {
        console.log('DB is connected')
    })
    .catch( err => { 
        console.log(err)
    })


// Routes
    app.get('/',auth.isLoggedIn, controller.homePage)
    app.get('/add-question', controller.addQuestion)
    app.post('/new-question', controller.addNewQuestion)
    app.get('/question/:id',controller.seeMore )

    app.get('/userInfoPage', controller.userInfoPage)


    app.delete('/delete-question/:id',controller.deleteQuestion )
    app.get('/edit-page/:id',controller.editQuestion)
    app.post('/update-question/:id',controller.updateQuestion)
    app.get('/edit-comment/:id',controller.editComment)


    app.get('/register',auth.checkAuth, userController.register)
    app.get('/login',auth.checkAuth, userController.login)
    app.post('/create-user', userController.createUser)
    app.post('/login-user', userController.loginUser)
    app.get('/logged-out', userController.logOut)
    app.post('/add/:id/comment', controller.addComment)
    app.get('/deleteComment/:id',controller.deleteComment)
    app.post('/update-comment/:id',controller.updateComment)



    const port = 4000;
    app.listen(port, () => console.log(`server running on ${port}`))