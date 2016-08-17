var passport      = require('passport'),
    Promise       = require('bluebird'),
    bcrypt        = require('bcrypt'),


    bcryptGenSalt = Promise.promisify(bcrypt.genSalt),
    bcryptHash    = Promise.promisify(bcrypt.hash),
    bcryptCompare = Promise.promisify(bcrypt.compare);


function generatePasswordHash(password) {
    var saltRounds = 10;
    return bcryptGenSalt(saltRounds).then(function (salt) {
        return bcryptHash(password, salt);
    });
}

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
    User.prototype.verifyPassword = function (password, cb) {
        bcrypt.compare(password, this.password, function (err, res) {
            cb(res);
        });
    };
    User.beforeCreate = function (next) {
        var user = this;
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                    next(err);
                } else {
                    user.password = hash;
                    next();
                }
            });
        });
    };
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    return User;
};
