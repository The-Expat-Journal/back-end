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
            .get('/api/stories')
            .then((res) => {
                expect(res.statusCode).toBe(401);
            });
    });
    it ('should respond with photos for story by id', () => {
        return request(server)
            .get('/api/stories/6/photos')
            .set('Authorization', `${token}`)
            .then((res) => {
                // console.log(res.body);
                expect(res.statusCode).toBe(201);
                expect(res.type).toBe('application/json');
            });
    })
    it ('should respond with stories for user by id', (done) => {
        return request(server)
            .get('/api/stories/10')
            .set('Authorization', `${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    })
});

describe('POST /', () => {
    it('should add photo to story by id', (done) => {
        return request(server)
            .post('/api/stories/15/photos')
            .send({
                photo_url: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80', 
                photo_title: "Oia, Greece", 
                photo_description: "Pathway to the Mediterranean", 
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
    it ('should delete story', (done) => {
        return request(server)
            .delete('/api/stories/21')
            .set('Authorization', `${token}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            })
    });
});
