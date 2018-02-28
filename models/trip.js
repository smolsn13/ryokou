'use strict';
module.exports = (sequelize, DataTypes) => {
  var trip = sequelize.define('trip', {
    city: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  trip.associate = function(models) {
    models.trip.belongsTo(models.user);
    models.trip.hasMany(models.business);
  };
  return trip;
};
