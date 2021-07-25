const express = require("express");
const passport = require("passport");

const User = require("../models/users");
const registerValidation = require("../validation/register");
const loginValidation = require("../validation/login");
const { generatePasswordHash } = require("../utils/password");

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  // Validate data before creating a user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user has an account
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("E-mail already exist. Try logging in.");

  // Hash password
  const hashedPassword = await generatePasswordHash(req.body.password);

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phoneNumber: req.body.phoneNumber,
  });

  // For testing purposes only
  // res.status(201).send(user);

  user
    .save()
    .then((data) => res.status(201).send(data))
    .catch((err) => res.status(400).send(err));
});

// Login
router.post("/login", (req, res) => {
  passport.authenticate("local", async (err, result, info) => {
    if (err) return res.status(400).send("Server error");

    // Validate data before logging in
    const { error: validationError } = loginValidation(req.body);
    if (validationError)
      return res.status(400).send(validationError.details[0].message);

    // Check if the user does not have an account
    if (!result.user) return res.status(404).send("Email not found");

    // Checking if password is correct
    if (!result.valid) return res.status(400).send("Wrong e-mail or password.");

    res.status(200).send({
      user: {
        id: result.user._id,
        name: result.user.name,
      },
      message: "Logged In",
    });
  })(req, res);
});


module.exports = router;
