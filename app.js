const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/sociomedia',{useNewUrlParser: true}).then((db)=>{
	console.log('Mongodb Connected!');
}).catch(error=> console.log('ERROR!'+ error));

//Using Static
app.use(express.static(path.join(__dirname,'public')));

//Set view Engine

const {generateTime} = require('./helpers/handlebars-helpers');

app.engine('handlebars',exphbs({defaultLayout: 'home',helpers:{generateTime : generateTime}}));
app.set('view engine','handlebars');

//Upload Middleware
app.use(upload());

//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

///Method Override
app.use(methodOverride('_method'));

app.use(session({

  secret: 'sociomedia',
  resave: true,
  saveUninitialized: true,
  //cookie: { secure: true }

}));

app.use(flash());

//Local Variables Using Middlewares
app.use((req,res,next)=>{
	res.locals.success_message = req.flash('success_message');
	next();
});

//Load Routes
const home = require('./routes/home/main');
const login = require('./routes/admin/login');
const logout = require('./routes/admin/logout');
const signup = require('./routes/admin/signup');
const profilepage = require('./routes/home/profilepage');
const friendrequest = require('./routes/home/friend-request');
const checkreqstatus = require('./routes/home/check-req-status');
const acceptfrndreq = require('./routes/home/accept-friend-request');
const removefrndreq = require('./routes/home/remove-friend-request');
const comment = require('./routes/home/comment')
const search = require('./routes/home/search');
//const admin_page = require('./routes/admin/posts-index');
//Use Routes 
app.use('/',home);
app.use('/login',login);
app.use('/logout',logout);
app.use('/signup',signup);
app.use('/friend-request',friendrequest);
app.use('/',profilepage);
app.use('/accept-friend-request',acceptfrndreq);
app.use('/check-req-status',checkreqstatus);
app.use('/remove-friend-request',removefrndreq);
app.use('/comment',comment);
app.use('/search',search);
//app.use('/',admin_page);
 
app.listen(4500,()=>{
//console.log(`listening on port 4500`);
});