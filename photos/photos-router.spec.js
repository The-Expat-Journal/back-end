const db = require('../database/knex-setup.js');
const request = require('supertest');
const server = require('../api/server.js');


let token = '';

beforeAll((done) => {
    request(server)
        .post('/api/auth/register')
        .send({
            username: 'asdf',
            password: 'asdf'
        })
        .then(() =>{
          request(server)
              .post('/api/auth/login')
              .send({
                username: 'asdf',
                password: 'asdf'
              })
              .end((err, res) => {
                  token = res.body.token;

                  done();
        })
        });
});

describe('GET /', () => {
    it('should require authorization', () => {
        return request(server)
            .get('/api/photos')
            .then((res) => {

                expect(res.statusCode).toBe(401);
            });
    });
    it('should respond with array of photos', () => {

        return request(server)
            .get('/api/photos')
            .set('Authorization', `${token}`)
            .then((res) => {

                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    });
    it ('should respond with one photo by id', () => {
        return request(server)
            .get('/api/photos/1')
            .set('Authorization', `${token}`)
            .then((res) => {

                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    })
});

describe('DELETE /', () => {
    it ('should delete photo', () => {
        return request(server)
            .delete('/api/photos/2')
            .set('Authorization', `${token}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });

    });
});
