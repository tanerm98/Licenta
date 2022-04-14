const Router = require('express').Router();

const {
    authorizeAndExtractTokenAsync
} = require('../Filters/JWTFilter.js');

const UsersController = require('./UsersController.js');

Router.use('/v1/users', authorizeAndExtractTokenAsync, UsersController);

module.exports = Router;