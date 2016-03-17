var User = require('mongoose').model('User');
var Win = require('mongoose').model('Win');
var passport = require('passport');

var getErrorMessage = function(err) {
	
	var message = '';
	if (err.code) {
		switch(err.code) {
			case 11000:
			case 11001:
				message = 'Email and username must be unique';
				break;
			default:
				message = 'There was an error'
		}
	}

	else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) {
				message = err.errors[errName].message;
			}
		}
	}

	return message;
};

exports.renderLogin = function(req, res, next) {
	if (!req.user) {
		res.render('login', {
			title: 'Login',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.renderRegister = function(req, res, next) {
	if (!req.user) {
		res.render('register', {
			title: 'Register',
			messages: req.flash('error')
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.register = function(req, res, next) {
	if (!req.user) {
		var user = new User(req.body);
		var message = null;
		user.save(function(err) {

			if(err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/register');
			}


			var win = new Win();
			win.username = user.username;
			win.save(function(err) {

				if (err) {
					//do something
				}

			});


			req.login(user, function(err) {
				if (err) {
					return next(err);
				}

				return res.redirect('/');
			});
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};
