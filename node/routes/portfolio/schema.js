const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    imageUrl : {type: String, required: true},
    description : {type: String, required: true, max : 120},
    // blogId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Blog'
    // }
})

const contentSchema = new mongoose.Schema({
    heading : {type: String},
    img : {type: String},
    paragraph : {type: String}
})

const blogSchema =  new mongoose.Schema({
    title : {type: String},
    subTitle : {type: String},
    backgroundImage : {type : String},
    content: [contentSchema]
})

const contactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type:String, required: true},
    description: {type:String, required: true}
})

const Project = new mongoose.model('Project', projectSchema)
const Blog = new mongoose.model('Blog' , blogSchema)
const Content = new mongoose.model('Content', contentSchema)
const Contact = new mongoose.model('Contact', contactSchema)

module.exports.Project = Project
module.exports.Blog = Blog
module.exports.Content = Content
module.exports.Contact = Contact
