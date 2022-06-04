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

// router.get('/matchEngine', withAuth, async (req, res) => {
//   try {
//     // Displays match section where app suggests friends that have similar music interest, displays their profile info and gives
//     // user option to try to match with suggestion or ignore. (need functionality to not suggest user who are already friends or rejects)
//     const userData = await User.findAll({
//       include: [
//         {
//           // Include relevent models that maybe store spotify data, friends, etc
//         },
//       ],
//     });
//     // Serialize post data
//     const users = postData.map((user) => user.get({ plain: true }));
//     // Pass serialized data and session into matchEngine template
//     res.render('matchEngine', {
//       users,
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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

router.get('/profile', withAuth, async (req, res) => {
  // try {
  const userData = await User.findByPk(req.session.user_id, {});
  const user = userData.get({ plain: true });
  res.render('register', {
    ...user,
    logged_in: req.session.logged_in,
  });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

router.get('/contact', async (req, res) => {
  res.render('contact');
});

module.exports = router;
