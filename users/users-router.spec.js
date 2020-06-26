const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js');


let token;

beforeAll((done) => {
    request(server)
        .post('/api/auth/login')
        .send({
            username: 'userasdfasdfaname',
            password: 'passwasdfasdfasdford'
        })
        .then(() =>{
          request(server)
              .post('/api/auth/login')
              .send({
                  username: 'userasdfasdfaname',
                  password: 'passwasdfasdfasdford'
              })
              .end((err, res) => {
                // console.log(res.body.token)
                  token = res.body.token;
                  done();
        })

        });
});
// console.log(token)
describe('GET /', () => {
    it('should require authorization', () => {
        return request(server)
            .get('/api/users')
            .then((res) => {
              console.log(res)
                expect(res.statusCode).toBe(401);
            });
    });
    it('should respond with JSON users object', () => {
        return request(server)
            .get('/api/users')
            .set('Authorization', `${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.body.type).toBe('application/json');
            });
    });
    it ('should respond with one user by id', () => {
        return request(server)
            .get('/api/users/:id')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    })
    it ('should respond with stories for user by id', () => {
        return request(server)
            .get('/api/users/:id/stories')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    })
});

describe('POST /', () => {
    it('should require authorization', () => {
        return request(server)
            .post('/')
            .then((res) => {
                expect(res.statusCode).toBe(401);
            });
    });
    it('should add story to user by id', (done) => {
        return request(server)
            .post('/:id/stories')
            .send({
                story_name: "France",
                story_description: "My trip to France was amazing"
            })
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(201)
                expect(res.type).toBe('application/json')
            })
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('DELETE /', () => {
    it('should require authorization', () => {
        return request(server)
            .delete('/')
            .then((res) => {
                expect(res.statusCode).toBe(401);
            });
    });
    it ('should delete user', () => {
        return request(server)
            .delete('/:id')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    });
});
