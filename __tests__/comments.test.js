const { getUser, getAgent, getPost, getComment } = require('../db/data-helpers');

describe('posts routes', () => {
  it('creates a commentt', async() => {
    const user = await getUser();
    const post = await getPost();

    return getAgent()
      .post('/api/v1/comments')
      .send({
        commentBy: user._id,
        post: post._id,
        comment: 'Tell your dog I said hi.'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          commentBy: user._id,
          post: post._id,
          comment: 'Tell your dog I said hi.',
          __v: 0
        });
      });
  });

  it('deletes a comment by id', async() => {
    const user = await getUser({ username: 'jennag' });
    const comment = await getComment({ commentBy: user._id });

    return getAgent()
      .delete(`/api/v1/comments/${comment._id}`)
      .then(res => {
        expect(res.body).toEqual(comment);
      });
  });
});
