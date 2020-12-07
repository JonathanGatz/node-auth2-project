const bcryptjs = require("bcryptjs");

const router = require("express").Router();

const Users = require("../user/user-model.js");
const { isValid } = require("../user/user-service.js");

const jwt = require('jsonwebtoken'); 

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); 

  
        res.status(200).json({
          message: `Hello ${user.username}!, This is your token...`,
          token, 
        });
      } else {
        res.status(401).json({ message: 'Uh Oh, Try Again' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id, 
    username: user.username,
    department: user.department
  
  };

  const options = {
    expiresIn: '1d',
  };


  return jwt.sign(payload, secrets.jwtSecret, options); 
}