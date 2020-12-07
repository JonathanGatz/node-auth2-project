const router = require("express").Router();

const User = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, (req, res) => {
  User.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => res.send(err));
});

module.exports = router;
