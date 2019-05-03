import { async } from "q";

var request = require("request");
var ejs = require("ejs");

describe('Login API Test', function() {
    // Function
    it('should pass with valid credentials', async function(done) {
        request.post({
            "headers": { "content-type": "application/json" },
            "url": "http://139.180.141.253:3000/user/signin",
            "body": JSON.stringify({
              "email":"dmhuy@tma.com.vn",
              "password": "123456"
            })
      
            }, (error, response, body) => {
              if(error) {
                  return console.dir(error);
              }
              console.log("Body : ******");
              console.dir(JSON.parse(response.body).message);
              expect(JSON.parse(response.body).message).toEqual("login successfully!");
      
              // this below line took half day of research
              done();
        });
    });

    it('should failed with invalid credentials', async function(done) {
        request.post({
            "headers": { "content-type": "application/json" },
            "url": "http://139.180.141.253:3000/user/signin",
            "body": JSON.stringify({
              "email":"dmhuy@tma.com.vn",
              "password": "456789"
            })
      
            }, (error, response, body) => {
              if(error) {
                  return console.dir(error);
              }
              console.log("Body : ******");
              console.dir(JSON.parse(response.body).message);
              expect(JSON.parse(response.body).message).toEqual("The password is invalid or the user does not have a password.");
      
              // this below line took half day of research
              done();
        });
    });

    it('should failed with missing field request', async function(done) {
        request.post({
            "headers": { "content-type": "application/json" },
            "url": "http://139.180.141.253:3000/user/signin",
            "body": JSON.stringify({
              "email":"dmhuy@tma.com.vn",
            })
      
            }, (error, response, body) => {
              if(error) {
                  return console.dir(error);
              }
              console.log("Body : ******");
              console.dir(JSON.parse(response.body).message);
              expect(JSON.parse(response.body).message).toEqual("Bad request");   
              // this below line took half day of research
              done();
        });
    });
});
