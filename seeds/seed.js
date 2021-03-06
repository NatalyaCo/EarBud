const sequelize = require('../config/connection');
const { User, Preferences } = require('../models');

const userData = require('./userData.json');
const preferenceData = require('./preferenceData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const preferences = await Preferences.bulkCreate(preferenceData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
