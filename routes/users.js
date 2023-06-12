var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/recibe-data', (req, res, next) => {
  const {temp, hum} = req.body

  console.log(req.body)

  res.send("Recibi los datos.")

})

module.exports = router;
