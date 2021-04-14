const Review = require('../models/review');
const Category = require('../models/category');
const { validationResult } = require('express-validator');

const reviewCtrl = {};

reviewCtrl.createReview = async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {title, url, thumbnail, category} = req.body;
    try{
        let newReview = await Review.findOne({title});
        if(newReview){ 
            return res.status(400).json({msg:'Esta review ya existe'});
        }
        newReview = new Review(req.body);
        console.log(newReview);

        getCategory = await Category.findById(category);
        getCategory.reviews.push(newReview);
        await getCategory.save();

        await newReview.save();
        res.status(201).json({
            msg:'Review creada correctamente'
        });
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg:'Hubo un error al crear la review'
        });
    }
}

reviewCtrl.getReviews = async (req,res) => {
    await Review.find({},function(err,reviews){
        if(!err){
            if(reviews.length != 0) {
                const arrayReviews = [];
                reviews.forEach(eachReview => {
                    let review = {
                        _id:            eachReview.id,
                        title:          eachReview.title,
                        url:            eachReview.url,
                        thumbnail:      eachReview.thumbnail,
                        comments:       eachReview.comments,
                        category:       eachReview.category,
                        isDeleted:      eachReview.isDeleted
                    }
                    if (!review.isDeleted) {
                        arrayReviews.push(review);
                    }
                });
                res.status(200).send(arrayReviews);
            }
            else {
                res.status(400).json({
                    msg:"No existen reviews"
                });
            }
        }
        else{
            console.log(err);
        }
    })
    .populate({path:'category',select:'name'})
    .populate({path:'comments',select:'username content isDeleted createdAt'});
}

reviewCtrl.getReview = async (req,res) => {
    const id = req.params.id;
    await Review.findById(id,{__v:0},function(err,review){
        if(!err){
            if(!review || review.isDeleted == true) {
                res.status(400).json({
                    msg:"No se encontró la review con el ID " + id
                });
            }
            else {
                res.status(200).send(review);
            }
        }
        else{
            res.status(500).send({msg: "Error " + err});
        }
    })
    .populate({path:'category',select:'name'})
    .populate({path:'comments',select:'username content isDeleted createdAt'});
}

reviewCtrl.updateReview = (req,res) =>{
    if(req.body == {}){
        return res.status(400).send({
            msg: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Review.findByIdAndUpdate(id,req.body,{ useFindAndModify: false })
        .then(data => {
            if(!data){
                res.status(404).send({
                    msg: "Cannot update review with id: " + id + " maybe not found"
                });
            }else{
                res.status(200).send({
                    msg: "Review actualizada exitosamente"
                });
            }
        })
        .catch(err =>{
            res.status(500).send({
                msg: "error" + err
            });
        })
}

reviewCtrl.deleteReview = (req,res) => {
    const id = req.params.id;
    req.body = {isDeleted: true};
    Review.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    msg: "Cannot update review with id: " + id + " maybe not found"
                });
            } else {
                data.comments.forEach(comment => {
                    comment.isDeleted = true;
                });
                res.status(200).send({
                    msg: "Review borrado exitosamente"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                msg: "error" + err
            });
        })
}

module.exports = reviewCtrl;
