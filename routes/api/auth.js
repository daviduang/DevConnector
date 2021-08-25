const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');

// import the validation check
const { check, validationResult } = require('express-validator');

// import JSON Web Token
const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * @route    GET api/auth
 * @desc     Test route
 * @access   Public
*/
router.get('/', auth, async (req, res) => {
    try { 
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route    POST api/auth
 * @desc     Authenticate user & get token
 * @access   Public
*/
router.post('/', [

    // Validation check 

    // email: valid email
    check('email', 'Please include a valid email').isEmail(),

    // password: valid password
    check('password', 'Please enter password').exists()
], 
    async (req, res) => {

    // Catch and put error message into response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password } = req.body;

    try {

        // User existance check
        let user = await User.findOne({ email });

        // If the user logged in is not registrated, then return error msg
        if (!user) {
            return res.status(400).json({errors: [{ msg: 'Invalid Credentials' }]});
        }

        // Verify the password entered
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({errors: [{ msg: 'Invalid Credentials' }]});
        }

        // Return jsonWebToken to response
        const payload = {
            user: {
                id: user.id
            }
        };
        jwt.sign(
            payload,
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token })
            }
        );

    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error'); 
    }
});

module.exports = router; 