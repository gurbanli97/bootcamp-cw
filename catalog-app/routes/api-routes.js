
const {User} = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');


module.exports = function(app) {
app.post('/signup',async (req,res) =>{
    console.log('File',req.file)
    try{
        const {firstname,lastname,username,email,password} = req.body;
        const  newUser = await User.create({
            firstname,
            lastname,
            username,
            password: bcrypt.hashSync(password,12),
            email,
            profileImage: req.file.path
        });
        res.redirect('/login')

    }catch(err){
        console.log(err)
        req.flash("signupFailed", "Some Error");
        res.redirect('/signup')
    }
});
    app.post('/login',passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
        usernameField: 'email'
    }),async (req,res) => {});

}