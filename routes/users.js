const express = require("express");
const {signup, signin, logout, current} = require("../controllers/usersControllers");
const { userSignupSchema, userSigninSchema } = require("../schemas/usersSchema");
const validationBody = require("../decoration/validationBody");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post('/signup', validationBody(userSignupSchema), signup);

router.post('/login', validationBody(userSigninSchema), signin);

router.post('/logout', authenticate, logout);

router.get('/current', authenticate, current)

module.exports = router;

// POST ​/users​/signup
// Create a new user

// POST ​/users​/login 
// Login user

// POST ​/users​/logout
// Log out user

// GET ​/users​/current
// Get information about the current user