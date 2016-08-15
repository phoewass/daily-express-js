const passport=require('passport');
const bcrypt = require('bcrypt');

/**
 *  Define User Model
 *  @param {Object} schema
 *  @return {Object}
 **/
module.exports = function (schema) {
    var User = schema.define('user', {
        active: {
            type: schema.Boolean
        },
        name: {
            type: schema.String
        },
        email: {
            type: schema.String
        },
        password: {
            type: schema.String
        },
        note: {
            type: schema.Text
        },
        created: {
            type: schema.Date
        }
    }, {


    });
    User.prototype.verifyPassword = function (password,cb) {
        bcrypt.compare(password, this.password, function(err, res) {
            cb(res);
        });
    };

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

    return User;
};
