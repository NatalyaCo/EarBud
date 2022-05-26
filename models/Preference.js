const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Preference extends Model {}

Project.init(
  {
    fave_genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fave_artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fave_song: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
    modelName: 'preference',
  }
);

module.exports = Preference;