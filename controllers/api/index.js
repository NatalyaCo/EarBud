const router = require('express').Router();
const userRoutes = require('./userRoutes');
const preferenceRoutes = require('./preferenceRoutes');
const friendsRoutes = require('./friendsRoutes');

router.use('/users', userRoutes);
router.use('/preferences', preferenceRoutes);
router.use('/friends', friendsRoutes);

module.exports = router;
