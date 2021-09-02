const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

/** 
 * @route    GET api/profile
 * @desc     Get all profiles
 * @access   Public
*/
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);

        if (!profiles) {
            return res.status(400).json({ msg: 'No profile' });
        }

        res.json(profiles);
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/** 
 * @route    GET api/profile/user/:user_id
 * @desc     Get profile by user id
 * @access   Private
*/
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.json(profile);
    } catch(error) {
        console.error(error.message);

        if (error.kind == "ObjectId") {
            return res.status(400).json({ msg: 'Profile not found' });
        }

        res.status(500).send('Server Error');
    }
});

/** 
 * @route    GET api/profile
 * @desc     Create or Update user profile
 * @access   Private
*/
router.post('/', [auth, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
    ]], 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Build profile object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skill => skill.trim());
        }

        // Build social object
        profileFields.socialmedia = {};
        if (youtube) profileFields.socialmedia.youtube = youtube;
        if (facebook) profileFields.socialmedia.facebook = facebook;
        if (twitter) profileFields.socialmedia.twitter = twitter;
        if (instagram) profileFields.socialmedia.instagram = instagram;
        if (linkedin) profileFields.socialmedia.linkedin = linkedin;

        //console.log(profileFields.skills);
        //res.send('Hello');

        try {

            let profile = await Profile.findOne({ user: req.user.id });

            // If the user has profile, then UPDATE profile
            if (profile) {
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Otherwise CREATE a new profile
            profile = new Profile(profileFields);

            // save the changes
            await profile.save();
            res.json(profile);

        } catch(error) {
            console.error(error.message);
            res.status(500).send('Server Error'); 
        }

    }
)

/**
 * @route    DELETE api/profile
 * @desc     Delete profile, user & posts
 * @access   Private
*/
router.delete('/', auth, async (req, res) => {
    try {
        
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // Remove user
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'User deleted!' });
    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

/**
 * @route    PUT api/profile/experience
 * @desc     Add profile experience
 * @access   Private
*/
router.put('/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty(),

]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);

    } catch(error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
});

/**
 * @route    DELETE api/profile/experience/:exp_id
 * @desc     Delete profile experience
 * @access   Private
*/
router.delete('/experience/:exp_id', auth, async(req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        // Get the index of experience to be removed by it's id
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
 
        // splice: remove one element from the removeIndex
        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router;