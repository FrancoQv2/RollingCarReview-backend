const express = require('express');
const { check } = require('express-validator');
const commentCtrl = require('../controllers/comment.controller');

const {
    deleteComment
} = commentCtrl;

const router = express.Router();

router.route('/:id')
    .put(deleteComment)

module.exports = router;
