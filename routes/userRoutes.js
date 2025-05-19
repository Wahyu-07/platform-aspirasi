const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllPengguna);
router.get('/:id', userController.getPenggunaById);
router.get('/nim/:nim', userController.getPenggunaByNim);
router.post('/', userController.createPengguna);
router.put('/:id', userController.updatePengguna);
router.delete('/:id', userController.deletePengguna);

module.exports = router;