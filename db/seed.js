const chance = require('chance').Chance();
const User = require('../lib/models/User');

module.exports = async({ usersToCreate = 5, notesToCreate = 100 } = {}) => {
  const loggedInUser = await User.create({
    email: 'test@test.com',
    password: 'password'
  });

  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    email: chance.email(),
    password: chance.animal()
  })));
};
