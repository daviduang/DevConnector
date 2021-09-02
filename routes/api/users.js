const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
// import the validation check
const { check, validationResult } = require('express-validator');
// import JSON Web Token
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

/**
 * @route    POST api/users
 * @desc     Register user
 * @access   Public
*/
router.post('/', [

    // Validation check 

    // name: none empty
    check('name', 'Name is required').not().isEmpty(),

    // email: valid email
    check('email', 'Please include a valid email').isEmail(),

    // password: length>=6
    check('password', 'Please enter password with 6 or more characters').isLength({ min:6 })
    
    ], async (req, res) => {

    // Catch and put error message into response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {

        // User existance check
        let user = await User.findOne({ email });

        // If the input user already exist in DB, then return error msg
        if (user) {
            return res.status(400).json({errors: [{ msg: 'User already exists' }]});
        }

        // Get user's gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });

        // Hash user's password: bcrypt
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Create the new user
        await user.save();

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