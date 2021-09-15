const express = require('express')
const handlebars = require('express-handlebars')
const session = require('express-session');
const passport = require('passport');
const {Strategy} = require('passport-local');
const SessionFileStore = require('session-file-store')(session);
const flash = require('express-flash');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path')
const {User,Product,Category} = require('./models');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null,path.join('uploads'))
      },
    filename: (req, file, cb) => {
        console.log(file)
        let ext = '.' + file.originalname.split('.').slice(-1)
        cb(null, 'profile-image' + '-' + Date.now() + ext)
      }
});

var upload = multer({
    storage
});


const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(upload.single('profile-photo'))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))

app.use(session({
    secret: "<`H2249`&#>(#3?",
    name: "catalogApp",
    resave: false,
    saveUninitialized: true,
    store: new SessionFileStore({
        path: './tmp/SessionFile'
    })
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser(async (id,done) => {
    console.log("deserializer:", id);
    const user = await User.findOne({
        where: {
            id
        },
        raw: true
    })
    done(null,user);
})
passport.use(new Strategy({
    usernameField: 'email'
},async (email,password,done) => {
    const user  = await User.findOne({
        where: {
            email
        }
    })

    if(!user || !bcrypt.compare(password,user)){
        done(null,false,{
            message: 'Email or password is incorrect'
        })
    }else{
        done(null,user);
    }
}));


app.engine('handlebars',handlebars({
    defaultLayout: 'main'
}))

app.set('view engine','handlebars');

// Routes
// =============================================================
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);





app.listen(3000, () =>{
    console.log('Works on 3000')
})


