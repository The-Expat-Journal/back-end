const db = require('../database/knex-setup.js');
const request = require('supertest');
const server = require('../api/server.js');
let token = '';
beforeAll((done) => {
    request(server)
        .post('/api/auth/register')
        .send({
            username: 'fakeuser',
            password: 'fakepassword'
        })
        .then(() =>{
          request(server)
              .post('/api/auth/login')
              .send({
                username: 'fakeuser',
                password: 'fakepassword'
              })
              .end((err, res) => {
                  token = res.body.token;
                //   console.log(token);
                  done();
        })
        });
});
describe('GET /', () => {
    it('should require authorization', () => {
        return request(server)
            .get('/api/users')
            .then((res) => {
                expect(res.statusCode).toBe(401);
            });
    });
    it('should respond with JSON users object', () => {
        // console.log(token);
        return request(server)
            .get('/api/users')
            .set('Authorization', `${token}`)
            .then((res) => {
                // console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    });
    it ('should respond with one user by id', () => {
        return request(server)
            .get('/api/users/1')
            .set('Authorization', `${token}`)
            .then((res) => {
                // console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    })
    it ('should respond with stories for user by id', () => {
        return request(server)
            .get('/api/users/4/stories')
            .set('Authorization', `${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(201);
                expect(res.type).toBe('application/json');
            });
    })
});

describe('POST /', () => {
    it('should add story to user by id', (done) => {
        return request(server)
            .post('/api/users/4/stories')
            .send({
                story_name: "France",
                story_description: "My trip to France was amazing"
            })
            .set('Authorization', `${token}`)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    });
});

describe('DELETE /', () => {
    it ('should delete user', (done) => {
        return request(server)
            .delete('/api/users/2')
            .set('Authorization', `${token}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    });
});
