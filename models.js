const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const blogPostsSchema = mongoose.Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    firstName: String,
    lastName: String
  },
  created: Date

});

// *virtuals* (http://mongoosejs.com/docs/guide.html#virtuals)
// allow us to define properties on our object that manipulate
// properties that are stored in the database. Here we use it
// to generate a human readable string based on the address object
// we're storing in Mongo.
blogPostsSchema.virtual('authorString').get(function() {
  return `${this.author.firstName} ${this.author.lastName}`.trim()});

/* this virtual grabs the most recent grade for a restaurant.
restaurantSchema.virtual('grade').get(function() {
  const gradeObj = this.grades.sort((a, b) => {return b.date - a.date})[0] || {};
  return gradeObj.grade;
});*/

// this is an *instance method* which will be available on all instances
// of the model. This method will be used to return an object that only
// exposes *some* of the fields we want from the underlying data
blogPostsSchema.methods.apiRepr = function() {

  return {
    id: this._id,
    ttle: this.title,
    author: this.authorString,
    content: this.content,
    created: this.created

  };
}

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
//why is this 'blog-posts'?
const BlogPosts = mongoose.model('blogposts', blogPostsSchema);

module.exports = {BlogPosts};