
const jwt = require('jsonwebtoken'); 

router.post('/login', (req, res) => {
let { username, password } = req.body;

Users.findBy({ username })
    .first()
    .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); 

        res.status(200).json({
        message: `Access Granted for ${user.username}!`,
        token, 
        });
    } else {
        res.status(401).json({ message: 'Uh, Oh! Something went wrong' });
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
    password: user.password,
    
};

const options = {
    expiresIn: '8h', //  Cookies go bad in 8 hours
};


return jwt.sign(payload, secrets.jwtSecret, options); 
}