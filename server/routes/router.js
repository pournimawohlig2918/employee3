const express = require('express');
const router = express.Router()

const {homeRoutes,add_user,update_user,create,find} = require('../services/render');

const controller = require('../controller/controller');

/**
 * @description Root Route
 * @method GET /
 */
router.get('/',controller.find);

/**
 * @description add users
 * @method GET / add-user
 */
router.post('/add-user', controller.create);
router.get('/add-user', add_user);


/**
 * @description for Update users
 * @method GET / update-user
 */
router.get('/update-user', controller.find);
router.put('/update-user', controller.update);


//API
router.post('/api/users',controller.create);
router.get('/api/users',controller.find);
router.post('/api/users/:id',controller.update);
router.delete('/api/users/:id',controller.delete);

module.exports = router