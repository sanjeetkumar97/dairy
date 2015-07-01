var DairyModel = require('../models/dairy');
var express = require('express');
var router = express.Router();
var moment = require('moment');


router.route('/api/recentEntry').get(function (req, res){
      var one;
      DairyModel.find(function(err,dairies){
        for(var i = 0;i<dairies.length;i++){

          var one = dairies[dairies.length-1];
          console.log(one);
          
        }
       return res.send(one);
      });

    });

router.route('/api/label').post(function(req,res){
  var fLabel = req.body.label;
 // var pattern = /+stext+/i;
  var pattern = new RegExp(fLabel,"i");
  var results = [];

DairyModel.find(function(err,dairies){
    for(var i = 0;i<dairies.length;i++){
      var dairy = dairies[i];
      if(pattern.test(dairy.label)){
        results.push(dairy);
      }
    }
   return res.send(results);
  });

});

router.route('/api/text').post(function(req,res){
  var fText = req.body.text;
 // var pattern = /+stext+/i;
  var pattern = new RegExp(fText,"i");
  var results = [];

 DairyModel.find(function(err,dairies){
    for(var i = 0;i<dairies.length;i++){
      var dairy = dairies[i];
      if(pattern.test(dairy.text)){
        results.push(dairy);
      }
    }
   return res.send(results);
  });

});


router.route('/api/date').post(function(req,res){
  var sDate = req.body.sDate;
  var eDate = req.body.eDate;
  var results = [];

  var a = moment(sDate);
  var b = moment(eDate);
  

    DairyModel.find(function(err,dairies){

      for (var m = a; m.isBefore(b); m.add('days', 1)) {


          for(var i = 0;i<dairies.length;i++){

            var dairy = dairies[i];
           
            if( m.format('YYYY‐MM‐DD') == moment(dairy.date).format('YYYY‐MM‐DD') ){
             results.push(dairy);
            }

          }
    }
     return res.send(results);

    });

});


module.exports = router;
