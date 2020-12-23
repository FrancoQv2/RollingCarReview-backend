const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    reviews:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
