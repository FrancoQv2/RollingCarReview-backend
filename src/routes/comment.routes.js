const express = require('express');
const { check } = require('express-validator');
const commentCtrl = require('../controllers/comment.controller');

const {
    createComment,
    // getComments
} = commentCtrl;

const router = express.Router();
const checksCreateComment = [
    check('username','El nombre de usuario es obligatorio!').notEmpty(),
    check('username','El nombre de usuario debe tener como mínimo 3 caracteres').isLength({min:3}),
    check('body','El mensaje es obligatorio!').notEmpty(),
    check('body','El mensaje tiene un maximo de 400 caracteres').isLength({max:400})
];

router.route('/')
    .post(checksCreateComment,createComment)
    // .get(getComments);

module.exports = router;
