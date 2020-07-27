const db = require('./database');

beforeAll(async () => {
  await db.sequelize.sync();
});

test('create user', async () => {
  expect.assertions(1);
  await db.sequelize.sync();
  const user = await db.User.create({
    id: 1,
    firstName: 'Todd',
    lastName: 'Howard',
    username: 'SkyrimLuvr_360',
  });
  expect(user.id).toEqual(1);
});

test('get user', async () => {
  expect.assertions(3);
  const user = await db.User.findByPk(1);
  expect(user.firstName).toEqual('Todd');
  expect(user.lastName).toEqual('Howard');
  expect(user.username).toEqual('SkyrimLuvr_360');
});

test('delete user', async () => {
  expect.assertions(1);
  await db.User.destroy({
    where: {
      id: 1,
    }
  });
  const user = await db.User.findByPk(1);
  expect(user).toBeNull();
});

afterAll(async () => {
  await db.sequelize.close();
});

