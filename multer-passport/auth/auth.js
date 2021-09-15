module.exports = {
    superior : function(req, res, next){
      if(req.isAuthenticated() && req.user.role === "admin"){
        return next();
      }
      req.flash('error_msg', 'Please log in as admin to view that resource');
      return res.redirect('/dashboard');
    },
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      return res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');      
    }
  };
  