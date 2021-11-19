const {findOneUserByEmail, createUser, findOneUserById} = require("../services/auth.service");
const {generatePasswordHash, isValidPassword} = require("../utils");
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await findOneUserById(id);
            done(null, user[0]);
        } catch (err) {
            console.log(err);
            done(err, null);
        }
    })

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const user = await findOneUserByEmail(email);
            if (user[0]) return done(null, false, {message: 'This email is already used.'});
            try {
                const newUser = await createUser({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: email,
                    password: generatePasswordHash(password)
                });
                return done(null, {id: newUser.insertId});
            } catch (err) {
                console.log(err);
                return done(null, false, {message: 'An error occurred during your inscription.'});
            }
        } catch (err) {
            console.log(err);
            return done(null, false, {message: 'An error occurred during your inscription.'});
        }
    }));

    passport.use('local-signin', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, async (req, email, password, done) => {
        try {
            const user = await findOneUserByEmail(email);
            if (!user[0]) return done(null, false, {message: 'This email does not exist.'});
            if (!isValidPassword(user[0].password, password)) return done(null, false, {message: 'Wrong password.'});
            return done(null, user[0]);
        } catch (err) {
            console.log(err);
            return done(null, false, {message: 'An error occurred during your connection.'});
        }
    }));

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/api-docs/auth/google/callback",
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await findOneUserByEmail(profile._json.email);
            if (user[0]) return done(null, user[0]);
            try {
                const newUser = await createUser({
                    firstName: profile._json.given_name,
                    lastName: profile._json.family_name,
                    email: profile._json.email,
                    password: generatePasswordHash(profile._json.sub)
                });
                return done(null, {id: newUser.insertId});
            } catch (err) {
                console.log(err);
                return done(null, false, {message: 'An error occurred during your connection.'});
            }
        } catch (err) {
            console.log(err);
            return done(null, false, {message: 'An error occurred during your connection.'});
        }
    }));

    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/api-docs/auth/facebook/callback",
        profileFields: ['emails', 'name']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await findOneUserByEmail(profile._json.email);
            if (user[0]) return done(null, user[0]);
            try {
                const newUser = await createUser({
                    firstName: profile._json.first_name,
                    lastName: profile._json.last_name,
                    email: profile._json.email,
                    password: generatePasswordHash(profile._json.id)
                });
                return done(null, {id: newUser.insertId});
            } catch (err) {
                console.log(err);
                return done(null, false, {message: 'An error occurred during your connection.'});
            }
        } catch (err) {
            console.log(err);
            return done(null, false, {message: 'An error occurred during your connection.'});
        }
    }));
}