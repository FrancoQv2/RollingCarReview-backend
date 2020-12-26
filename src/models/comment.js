const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        required: true,
        trim: true
    },
    onReview:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
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

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
