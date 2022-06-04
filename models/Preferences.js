const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Preferences extends Model {}

Preferences.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    about_me: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fave_genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fave_experience_style: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fave_decade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    intentions: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '>:>SD',
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'preferences',
  }
);

module.exports = Preferences;
