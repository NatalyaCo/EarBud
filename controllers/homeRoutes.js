const router = require('express').Router();
const { Preferences, User, Friends } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  // Render login display
  res.render('login');
});

router.get('/register', async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
    });
    // Serialize user data
    const user = userData.get({ plain: true });
    // Pass serialized data and session into register template
    res.render('register', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Display users profile information, some info from their Spotify profile (top songs, etc) and list of friends they've connected to
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Preferences }],
    });
    // Serialize user data
    const user = userData.get({ plain: true });
    console.log(user);

    // Pass serialized data and session into dashboard template
    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/contact', async (req, res) => {
  res.render('contact', {
    logged_in: req.session.logged_in,
  });
});

router.get('/about', async (req, res) => {
  res.render('about', {
    logged_in: req.session.logged_in,
  });
});

router.get('/login', async (req, res) => {
  res.redirect('/');
});

module.exports = router;
