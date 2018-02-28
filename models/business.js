'use strict';
module.exports = (sequelize, DataTypes) => {
  var business = sequelize.define('business', {
    name: DataTypes.STRING,
    categories: DataTypes.TEXT[],
    url: DataTypes.TEXT
  }, {});
  business.associate = function(models) {
    models.business.belongsTo(models.trip);
  };
  return business;
};
