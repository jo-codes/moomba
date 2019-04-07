router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.passowrd;

  if (!email || !password)
    return res.status(400).send("email & password are required");

  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return bcrypt.compare(password, user.passowrd);
    })
    .then(isMatch => {
      if (typeof isMatch !== "boolean") return; // result from `res.status(404)...`

      if (isMatch) return res.json({ message: "Success" });

      return res.status(400).json({ message: "Password incorrect" });
    })
    .catch(err => {
      res.status(500).json({ message: "Internal server error" });
    });
});
