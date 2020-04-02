const { getUser, getAgent, getPost, getPosts } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('posts routes', () => {
  it('creates a commentt', async() => {
    const user = await getUser();

    return getAgent()
      .post('/api/v1/comments')
      .send({
        user: user._id,
        photoUrl: 'http://placekitten.com/200/200',
        caption: 'A cute kitten.',
        tags: ['cats', 'kitten', 'icanhazcheeseburger']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          user: user._id,
          photoUrl: 'http://placekitten.com/200/200',
          caption: 'A cute kitten.',
          tags: ['cats', 'kitten', 'icanhazcheeseburger'],
          __v: 0
        });
      });
  });

  // it('deletes a comment by id', async() => {
  //   const user = await getUser({ username: 'jennag' });
  //   const post = await getPost({ user: user._id });

  //   return getAgent()
  //     .delete(`/api/v1/comments/${post._id}`)
  //     .then(res => {
  //       expect(res.body).toEqual(post);
  //     });
  // });
});
