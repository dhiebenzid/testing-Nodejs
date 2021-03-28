const User = require('../models/user');
const jwt = require('jsonwebtoken');
var bcrypt = require("bcrypt");


module.exports.signUp = async (req, res) => {
    try {
      //const user = await User.create({nom, prenom, email, password });
      //res.status(201).json({ user: user._id});
      User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
          var user = new User({
            nom : req.body.nom,
            prenom : req.body.prenom,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
          }); 
          user.save((err, user) => {
            if (err) res.json(err);
            else res.status(201).json("User Created");
          });
    }
    else {
        res.status(403).json("User already exist")
      }

    }) }

    catch(err) {
      //const errors = signUpErrors(err);
      res.json("erreur")
    }
  }


  module.exports.login = async (req, res) => { 
    try {
      User.findOne({email:req.body.email},(err,user)=>{
        if(err) res.json(err)
        if(!user) res.json("check your logins");
        else {
          if(bcrypt.compareSync(req.body.password,user.password)){
            var token = jwt.sign({user},'secret',{expiresIn:3600})
            res.json(token)
          }else{
            res.json("incorrect password")
          }
        }
      })
    }
    catch {
      res.json("error")
    }
   

  }

   module.exports.login2 = async (req, res) => { 
    try {
      User.findOne({email:req.body.email},(err,user)=>{
        if(err) res.json(err)
        if(!user) res.json("check your logins");
        else {
          if(bcrypt.compareSync(req.body.password,user.password)){
            var token = jwt.sign({user},'secret',{expiresIn:3600})
            res.json(token)
          }else{
            res.json("incorrect password")
          }
        }
      })
    }
    catch {
      res.json("error")
    }
   

  }