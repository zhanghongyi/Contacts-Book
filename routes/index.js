var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'contactManager');
var PollSchema = require('../model/poll.js').PollSchema;
var Poll = db.model('Poll', PollSchema);

exports.list = function(req, res) {
	Poll.find(function(error, data) {
		res.format({  
  		'text/html': function(){
    		res.render('index', { 
					title: 'Contact Manager',
					data: data
				});
  		},
 			'application/json': function(){
 				var jsondata = new Object();
 				jsondata = data;
 				for(var i in jsondata){
 					jsondata[i]._id = undefined;
 					jsondata[i].__v = undefined;
 				}
    		res.send(jsondata);
  		}
		});		
	});
};

exports.showadd = function(req, res){
  res.render('new', { 
  	title: 'Contact Manager', 
  	pagetitle: 'Add new contact'
 	});
};

exports.add = function(req, res) {
	var newcontact = new Poll({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		email: req.body.email,
		phone: req.body.phone,
		notes: req.body.notes
	});
  newcontact.save(function(err, data) {
		if(err)
			res.redirect('/hongyi-contact/');
		else{
			if(req.is('application/json'))
				res.send('added');
			else
				res.redirect('/hongyi-contact/');
			}
	});
};

exports.item = function(req, res){
  var id=req.params.id;
  Poll.findById(id, function (err, data) {
  	res.format({  
  		'text/html': function(){
    		res.render('item', {
  				data: data
  			});
  		},
 			'application/json': function(){
 				var jsondata = new Object();
 				jsondata.firstname = data.firstname;
 				jsondata.lastname = data.lastname;
 				jsondata.email = data.email;
 				jsondata.phone = data.phone;
 				jsondata.notes = data.notes;
    		res.send(JSON.stringify(jsondata, null, 2));
  		}
		});
	});
};

exports.edit = function(req, res){
  var id=req.params.id;
  Poll.findById(id, function (err, data) {
  	res.render('edit', {
  		title: 'Contact Manager', 
  		pagetitle: 'edit',
  		data: data
  	})
  });
};

exports.update = function(req, res) {
	var id=req.params.id;
	var update = req.body;
  Poll.findByIdAndUpdate(id, update, function (err, data) {
		if(err) {
			res.redirect('/hongyi-contact/');
		} 
		else{
			if(req.is('application/json'))
				res.send('updated');
			else
				res.redirect('/hongyi-contact/');
		}
  });
};

exports.delete = function(req, res) {
	var id=req.params.id;
  	Poll.findByIdAndRemove(id, function (err, data) {
		if(err) {
			res.redirect('/hongyi-contact/');
		} 
		else
			res.redirect('/hongyi-contact/');
  });
};

exports.deleteit = function(req, res) {
	var id=req.params.id;
  	Poll.findByIdAndRemove(id, function (err, data) {
		if(err) {
			res.send("Not found");
		} 
		else
			res.send("Successfully deleted");
  });
};

exports.findbyID = function (req, res) {
	Poll.find(function(error, data) {
		res.send(data);
	});
}

