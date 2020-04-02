const { getUser, getAgent, getPost, getPosts } = require('../db/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('posts routes', () => {
  it('creates a post', async() => {
    const user = await getUser();

    return getAgent()
      .post('/api/v1/posts')
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

  it('gets all posts', async() => {
    const posts = await getPosts();

    return request(app)
      .get('/api/v1/posts')
      .then(res => {
        posts.forEach(post => {
          expect(res.body).toContainEqual({
            _id: post._id,
            user: post.user,
            photoUrl: post.photoUrl,
            caption: post.caption,
            tags: expect.any(Array),
            __v: 0
          });
        });
      });
  });

  it('gets a post by id', async() => {
    const post = await getPost();

    return request(app)
      .get(`/api/v1/posts/${post._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: post._id,
          user: {
            _id: expect.any(String),
            profilePhotoUrl: expect.any(String),
            username: expect.any(String),
            __v: 0
          },
          photoUrl: post.photoUrl,
          caption: post.caption,
          tags: expect.any(Array),
          __v: 0
        });
      });
  });

  it('updates a post by id', async() => {
    const user = await getUser({ username: 'jennag' });
    const post = await getPost({ user: user._id });

    return getAgent()
      .patch(`/api/v1/posts/${post._id}`)
      .send({ caption: 'this is a new caption' })
      .then(res => {
        expect(res.body).toEqual({
          ...post,
          caption: 'this is a new caption'
        });
      });
  });
});
