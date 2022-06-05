const User = require('./User');
const Preferences = require('./Preferences');
const Friends = require('./Friends');

User.hasOne(Preferences, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Preferences.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Friends, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Friends.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Preferences, Friends };
