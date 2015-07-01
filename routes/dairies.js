var DairyModel = require('../models/dairy');
var express = require('express');
var router = express.Router();

router.route('/api/dairies').get(function (req, res){
		  return DairyModel.find(function (err, dairies) {
		    if (!err) {
		    	//console.log(dairies);
		      return res.send(dairies);

		    } else {
		      return console.log(err);
		    }
		  });
		});

router.route('/api/dairies').post(function (req, res){
	  var dairy;
	  dairy = new DairyModel({
	    date: req.body.date,
	    label: req.body.label,
	    text: req.body.text	    
	  });

	  dairy.save(function (err) {
	    if (!err) {
	      return console.log("created");
	    } else {
	      return console.log(err);
	    }
	  });
	  return res.send(dairy);
});

router.route('/api/dairies/:id').delete(function( request, response ) {
	console.log( 'Deleting dairy with id: ' + request.params.id );
	return DairyModel.findById( request.params.id, function( err, dairy ) {
	return dairy.remove( function( err ) {
	  if( !err ) {
	console.log( 'Dairy removed' );
	return response.send( '' );
	} else {
	console.log( err );
	}
	});
	});
});

router.route('/api/dairies/:id').put(function( request, response ) {
	console.log( 'Updating dairy ' + request.body.name );
	return DairyModel.findById( request.params.id, function( err, dairy ) {
	dairy.date = request.body.date;
	dairy.label = request.body.label;
	dairy.text = request.body.text;

	return dairy.save( function( err ) {
	  if( !err ) {
	  console.log( 'dairy updated' );
	  } else {
	  console.log( err );
	  }
	  return response.send(dairy);
	});
	});
});


module.exports = router;