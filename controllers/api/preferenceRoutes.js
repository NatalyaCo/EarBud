const router = require('express').Router();
const { Preferences, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Find all preferences
router.get('/', async (req, res) => {
  try {
    const preferenceData = await Preferences.findAll();
    res.status(200).json(preferenceData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Find preference by user_id
// router.get("/:user_id", async (req, res) => {
//   try {
//     const preferenceData = await Preferences.findByPk(req.session.user_id, {
//       attributes: { exclude: ["password"] },
//       include: [{ model: User }],
//     });
//     res.status(200).json(preferenceData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// Create new preference
router.post('/', withAuth, async (req, res) => {
  try {
    const preferenceData = await Preferences.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(preferenceData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
