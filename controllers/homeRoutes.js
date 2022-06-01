const router = require('express').Router();
const { Preferences, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Use Spotify API to have a "log in with my spotify credentials" button that logs in if user is already in database
    // or creates user in database using Spotify credentials with some more fields to fill out to complete profile
    res.render('login', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/register', async (req, res) => {
  try {
    // Create conditional statement that if user exists in our database, take them to the dashboard
    // Otherwise, render the register handlebars partial view
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });

    if (userData) {
      // If user is in database, take them to their dashboard
      res.redirect('/dashboard');
      return;
    } else {
      // Display register page with username pre-populated to match Spotify user name, description section, photo, & email
      res.render('register');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Display users profile information, some info from their Spotify profile (top songs, etc) and list of friends they've connected to
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    // Serialize user data
    const user = userData.get({ plain: true });
    // Pass serialized data and session into dashboard template
    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/matchEngine', withAuth, async (req, res) => {
  try {
    // Displays match section where app suggests friends that have similar music interest, displays their profile info and gives
    // user option to try to match with suggestion or ignore. (need functionality to not suggest user who are already friends or rejects)
    const userData = await User.findAll({
      include: [
        {
          // Include relevent models that maybe store spotify data, friends, etc
        },
      ],
    });
    // Serialize post data
    const users = postData.map((user) => user.get({ plain: true }));
    // Pass serialized data and session into matchEngine template
    res.render('matchEngine', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/user/:id', withAuth, async (req, res) => {
  try {
    // Displays profile for user, but only if you are already matched/friends with
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          // Include relevent models that maybe store spotify data, friends, etc
        },
      ],
    });
    // Serialize user data
    const user = userData.get({ plain: true });
    // Pass serialized data and session into user template
    res.render('user', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
