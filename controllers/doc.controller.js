exports.authVerification = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/api-docs/auth/sign-in');
}

exports.signUp = (req, res) => {
    res.render('auth/sign-up', {title: 'Sign Up', errors: req.flash('error')});
}

exports.signIn = (req, res) => {
    res.render('auth/sign-in', {title: 'Sign In', errors: req.flash('error')});
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) console.log(err);
        res.redirect('/api-docs/auth/sign-in');
    });
}