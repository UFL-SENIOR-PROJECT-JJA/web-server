exports.render = function(req, res) {

	//res.render('index', {
		//title: 'Home',
		//user: req.user ? req.user.username : ''
	//});

	if (!req.user) {
		res.redirect('/login');
	}

	else {
		res.render('index', {
			title: 'Home',
			user: req.user ? req.user.username : 'error',
			lobby: req.lobbyName ? req.lobbyName : null
		});
	}
};

exports.renderLobby = function(req, res) {
	if (!req.user) {
		//tell the login that you wanna login but you want to login to a particular lobby
		res.redirect('/login/'+req.lobby);
	}

	else {
		res.render('index', {
			title: 'Home',
			user: req.user ? req.user.username : 'error',
			lobby: req.params.lobbyName ? req.params.lobbyName : null
		});
	}
};
