const db = require('../database/dbConfig.js');
const request = require('supertest');
const server = require('../api/server.js');


let token;

beforeAll((done) => {
    request(server)
        .post('/login')
        .send({
            username: username,
            password: password
        })
        .end((error, response) => {
            token = response.body.token;
            done();
        });
});

describe('GET /', () => {
    it('should require authorization', () => {
        return request(server)
            .get('/')
            .then((response) => {
                expect(response.statusCode).toBe(401);
            });
    });
    it('should respond with JSON users object', () => {
        return request(server)
            .get('/')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
            });
    });
    it ('should respond with one user by id', () => {
        return request(server)
            .get('/:id')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
            });
    })
    it ('should respond with stories for user by id', () => {
        return request(server)
            .get('/:id/stories')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
            });
    })
});

describe('POST /', () => {
    it('should require authorization', () => {
        return request(server)
            .post('/')
            .then((response) => {
                expect(response.statusCode).toBe(401);
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
            .then((response) => {
                expect(response.statusCode).toBe(201)
                expect(response.type).toBe('application/json')
            })
            .end((error, response) => {
                if (error) return done(error);
                done();
            });
    });
});

describe('DELETE /', () => {
    it('should require authorization', () => {
        return request(server)
            .delete('/')
            .then((response) => {
                expect(response.statusCode).toBe(401);
            });
    });
    it ('should delete user', () => {
        return request(server)
            .delete('/:id')
            .set('Authorization', `Bearer ${token}`)
            .then((response) => {
                expect(response.statusCode).toBe(200);
                expect(response.type).toBe('application/json');
            });
    });
});

