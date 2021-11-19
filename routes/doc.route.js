const {Router} = require('express');
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("../openapi.json");
const passport = require('passport');
const {authVerification, signUp, signIn, logout} = require("../controllers/doc.controller");

const router = Router();

router.use('/', swaggerUI.serve);
router.get('/', authVerification, swaggerUI.setup(swaggerDocument));

router.get('/auth/sign-up', signUp);
router.post('/auth/sign-up', passport.authenticate('local-signup', {
    successRedirect: '/api-docs',
    failureRedirect: 'sign-up',
    failureFlash: true
}));

router.get('/auth/sign-in', signIn);
router.post('/auth/sign-in', passport.authenticate('local-signin', {
    successRedirect: '/api-docs',
    failureRedirect: 'sign-in',
    failureFlash: true
}));

router.get('/logout', logout);

router.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}));
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/api-docs',
    failureRedirect: 'sign-in'
}));

router.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email', 'public_profile']}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/api-docs',
    failureRedirect: 'sign-in'
}));

module.exports = router;