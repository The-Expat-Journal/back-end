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
    it ('should respond with all photos', () => {
        return request(server)
            .get('/api/photos')
            .set('Authorization', `${token}`)
            .then((res) => {
                // console.log(res.body);
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    })
    it ('should respond with photo by id', (done) => {
        return request(server)
            .get('/api/photos/5')
            .set('Authorization', `${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    })
});

describe('PUT /', () => {
    it('should update photo by id', (done) => {
        return request(server)
            .put('/api/photos/3')
            .send({
                photo_url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 
                photo_title: "Updated Photo", 
                photo_description: "These are the updates", 
                story_id: 1
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
    it ('should delete photo', (done) => {
        return request(server)
            .delete('/api/photos/17')
            .set('Authorization', `${token}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    });
});
