var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyBlVJ1kdpCqLG6Ro_s_aDjicmyMlZVXNf8",
    authDomain: "travelwithus-86002.firebaseapp.com",
  };
firebase.initializeApp(config);

/* Create a new firebase user */
router.post('/create', async function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  var errorCode = 0;
  var message = "";
  await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    errorCode = error.code;
    message = error.message;
  });
  if (errorCode == 0){
    await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      errorCode = error.code;
      message = error.message;
      console.log("ERROR MESSAGE --- " + message);
    });
  if (errorCode == 0){
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        user.sendEmailVerification().then(function() {
          console.log("Send email!!!!");
          }).catch(function(error) {
            errorCode = error.code;
            message = error.message;
            console.log("ERROR MESSAGE --- " + message);
          });
      };
    })
  }
  }
  res.send({ returnCode: errorCode, message: message});
  res.end(); 
});

//Sign In
router.post('/signin', async function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var errorCode = 0;
  var message = "";
  var uid = "";
  if (errorCode == 0){
    await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      errorCode = error.code;
      message = error.message;
      console.log("ERROR MESSAGE --- " + message);
    });
  }
  if (errorCode == 0){
    await firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("EMAIL VERIFY --- " + user.emailVerified);
        console.log("EMAIL --- " + user.email);
        console.log("UID --- " + user.uid);
        if(!user.emailVerified) {
          errorCode = 403;
          message = "Your email is not verified, please check your email again!";
        }
        else {
          errorCode = "OK";
          message = "login successfully!";
          uid = user.uid;
        }
      };
    })
  }
  res.send({ returnCode: errorCode, message: message, uid: uid, email: email });
  res.end(); 
  });
module.exports = router;
