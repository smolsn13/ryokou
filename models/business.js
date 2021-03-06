'use strict';
module.exports = (sequelize, DataTypes) => {
  var business = sequelize.define('business', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    url: DataTypes.TEXT,
    tripId: DataTypes.INTEGER
  }, {});
  business.associate = function(models) {
    models.business.belongsTo(models.trip);
  };
  return business;
};
