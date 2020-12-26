const express = require('express');
const { check } = require('express-validator');
const reviewCtrl = require('../controllers/review.controller');
const commentCtrl = require('../controllers/comment.controller');

const {
    createReview,
    getReviews,
    getReview,
    updateReview,
    deleteReview
} = reviewCtrl;

const {
    createComment,
    deleteComment
} = commentCtrl;

const router = express.Router();
const checksCreateReview = [
    check('title','El titulo es obligatorio!').not().isEmpty(),
    check('url','Debe agregar la URL del video').notEmpty(),
    check('url','Debe agregar una URL válida').isURL(),
    check('category','La categoría es obligatoria!').notEmpty()
];
const checksCreateComment = [
    check('username','El nombre de usuario es obligatorio!').notEmpty(),
    check('username','El nombre de usuario debe tener como mínimo 3 caracteres').isLength({min:3}),
    check('content','El mensaje es obligatorio!').notEmpty(),
    check('content','El mensaje tiene un maximo de 400 caracteres').isLength({max:400})
];

router.route('/')
    .post(checksCreateReview,createReview)
    .get(getReviews);

router.route('/:id')
    .post(checksCreateComment,createComment)
    .get(getReview)
    .put(updateReview)
    .delete(deleteReview);

router.route('/comments/:id')
    .delete(deleteComment)

module.exports = router;
