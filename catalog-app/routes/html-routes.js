


module.exports = function(app) {
    app.get('/signup',(req,res) =>{
        res.render('signup',{
            messages: {
                signupFailed: req.flash('signupFailed')
            }
        })
    })

    app.get('/login',(req,res) =>{
        res.render('login')
    })
}