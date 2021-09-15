const express = require('express');
const handlebars = require('express-handlebars');
const session = require('express-session');
const SessionFileStore = require('session-file-store')(session);
const flash = require('express-flash');
const bcrypt = require('bcrypt')
const {Author,Post} = require('./models');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.engine('handlebars',handlebars({
    defaultLayout: 'main'
}))

app.set('view engine','handlebars');


app.use(session({
    secret: "<`H2249`&#>(#3?",
    name: "blogapp",
    resave: true,
    saveUninitialized: false,
    store: new SessionFileStore({
        path: './tmp/SessionFile'
    })
}))

app.use(flash());


app.use(async (req,res,next) => {
    if(!req.path.endsWith('/login') && !req.path.endsWith('/signup')){
        if(!req.session.isAuthinticated){
            return res.redirect('/login')
        }
    }
    next();
})


app.get('/login',(req,res) =>{
    res.render('login')
})

app.post ('/login', async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await Author.findOne({
                where:{
                    email
                },
                raw: true
        });

        if(!user || !bcrypt.compareSync(password,user.password)) {
         flash('loginFailed','Email or password is incorrect')
         return   res.redirect('/login')
        }

        req.session.user = {
            ...user,
            password: undefined
        };

        console.log(req.session.user)
        req.session.isAuthinticated = true

        res.redirect('/');

    }catch(e){
        console.log(e)
        flash('loginFailed','Email or password is incorrect')
        res.redirect('/login')

    }


})


app.get('/signup',(req,res) =>{
    res.render('signup')
})

app.post('/signup',async (req,res) =>{
    try{
        const {firstname,lastname,email,password} = req.body;


        const  newAuthor = await Author.create({
            firstname,
            lastname,
            password: bcrypt.hashSync(password,12),
            email
        });


        res.redirect('/login')

    }catch(e){
        console.log(e)
         flash('signupFailed','Couldnt create Author')
        res.redirect('/signup')
    }
})

app.get('/', async (req,res) => {
    if(!req.session.isAuthinticated){
        return res.redirect('/login')
    }
    res.render('home',{
    });
})


app.post('/', async (req,res) => {
    try{
        const {title,article} = req.body
        var newPost  = await Post.create({
            AuthorId: req.session.user.id,
            title,
            content: article
        });

        req.flash("successMessage", "Post successfully created");

    }catch(err){
        console.log(err);

        req.flash("errorMessage", "Post creation error");

    }finally{
        res.redirect('/')
        console.log(req.body)

    }
})







app.listen(3000,() => {
    console.log('Works on 3000')
})