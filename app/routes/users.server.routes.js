var users = require('../../app/controllers/users.server.controller');
var passport = require('passport');

module.exports = function(app) {
	app.route('/register')
		.get(users.renderRegister)
		.post(users.register);

	app.route('/login')
		.get(users.renderLogin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		}));
	app.route('/login/:lobbyName')
		.get(users.renderLogin)
		.post(function(req, res, next) {
				console.log("Authenicating" + req.params.lobbyName);
				var auth =  passport.authenticate('local', {
						successRedirect: '/lobby/' + req.params.lobbyName,
						failureRedirect: '/login/' + req.params.lobbyName,
						failureFlash: true
					}
				);
				return auth(req, res, next);
			});
	app.get('/logout', users.logout);

};
