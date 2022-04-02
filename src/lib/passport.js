const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    }, async (req, username, password, done) =>{
        const rows = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
        
        if(rows.length > 0){
            const user = rows[0];
            const validPassword = await helpers.matchPassword(password, user.password);
            if(validPassword){
             
              return done(null, user.ID);
            }else{
            return  done(null, false);
            }
        }else{
          return done(null, false);
        }

}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    },async (req, username, password, done) => {
        const Nombre = req.body.Nombre;
        const Ap_pat = req.body.Ap_pat;
        const Ap_mat = req.body.Ap_mat;
        const correo = req.body.correo;
        const type   = req.body.type_user;

        console.log(type);

        const newUser =[
          correo,
          await helpers.ecryptPassword(password)
        ] ;
        

        const result = await pool.query('INSERT INTO usuario(correo_electronico , contraseña) values (?,?)', newUser );
        
        const userID= result.insertId;

        const newUserType =[
          userID,
          Nombre,
          Ap_pat,
          Ap_mat
        ] ;

        switch (type) {
          case "alumno":
            
            const resulta = await pool.query('INSERT INTO usuario_alumno(id_usuario, nombre, apellido_paterno, apellido_materno) values (?,?,?,?)', newUserType );

            break;
        
          case "profesor":

            const resultb = await pool.query('INSERT INTO usuario_profesor(id_usuario, nombre, apellido_paterno, apellido_materno) values (?,?,?,?)', newUserType );

            break;
        }

        if (type == "alumno") {

          
          
        }
        return done(null, userID);
}));

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE ID = ?', [id]);
  done(null, rows[0]);
});