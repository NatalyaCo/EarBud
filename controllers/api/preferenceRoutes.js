const router = require('express').Router();
const { Preference } = require('../../models');
const withAuth = require("../../utils/auth");

// Find all preferences
router.get("/", async (req, res) => {
  try {
    const preferenceData = await Preference.findAll();
    res.status(200).json(preferenceData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create new preference
router.post('/', withAuth, async (req, res) => {
  try {
    const preferenceData = await Preference.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(preferenceData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
