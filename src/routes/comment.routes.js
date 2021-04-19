const express = require('express');
const { check } = require('express-validator');
const commentCtrl = require('../controllers/comment.controller');

const {
    getComments,
    deleteComment
} = commentCtrl;

const router = express.Router();

router.route('/')
    .get(getComments);

router.route('/:id')
    .put(deleteComment)

module.exports = router;
