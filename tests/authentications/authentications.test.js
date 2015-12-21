import superagent from 'superagent';
import request from 'supertest';
import { expect } from 'chai';

describe('Authentication Handlers', ()=> {
  let url = 'http://localhost:4000';

  it('should GET register page', (done)=> {
    // request(url)
    //   .get('/api/register')
    //   .end((err, res)=> {
    //     if (err) {
    //       throw err;
    //     }
    //     console.log('res: ', res);
    //     expect(res.statusCode).to.equal(200);
    //     done();
    //   });
    superagent.post(url)
      .end((e, res)=> {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });

  // it('should POST register page', (done)=> {
  //   let userObj = {
  //     'name': 'Alice Smith',
  //     'email': 'alice@ex.co',
  //     'password': 'password'
  //   };

  //   request(url)
  //     .post('/api/register')
  //     .send({'user': userObj})
  //     .expect('Content-type',/json/)
  //     .expect(200)
  //     .end((err, res)=> {
  //       console.log('res', res);
  //       done();
  //     });
  // });

  // it('should GET logout page', ()=> {
  //   request(url)
  //     .get('/api/logout')
  //     .end((err, res)=> {
  //       if (err) {
  //         throw err;
  //       }
  //       res.should.have.status(200);
  //       done();
  //     });
  // });
});
