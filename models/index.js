const User = require('./User');
const Preference = require('./Preference');

User.hasMany(Preference, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Preference.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Preference };
