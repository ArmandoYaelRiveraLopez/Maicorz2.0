const { request } = require('express');
const express = require('express');
const router = express.Router();
const {isLoggedIn,isAdmin} =require('../lib/auth');
const pool = require('../database');


//Examen
router.get('/examen', isLoggedIn, async(req, res) =>{
    const exam = await pool.query('SELECT * FROM preguntas')
    res.render('links/examen', {exam: exam});
});
router.post('/examen', async (req, res) => {
    const { cuadrito, matematicas, espa, biologia, fisica, quimica, historia, geografia, formacion } = req.body;
    const newExam = {
        resultado: cuadrito,
        Id_user: req.user.ID,
        matematicas: matematicas,
        espa: espa,
        biologia: biologia,
        fisica: fisica,
        quimica: quimica,
        historia: historia,
        geografia: geografia,
        formacion: formacion
    };
    await pool.query('INSERT INTO examen set ?', [newExam]);
    res.redirect('/resultadosexm');
});
    
//Cuestionario
router.get('/calificaciones', isLoggedIn, (req, res) =>{
    res.render('links/resultados')
});
router.get('/resultadoscuest', isLoggedIn, async(req, res) =>{
    const resultadoscuest = await pool.query('SELECT * FROM cuestionario where user_id =?', [req.user.ID]);
    res.render('links/cuestionario',{resultadoscuest})
});
router.get('/materias', isLoggedIn, (req, res) =>{
    res.render('links/materias')
});
router.get('/cuestionario1', isLoggedIn, async(req, res) =>{
    const exam = await pool.query('SELECT * FROM cuestionarios Where Materia="espa"')
    res.render('links/ca1', {exam})
});
router.post('/cuestionario1', async(req, res) =>{
    const { cuadrito } = req.body;
    const newCuest = {
        resultado: cuadrito,
        user_id: req.user.ID,
        materia: "Español"
    };
    await pool.query('INSERT INTO cuestionario set ?', [newCuest]);
    res.redirect('/profile');
});
router.get('/cuestionario2', isLoggedIn, async(req, res) =>{
    const exam = await pool.query('SELECT * FROM cuestionarios Where Materia="mate"')
    res.render('links/ca2', {exam})
});
router.post('/cuestionario2', async(req, res) =>{
    const { cuadrito } = req.body;
    const newCuest = {
        resultado: cuadrito,
        user_id: req.user.ID,
        materia: "Matematicas"
    };
    await pool.query('INSERT INTO cuestionario set ?', [newCuest]);
    res.redirect('/usuario/resultadoscuest');
});

router.get('/cuestionario3', isLoggedIn, async(req, res) =>{
    const exam = await pool.query('SELECT * FROM cuestionarios Where Materia="historia"')
    res.render('links/ca3', {exam})
});
router.post('/cuestionario3', async(req, res) =>{
    const { cuadrito } = req.body;
    const newCuest = {
        resultado: cuadrito,
        user_id: req.user.ID,
        materia: "Historia"
    };
    await pool.query('INSERT INTO cuestionario set ?', [newCuest]);
    res.redirect('/usuario/resultadoscuest');
});

router.get('/cuestionario4', isLoggedIn, async(req, res) =>{
    const exam = await pool.query('SELECT * FROM cuestionarios Where Materia="quimica"')
    res.render('links/ca4', {exam})
});
router.post('/cuestionario4', async(req, res) =>{
    const { cuadrito } = req.body;
    const newCuest = {
        resultado: cuadrito,
        user_id: req.user.ID,
        materia: "Quimica"
    };
    await pool.query('INSERT INTO cuestionario set ?', [newCuest]);
    res.redirect('/usuario/resultadoscuest');
});
router.get('/cuestionario5', isLoggedIn, async(req, res) =>{
    const exam = await pool.query('SELECT * FROM cuestionarios Where Materia="biologia"')
    res.render('links/ca5', {exam})
});
router.post('/cuestionario5', async(req, res) =>{
    const { cuadrito } = req.body;
    const newCuest = {
        resultado: cuadrito,
        user_id: req.user.ID,
        materia: "Biologia"
    };
    await pool.query('INSERT INTO cuestionario set ?', [newCuest]);
    res.redirect('/usuario/resultadoscuest');
});
router.get('/cuestionario6', isLoggedIn, async(req, res) =>{
    const exam = await pool.query('SELECT * FROM cuestionarios Where Materia="formacion"')
    res.render('links/ca6', {exam})
});
router.post('/cuestionario6', async(req, res) =>{
    const { cuadrito } = req.body;
    const newCuest = {
        resultado: cuadrito,
        user_id: req.user.ID,
        materia: "Formacion"
    };
    await pool.query('INSERT INTO cuestionario set ?', [newCuest]);
    res.redirect('/usuario/resultadoscuest');
});
router.get('/cuestionario7', isLoggedIn, async(req, res) =>{
    const exam = await pool.query('SELECT * FROM cuestionarios Where Materia="geo"')
    res.render('links/ca7', {exam})
});
router.post('/cuestionario7', async(req, res) =>{
    const { cuadrito } = req.body;
    const newCuest = {
        resultado: cuadrito,
        user_id: req.user.ID,
        materia: "Geografia"
    };
    await pool.query('INSERT INTO cuestionario set ?', [newCuest]);
    res.redirect('/usuario/resultadoscuest');
});
router.get('/cuestionario8', isLoggedIn, async(req, res) =>{
    const exam = await pool.query('SELECT * FROM cuestionarios Where Materia="fisic"')
    res.render('links/ca8', {exam})
});
router.post('/cuestionario8', async(req, res) =>{
    const { cuadrito } = req.body;
    const newCuest = {
        resultado: cuadrito,
        user_id: req.user.ID,
        materia: "Fisica"
    };
    await pool.query('INSERT INTO cuestionario set ?', [newCuest]);
    res.redirect('/usuario/resultadoscuest');
});
//Comipems
router.get('/comipems', isLoggedIn,(req, res) =>{
    res.render('links/comipems')
});

//Escuelas

router.get('/escuelas',isLoggedIn, (req, res) =>{
    res.render('links/escuelaspag')
});
router.get('/cecyt1', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt1')
});
router.get('/cecyt2', isLoggedIn, (req, res) =>{
    res.render('escuelas/cecyt2')
});
router.get('/cecyt3', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt3')
});
router.get('/cecyt4', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt4')
});
router.get('/cecyt5', isLoggedIn, (req, res) =>{
    res.render('escuelas/cecyt5')
});
router.get('/cecyt6', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt6')
});
router.get('/cecyt7', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt7')
});
router.get('/cecyt8', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt8')
});
router.get('/cecyt9', isLoggedIn, (req, res) =>{
    res.render('escuelas/cecyt9')
});
router.get('/cecyt10', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt10')
});
router.get('/cecyt11', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt11')
});
router.get('/cecyt12', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt12')
});
router.get('/cecyt13', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt13')
});
router.get('/cecyt14', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt14')
});
router.get('/cecyt15', isLoggedIn,(req, res) =>{
    res.render('escuelas/cecyt15')
});

//Chat


//aula
router.get('/aula', isLoggedIn,(req, res) =>{
    res.render('links/aula')
});

module.exports = router;