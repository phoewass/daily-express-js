var _             = require('lodash'),
    passport      = require('passport'),
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
        username: {
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

    User.add = function (user,cb){
        user.active = false;
        user.plainTextPassword = _.toString(user.plainTextPassword);
        return generatePasswordHash(user.plainTextPassword).then(function (hash) {
            user.password = hash;
            delete user.plainTextPassword;
        }).then(function then(userData) {
            return User.create(user,cb);
        });

    };

    User.prototype.verifyPassword = function (password, cb) {
        bcrypt.compare(password, this.password, function (err, res) {
            cb(res);
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
    schema.autoupdate();
    return User;
};
