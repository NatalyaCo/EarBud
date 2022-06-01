const router = require('express').Router();
const { Friends, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Find all friends
router.get('/', async (req, res) => {
  try {
    const friendData = await Friends.findAll();
    res.status(200).json(friendData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Find friends by user_id
router.get('/:user_id', async (req, res) => {
  try {
    const friendData = await Friends.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: User }],
    });
    res.status(200).json(friendData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create new friend match
router.post('/', withAuth, async (req, res) => {
  try {
    const friendData = await Friends.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(friendData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
