var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/panel', function(req, res, next) {
  res.render('root', { renderizar: 'main', usuario : 'ignacio' });
});

router.get('/login', function(req, res, next) {
  res.render('component/login', { title: 'Plantitasgod', usuario : 'Nachito' });
});

///////////
router.get('/register', function(req, res, next){
  res.render('component/auth-register', { title: 'ignacio', usuario: 'Nachito'});
});
///// para cachar
///router.post('/login', (req, res)=>{
///  res.render('index', {title: 'Plantitasgod, password:password'});
///}); 

module.exports = router;
