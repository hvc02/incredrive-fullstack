const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/users");
const { isValidPassword } = require("../utils/password");

const customFields = {
  usernameField: "email",
};

passport.use(
  new LocalStrategy(customFields, (email, password, callback) => {
    User.findOne({ email: email })
      .then(async (user) => {
        if (!user) return callback(null, { user: false, valid: false });

        const isValid = await isValidPassword(password, user.password);
        if (isValid) return callback(null, { user, valid: true });
        else return callback(null, { user, valid: false });
      })
      .catch((error) => callback(error));
  })
);

passport.serializeUser((user, callback) => {
  callback(null, user.id);
});

passport.deserializeUser((userId, callback) => {
  User.findById(userId)
    .then((user) => callback(null, user))
    .catch((error) => callback(error));
});
