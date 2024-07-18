const Router = require('express');
const router = new Router();
const authController = require('./authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/notes', authMiddleware, authController.notes);
router.post('/createGroup', authMiddleware, authController.createGroup);
router.post('/getInvitation', authMiddleware, authController.getInvitation)
router.get('/getUserGroups', authMiddleware, authController.getUserGroups);
// router.post('/addUserToGroup', authMiddleware, authController.addUserToGroup)

module.exports = router;