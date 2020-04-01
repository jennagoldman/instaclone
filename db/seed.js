const chance = require('chance').Chance();
const User = require('../lib/models/User');

module.exports = async({ usersToCreate = 5 } = {}) => {
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
};
