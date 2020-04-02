const chance = require('chance').Chance();
const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');

module.exports = async({ usersToCreate = 5, postsToCreate = 25, commentsToCreate = 50 } = {}) => {
  const loggedInUser = await User.create({
    username: 'jennag',
    password: 'password',
    profilePhotoUrl: 'http://fakeimg.com/test.jpg'
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.email(),
    password: chance.animal(),
    profilePhotoUrl: `https://fakeimg.com/${chance.animal()}.jpg`
  })));

  const tags = ['tbt', 'smile', 'aww', 'feltcute', 'butfirstcoffee', 'dogstagram', 'blessed'];

  const posts = await Post.create([...Array(postsToCreate)].slice(1).map(() => ({
    user: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id,
    photoUrl: chance.url(),
    caption: chance.sentence(),
    tags: [chance.pickone(tags), chance.pickone(tags)]
  })));

  const comments = await Comment.create([...Array(commentsToCreate)].slice(1).map(() => ({
    user: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id,
    post: chance.pickone(posts)._id,
    comment: chance.sentence()
  })));
};
