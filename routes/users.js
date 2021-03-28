var express = require('express')
var router = express.Router()
const authController = require('../controllers/auth.controller');

router.post("/register", authController.signUp);
router.post("/login", authController.login);


module.exports = router;