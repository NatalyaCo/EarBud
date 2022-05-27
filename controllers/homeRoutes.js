const router = require('express').Router();
const { Preference, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Use Spotify API to have a "log in with my spotify credentials" button that logs in if user is already in database 
    // or creates user in database using Spotify credentials with some more fields to fill out to complete profile
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/register', async (req, res) => {
  try {
    // Display register page with username pre-populated to match Spotify user name, description about yourself, photo, & email
    
    // Create conditional statement that if user exists in our database, take them to the dashboard
    // Otherwise, render the register handlebars partial view
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
    });

    if (userData) {
      res.redirect("/dashboard");
      return;
    } else{
      res.render("register");
    }
    
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    // Display users profile information, some info from their Spotify profile (top songs, etc) and list of friends they've connected to
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/matchEngine', async (req, res) => {
  try {
    // Displays match section where app suggests friends that have similar music interest, displays their profile info and gives
    // user option to try to match with suggestion or ignore. (need functionality to not suggest user who are already friends or rejects)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    // Displays profile for user, but only if you are already matched/friends with
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
