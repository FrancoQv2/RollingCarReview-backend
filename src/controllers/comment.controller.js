const Comment = require('../models/comment');
const Review = require('../models/review');
const { validationResult } = require('express-validator');

const commentCtrl = {};

commentCtrl.createComment = async (req,res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    
    try{
        const {username,body} = req.body;
        req.body.onReview = req.params.id;

        comment = new Comment(req.body);
        await comment.save();

        const review = await Review.findById(req.body.onReview);
        review.comments.push(comment);
        await review.save();

        res.status(201).json({msg: "Comentario creado correctamente!"});
    }
    catch(error){
        res.status(400).json({msg: "Hubo un error"});
    }
}

commentCtrl.deleteComment = (req,res) => {
    const id = req.params.id;
    console.log(req.body);
    req.body = {isDeleted: true};
    console.log(req.body);
    Comment.findByIdAndUpdate(id,req.body,{useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    msg: "Cannot update Comment with id: " + id + " maybe not found"
                });
            } else {
                res.status(200).send({
                    msg: "Comentario borrado exitosamente"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                msg: "error" + err
            });
        })
}

module.exports = commentCtrl;
