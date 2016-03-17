exports.render = function(req, res) {
	res.render('index', {
		title: 'Home',
		user: req.user ? req.user.username : ''
	});
};