var express = require('express');
var router = express.Router();
var LocalStorage = require('node-localstorage').LocalStorage, localStorage = new LocalStorage('./scratch');


/* GET home page. */
//router.get('/panel', function(req, res, next) {
//  res.render('root', { renderizar: 'main', usuario : 'GOOLAAA' });
//});

router.get('/login', function(req, res, next) {
  localStorage.setItem('usuario', 'nacho')
  res.render('component/login', { title: 'Plantitasgod', usuario: localStorage.getItem('usuario')});
});

//router.get('/principal/dashboard', function(req, res, next) {
//  localStorage.setItem('usuario', 'nacho')
//  res.render('index', { renderizar: 'main', usuario: localStorage.getItem('usuario')});
//});


//router.get('/pagina', function(req, res, next) {
//  res.render('dist/index', { renderizar: 'main', usuario : 'Ignacio' });
//});


//router.get('/principal', function(req, res, next) {
//  res.render('index', { renderizar: 'main', usuario : localStorage.getItem('usuario') });
//});

router.get('/dashboard', function(req, res, next) {
  res.render('index', { renderizar: 'main', usuario : localStorage.getItem('usuario') });
});

router.get('/automatico', function(req, res, next) {
  res.render('automatico', { renderizar: 'main', usuario : localStorage.getItem('usuario') });
});

router.get('/perfil', function(req, res, next) {
  res.render('perfil', { renderizar: 'main', usuario : localStorage.getItem('usuario') });
});




//router.get('/register', function(req, res, next){
//  res.render('component/auth-register', { title: 'ignacio', usuario: 'Nachito'});
//});
///// para cachar
///router.post('/login', (req, res)=>{
///  res.render('index', {title: 'Plantitasgod, password:password'});
///}); 

module.exports = router;
