const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const clientID = process.env.GOOGLE_CLIENT_ID;

require('dotenv').config();

const app = express();

// Configure Passport.js
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // Here, you will usually save the user to your database
    // For this example, we'll just return the user profile
    return cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// Configure cookie session middleware
app.use(session({
    secret: process.env.SESSION_SECRET, // Use environment variable
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" // Only use secure cookies in production
    }
}));

app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.get('/', (req, res) => res.send('Home Page'));
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), // Updated failureRedirect
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Logout route
app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy(); // Destroy session upon logout
  res.redirect('/');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));