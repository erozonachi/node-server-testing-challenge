const db = require('../data/dbConfig');
const server = require('./server');
const request = require('supertest');
const Countries = require('../countries/CountriesModel');

beforeEach(async () => {
  await db('countries').truncate();
});

describe('server', () => {
  it('[POST] /countries WORKS!', () => {
    return request(server)
      // chain a lot of stuff
      .post('/countries')
      .send({ name: 'Nigeria', capital: 'Abuja', population: 150000000 })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });

  it('[DELETE] /countries/:id ALSO WORKS', async () => {
    await Countries.insert({ name: 'Nigeria', capital: 'Abuja', population: 150000000 });

    return request(server)
      .delete('/countries/1')
      .expect(200)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({ message: `1 country deleted`});
      });
  });
});
