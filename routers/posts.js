// Dichiarazione ROUTER
const express = require('express');
const router = express.Router();


// REQUIRE delle risorse
const postController = require('../controllers/postsController');


// MIDDLEWARE specifico solo per le ROUTES di posts.js
const postsCheckTime = require('../middlewares/posts_checkTime');
router.use(postsCheckTime);


// Dichiarazione delle ROUTES
router.get('/', postController.index);
router.get('/:id', postController.show);
router.post('/', postController.store);
router.put('/:id', postController.update);
router.patch('/:id', postController.modify);
router.delete('/:id', postController.destroy);


// EXPORT del ROUTER
module.exports = router;