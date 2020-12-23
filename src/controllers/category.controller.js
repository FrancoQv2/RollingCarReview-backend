const Category = require('../models/category');
const { validationResult } = require('express-validator');

const categoryCtrl = {};

categoryCtrl.createCategory = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {name} = req.body;
    try{
        let newCategory = await Category.findOne({name});
        if(newCategory){ 
            return res.status(400).json({msg:'Esta categoría ya existe'});
        }
        newCategory = new Category(req.body);
        console.log(newCategory);

        await newCategory.save();
        res.status(201).json({
            msg:'Categoría creada correctamente'
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg:'Hubo un error al crear la categoría'
        });
    }
}

categoryCtrl.getCategories = async (req,res) => {
    await Category.find({},function(err,categories){
        if(!err){
            if(categories.length != 0) {
                const arrayCategories = [];
                categories.forEach(eachCategory => {
                    let category = {
                        id:            eachCategory.id,
                        name:          eachCategory.name,
                        isDeleted:     eachCategory.isDeleted
                    }
                    if (!category.isDeleted) {
                        arrayCategories.push(category);
                    }
                });
                res.status(200).send(arrayCategories);
            }
            else {
                res.status(400).json({
                    msg:"No existen categorías"
                });
            }
        }
        else{
            console.log(err);
        }
    });
}

categoryCtrl.getCategory = (req,res) => {
    const id = req.params.id;
    Category.findById(id)
        .populate({path:'reviews',select:'title'})
        .then(data => {
            if(!data || data.isDeleted != false){
                res.status(404).send({msg:"No se encontró la categoría con el ID " + id});
            }
            else{
                let category = {
                    id:             data.id,
                    name:           data.name,
                    reviews:        data.reviews,
                    isDeleted:      data.isDeleted
                }
                res.status(200).send(category);
            }
        })
        .catch(err =>{
            res.status(500).send({
                msg: "Error " + err
            });
        });
}

categoryCtrl.updateCategory = (req,res) =>{
    console.log(req.body);
    if(req.body == {}){
        return res.status(400).send({
            msg: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Category.findByIdAndUpdate(id,req.body,{ useFindAndModify: false })
        .then(data => {
            if(!data){
                res.status(404).send({
                    msg: "Cannot update category with id: " + id + " maybe not found"
                });
            }else{
                res.status(200).send({
                    msg: "Categoría actualizada exitosamente"
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                msg: "error" + err
            });
        })
}

categoryCtrl.deleteCategory = (req,res) => {
    const id = req.params.id;
    req.body = {isDeleted: true};
    Category.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    msg: "Cannot update user with id: " + id + " maybe not found"
                });
            } else {
                res.status(200).send({
                    msg: "Categoría borrada exitosamente"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                msg: "error" + err
            });
        })
}

module.exports = categoryCtrl;
