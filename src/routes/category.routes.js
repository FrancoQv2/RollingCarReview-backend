const express = require('express');
const { check } = require('express-validator');
const categoryCtrl = require('../controllers/category.controller');

const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
} = categoryCtrl;

const router = express.Router();
const checksCreateCategory = [
    check('name','El nombre es obligatorio!').notEmpty(),
    check('name','El nombre debe tener como mínimo 3 caracteres').isLength({min:3})
];

router.route('/')
    .post(checksCreateCategory,createCategory)
    .get(getCategories);

router.route('/:id')
    .get(getCategory)
    // .put(updateCategory)
    .put(deleteCategory);

module.exports = router;
