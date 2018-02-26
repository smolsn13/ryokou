'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1,99],
          msg: 'Invalid user name. Must be between 1 and 99 chars.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: "Invalid email address"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,99],
          msg: "Password must be at least 8 characters."
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser, options) { //pendingUser is the data getting ready to be written to database
        if (pendingUser && pendingUser.password) {
          var hash = bcrypt.hashSync(pendingUser.password, 10);
          pendingUser.password = hash;  //hash gets reassigned in place of the plain text password
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  user.prototype.validPassword = function (passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password); // 'this' refers to the instance of the model, i.e. typed password is compared to data from the database
    //returns a boolean, true or false if passwords match
  };

  user.prototype.toJSON = function() {
    var userData = this.get(); //password key is included in this object
    delete userData.password; //remove the password from the object
    return userData; //return the user without the password
  };
  return user;
};
