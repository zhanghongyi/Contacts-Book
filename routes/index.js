var mongoose = require('mongoose');
var db = mongoose.createConnection('localhost', 'contactManager');
var PollSchema = require('../model/poll.js').PollSchema;
var Poll = db.model('Poll', PollSchema);

exports.list = function(req, res) {
	Poll.find(function(error, data) {
		res.render('index', { 
			title: 'Contact Manager',
			data: data
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
		firstname: req.body.first,
		lastname: req.body.last,
		email: req.body.email,
		phone: req.body.phone,
		notes: req.body.notes
	});
  newcontact.save(function(err, data) {
		if(err) {
			res.redirect('/hongyi-contact/');
		} 
		else
			res.redirect('/hongyi-contact/');
	});
};

exports.item = function(req, res){
  var id=req.params.id;
  Poll.findById(id, function (err, data) {
  	res.render('item', {
  		data: data
  	})
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
		else
			res.redirect('/hongyi-contact/');
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

