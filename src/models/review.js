const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    url:{
        type: String,
        required: true,
        trim: true
    },
    thumbnail:{
        type: String,
        trim: true
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
