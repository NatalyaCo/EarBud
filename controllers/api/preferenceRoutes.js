const router = require('express').Router();
const { Preference } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const preferenceData = await Preference.create(req.body);

    req.session.save(() => {
      req.session.preference_id = preferenceData.id;
      req.session.logged_in = true;

      res.status(200).json(preferenceData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
