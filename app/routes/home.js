/*

  Datamonkey - An API for comparative analysis of sequence alignments using state-of-the-art statistical models.

  Copyright (C) 2015
  Sergei L Kosakovsky Pond (spond@ucsd.edu)
  Steven Weaver (sweaver@ucsd.edu)

  Permission is hereby granted, free of charge, to any person obtaining a
  copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be included
  in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

var nodemailer    = require('nodemailer'),
    sendmailTransport = require('nodemailer-sendmail-transport');


exports.homePage = function (req, res) {
  res.render('index.ejs');
}

exports.faq = function (req, res) {
  res.render('faq.ejs');
};

exports.development = function (req, res) {
  res.render('development.ejs');
};

exports.account = function (req, res) {
  res.render('account.ejs');
};

exports.accountMail = function (req, res) {

  var postdata = req.body;

  console.log(postdata);

  var name  = postdata.name;
  var email = postdata.email;
  var institution = postdata.institution;
  var desc = postdata.description;

  var transport = nodemailer.createTransport(
     sendmailTransport({
      path: '/usr/sbin/sendmail'
    })  
  );  

  var subject =  "[Silverback Account Request]";
  msg = "Name  : " + name + "\n";
  msg += "Email : " + email + '\n';
  msg += "Institution : " + institution + '\n';
  msg += "Description : " + desc + '\n';

  var mailOptions = { 
    from    : "datamonkey <no-reply@datamonkey.org>",
    to      : 'sweaver@ucsd.edu', 
    subject : subject,
    text    : msg 
  };  

  // send mail with defined transport object
  transport.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
    }

    // If you don't want to use this transport object anymore, 
    // uncomment following line
    transport.close();
  
  }); 


  res.render('account-thanks.ejs');


};

