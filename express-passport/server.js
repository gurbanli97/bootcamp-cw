const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('flash');
const passport = require('passport');
const {Strategy} = require('passport-local');
const models = require('./models');
const bcrypt = require('bcrypt');
const path = require('path')
const handlebars = require('express-handlebars');


const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("assets"))


app.engine('handlebars',handlebars({
    defaultLayout: 'main'
}))

app.set('view engine','handlebars');


app.use(session({
    secret: 'BOE7YXDXRj6Z:Br',
    name: 'blogpass',
    store: new FileStore({
        path: './tmp/sessions'
    }),
    resave: true,
    saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser((user,done) => {
    done(null,user.id);
});
passport.deserializeUser(async (id,done) => {
    const user = await models.User.findOne({
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
    const user  = await models.User.findOne({
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



app.post('/signup', async (req,res) => {
    try{
        const {firstname,lastname,email,password} = req.body
        const user = await models.User.create({
            firstname,
            lastname,
            email,
            password: bcrypt.hashSync(password,12)
        })

        res.json({
            ...user.get({plain:true}),
            password: undefined
        })
    }catch(e){
        res.status(500).end()
    }
});

    app.get('/signup',(req,res) => {
        res.render('signup')
    });



    const authenticationOptions = {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        usernameField: 'email'
    }
    app.post('/login',passport.authenticate('local',authenticationOptions),async (req,res) => {

    });

    app.get('/login',async (req,res) => {
        res.render('login')
    });

    app.get('/',(req,res) => {
        res.send('DONE')
    });

app.listen(3000,() => {
    console.log('Running on 3000')
})