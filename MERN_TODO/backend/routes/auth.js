const router = require("express").Router(); // Router() is the function which express have.
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP

router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password);
    const user = new User({ email, username, password: hashpassword });
    await user.save().then(() => res.status(200).json({ user: user }));
  } catch (error) {
    res.status(400).json({ message: "User Already Exists" });
  }
});

// SIGN IN

router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ message: "Please Sign Up First" });
    }

    const ispasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!ispasswordCorrect) {
      res.status(400).json({ message: "Password is not correct" });
    }

    const { password, ...others } = user._doc; // In this others means give me information except password give me other information and doc means give me that from user document.
    res.status(200).json({ others });
  } catch (error) {
    res.status(400).json({ message: "User Already Exists" });
  }
});

module.exports = router;
