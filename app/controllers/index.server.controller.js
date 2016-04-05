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
			user: req.user ? req.user.username : 'error'
		});
	}
};


