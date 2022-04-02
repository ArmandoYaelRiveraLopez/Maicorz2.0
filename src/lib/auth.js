module.exports={
    //si esta logeado
    isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            if(req.user.ID=="55"){
                return res.redirect('/administrator');
            }else{
            return next();
        }
        }
        return res.redirect('/signin');
    },
    //Si no esta logeado
    isNotLoggedIn(req, res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }, 
    //Si es admin
    isAdmin(req, res, next){
        if(req.isAuthenticated()){
            if(req.user.ID=="55"){
                return next();
            }
            return res.redirect('/signin');
        }
        return res.redirect('/signin');
    
    },
}