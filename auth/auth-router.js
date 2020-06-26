const router = require('express').Router();
const Users = require('../users/users-model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const {isValid} = require('../users/users-service.js');

router.post('/register', (req, res) => {
    let credentials = req.body;

    if (isValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 10;

        const hash = bcrypt.hashSync(credentials.password, rounds);
        credentials.password = hash;

        Users.add(credentials)
            .then(user => {
                res.status(201).json({data: user});
            })
            .catch(error => {
                res.status(500).json({message: error.message});
            });
    } else {
        res.status(400).json({
            message: "You must provide a username and password to sign up"
        });
    }
});

router.post('/login', (req, res) => {
    const {username, password} = req.body;

    if (isValid(req.body)) {
        Users.findBy({username: username})
            .then(([user]) => {
            const {id} = user.id

                if (user && bcrypt.compareSync(password, user.password)) {
                    // console.log(user);
                    const{id} = user.id;
                    const token = generateToken(user);
                    // console.log(user);
                    res.status(200).json({message: `Welcome ${username}!`, token, id: user.id });
                } else {
                    res.status(401).json({message: "Invalid credentials"});
                }
            })
            .catch(error => {
                res.status(500).json({message: "Something went wrong"});
            })
    } else {
        res.status(400).json({message: "you must provide a valid username and password to login"})
    }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };

    const options = {
        expiresIn: "1d"
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
};

module.exports = router;
