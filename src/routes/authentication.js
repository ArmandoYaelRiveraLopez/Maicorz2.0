const express = require('express');
const router = express.Router();
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn, isAdmin} =require('../lib/auth');
const pool = require('../database');

//Render y redirect de registro
router.get('/signup', isNotLoggedIn, (req, res) => {
  res.render('auth/signup');
});

router.post('/signup', (req, res, next) =>{
  passport.authenticate('local.signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup',
  failureFlash: true
  })(req, res, next)
});

//Render y redirect de inicio de sesion
router.get('/signin', isNotLoggedIn, (req, res) =>{
  res.render('auth/signin')
});

router.post('/signin',  (req, res, next) =>{
  passport.authenticate('local.signin', {
    successRedirect: '/administrator',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next)
});


//Redirect de usuario
router.get('/profile', isLoggedIn, async (req,res) =>{
  res.render('profile', );
});
router.get('/resultadosexm', isLoggedIn, async (req,res) =>{
  const resultadosexm = await pool.query('SELECT * FROM examen where Id_user =?', [req.user.ID]);
  res.render('links/examenresult', {resultadosexm});
});

//Redirect de admin
router.get('/administrator', isAdmin, async (req,res) =>{
  const usuarios = await pool.query('SELECT * FROM usuarios');
  res.render('links/list', {usuarios});
});

router.get('/resultados', isAdmin, async (req,res) =>{
  const resultados = await pool.query('SELECT u.Ap_pat,u.Ap_mat,u.Nombre, c.resultado, c.materia from usuarios as u inner join cuestionario as c on u.ID=c.user_id');
  res.render('links/listresult', {resultados});
});

router.get('/examenes', isAdmin, async (req,res) =>{
  const resultados = await pool.query('SELECT u.Ap_pat,u.Ap_mat,u.Nombre, e.resultado, e.matematicas, e.espa, e.biologia, e.fisica, e.quimica, e.historia, e.geografia, e.formacion from usuarios as u inner join examen as e on u.ID=e.Id_user');
  res.render('links/listexam', {resultados});
});

router.get('/adminexam', isAdmin, async (req,res) =>{
  res.render('links/examenadmin');
});

router.post('/adminexam', isAdmin, async (req,res) =>{
  const { Pregunta, A, B, C, D } = req.body;
  const newAsk = {
      Pregunta,
      A,
      B,
      C,
      D
  };
  await pool.query('INSERT INTO preguntas set ?', [newAsk]);
  res.redirect('/adminexam');
});

router.get('/modifyexam', isAdmin, async (req,res) =>{
  const exam = await pool.query('SELECT * FROM preguntas')
  res.render('links/tablaexamen', {exam: exam});
});
router.get('/cuest', isAdmin, async (req,res) =>{
  const exam = await pool.query('SELECT * FROM preguntas')
  res.render('links/cuestadmin', {exam: exam});
});
router.get('/delete/:pregunta', async (req,res) =>{
  const {pregunta} = req.params;
  await pool.query('DELETE FROM preguntas where Pregunta = ?', [pregunta]);
  res.redirect('/modifyexam');
});
router.get('/deleteuser/:username', async (req,res) =>{
  const {username} = req.params;
  await pool.query('DELETE FROM usuarios where username = ?', [username]);
  res.redirect('/administrator');
});

router.get('/edit/:numero', async (req,res) =>{
  const {numero} = req.params;
  const pregunta = await pool.query('SELECT * FROM preguntas WHERE numero = ?', [numero])
  res.render('links/edit', {pregunta: pregunta[0]});
});

router.post('/edit/:numero', async (req,res) =>{
  const { numero } = req.params;
  const {Pregunta, A, B, C, D} = req.body;
  const actAsk = {
    Pregunta,
    A,
    B,
    C,
    D
  }
  await pool.query('UPDATE preguntas set ? WHERE numero = ?', [actAsk, numero]);
  res.redirect('/modifyexam');
});
router.get('/adminc1', isAdmin, async (req,res) =>{
  res.render('links/c1');
});

router.post('/adminc1', isAdmin, async (req,res) =>{
  const { Pregunta, A, B, C, D } = req.body;
  const Materia = "espa";
  const newAsk = {
      Materia,
      Pregunta,
      A,
      B,
      C,
      D
  };
  await pool.query('INSERT INTO cuestionarios set ?', [newAsk]);
  res.redirect('/adminc1');
});
router.get('/modifyc1', isAdmin, async (req,res) =>{
  const c1 = await pool.query('SELECT * FROM cuestionarios Where Materia="espa"');
  res.render('links/m1', {c1: c1});
});

router.get('/deletec1/:pregunta', async (req,res) =>{
  const {pregunta} = req.params;
  await pool.query('DELETE FROM cuestionarios where numero = ?', [pregunta]);
  res.redirect('/modifyc1');
});

router.get('/adminc2', isAdmin, async (req,res) =>{
  res.render('links/c2');
});
router.post('/adminc2', isAdmin, async (req,res) =>{
  const { Pregunta, A, B, C, D } = req.body;
  const Materia = "mate";
  const newAsk = {
      Materia,
      Pregunta,
      A,
      B,
      C,
      D
  };
  await pool.query('INSERT INTO cuestionarios set ?', [newAsk]);
  res.redirect('/adminc2');
});
router.get('/modifyc2', isAdmin, async (req,res) =>{
  const c1 = await pool.query('SELECT * FROM cuestionarios Where Materia="mate" ');
  res.render('links/m2', {c1: c1});
});

router.get('/deletec2/:pregunta', async (req,res) =>{
  const {pregunta} = req.params;
  await pool.query('DELETE FROM cuestionarios where numero = ?', [pregunta]);
  res.redirect('/modifyc2');
});
router.get('/adminc3', isAdmin, async (req,res) =>{
  res.render('links/c3');
});
router.post('/adminc3', isAdmin, async (req,res) =>{
  const { Pregunta, A, B, C, D } = req.body;
  const Materia = "historia";
  const newAsk = {
      Materia,
      Pregunta,
      A,
      B,
      C,
      D
  };
  await pool.query('INSERT INTO cuestionarios set ?', [newAsk]);
  res.redirect('/adminc3');
});
router.get('/modifyc3', isAdmin, async (req,res) =>{
  const c1 = await pool.query('SELECT * FROM cuestionarios Where Materia="historia" ');
  res.render('links/m3', {c1: c1});
});

router.get('/deletec3/:pregunta', async (req,res) =>{
  const {pregunta} = req.params;
  await pool.query('DELETE FROM cuestionarios where numero = ?', [pregunta]);
  res.redirect('/modifyc3');
});
router.get('/adminc4', isAdmin, async (req,res) =>{
  res.render('links/c4');
});
router.post('/adminc4', isAdmin, async (req,res) =>{
  const { Pregunta, A, B, C, D } = req.body;
  const Materia = "quimica";
  const newAsk = {
      Materia,
      Pregunta,
      A,
      B,
      C,
      D
  };
  await pool.query('INSERT INTO cuestionarios set ?', [newAsk]);
  res.redirect('/adminc4');
});
router.get('/modifyc4', isAdmin, async (req,res) =>{
  const c1 = await pool.query('SELECT * FROM cuestionarios Where Materia="quimica" ');
  res.render('links/m4', {c1: c1});
});

router.get('/deletec4/:pregunta', async (req,res) =>{
  const {pregunta} = req.params;
  await pool.query('DELETE FROM cuestionarios where numero = ?', [pregunta]);
  res.redirect('/modifyc4');
});
router.get('/adminc5', isAdmin, async (req,res) =>{
  res.render('links/c5');
});
router.post('/adminc5', isAdmin, async (req,res) =>{
  const { Pregunta, A, B, C, D } = req.body;
  const Materia = "biologia";
  const newAsk = {
      Materia,
      Pregunta,
      A,
      B,
      C,
      D
  };
  await pool.query('INSERT INTO cuestionarios set ?', [newAsk]);
  res.redirect('/adminc5');
});
router.get('/modifyc5', isAdmin, async (req,res) =>{
  const c1 = await pool.query('SELECT * FROM cuestionarios Where Materia="biologia" ');
  res.render('links/m5', {c1: c1});
});

router.get('/deletec5/:pregunta', async (req,res) =>{
  const {pregunta} = req.params;
  await pool.query('DELETE FROM cuestionarios where numero = ?', [pregunta]);
  res.redirect('/modifyc5');
});
router.get('/adminc6', isAdmin, async (req,res) =>{
  res.render('links/c6');
});
router.post('/adminc6', isAdmin, async (req,res) =>{
  const { Pregunta, A, B, C, D } = req.body;
  const Materia = "formacion";
  const newAsk = {
      Materia,
      Pregunta,
      A,
      B,
      C,
      D
  };
  await pool.query('INSERT INTO cuestionarios set ?', [newAsk]);
  res.redirect('/adminc6');
});
router.get('/modifyc6', isAdmin, async (req,res) =>{
  const c1 = await pool.query('SELECT * FROM cuestionarios Where Materia="formacion" ');
  res.render('links/m6', {c1: c1});
});

router.get('/deletec6/:pregunta', async (req,res) =>{
  const {pregunta} = req.params;
  await pool.query('DELETE FROM cuestionarios where numero = ?', [pregunta]);
  res.redirect('/modifyc6');
});
router.get('/adminc7', isAdmin, async (req,res) =>{
  res.render('links/c7');
});
router.post('/adminc7', isAdmin, async (req,res) =>{
  const { Pregunta, A, B, C, D } = req.body;
  const Materia = "geo";
  const newAsk = {
      Materia,
      Pregunta,
      A,
      B,
      C,
      D
  };
  await pool.query('INSERT INTO cuestionarios set ?', [newAsk]);
  res.redirect('/adminc7');
});
router.get('/modifyc7', isAdmin, async (req,res) =>{
  const c1 = await pool.query('SELECT * FROM cuestionarios Where Materia="geo" ');
  res.render('links/m7', {c1: c1});
});

router.get('/deletec7/:pregunta', async (req,res) =>{
  const {pregunta} = req.params;
  await pool.query('DELETE FROM cuestionarios where numero = ?', [pregunta]);
  res.redirect('/modifyc7');
});
router.get('/adminc8', isAdmin, async (req,res) =>{
  res.render('links/c8');
});
router.post('/adminc8', isAdmin, async (req,res) =>{
  const { Pregunta, A, B, C, D } = req.body;
  const Materia = "fisic";
  const newAsk = {
      Materia,
      Pregunta,
      A,
      B,
      C,
      D
  };
  await pool.query('INSERT INTO cuestionarios set ?', [newAsk]);
  res.redirect('/adminc8');
});
router.get('/modifyc8', isAdmin, async (req,res) =>{
  const c1 = await pool.query('SELECT * FROM cuestionarios Where Materia="fisic" ');
  res.render('links/m8', {c1: c1});
});

router.get('/deletec8/:pregunta', async (req,res) =>{
  const {pregunta} = req.params;
  await pool.query('DELETE FROM cuestionarios where numero = ?', [pregunta]);
  res.redirect('/modifyc8');
});
router.get('/stats', isAdmin, async(req, res) =>{
  const examen = await pool.query('SELECT * FROM examen');
  res.render('links/estadisticas', {examen});
});
router.get('/statscuest', isAdmin, async(req, res) =>{
  const cuest = await pool.query('SELECT * FROM cuestionario');
  res.render('links/estadisticascuest', {cuest});
});

router.get('/chat', isLoggedIn,(req, res) =>{
  res.render('links/chat')
});

//Cerrar sesion
router.get('/logout', (req, res) =>{
  req.logOut();
  res.redirect('/signin')
});


module.exports = router;