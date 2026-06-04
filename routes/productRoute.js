const {Router} = require('express');
const { createProduct } = require('../controllers/productController');
const { authMiddleware, roleCheck } = require('../middleware/authMiddleware');
const route = Router();

route.post("/create", authMiddleware, roleCheck(["admin","moderator"]), createProduct); 

module.exports = route;

