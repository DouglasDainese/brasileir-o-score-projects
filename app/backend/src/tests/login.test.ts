import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { token, tokenMock } from './mocks/loginMock';
import UsersService from '../services/UserServices';
const { expect } = chai;
chai.use(chaiHttp);

describe('Rota /login', () => {
  afterEach(sinon.restore);

  describe('Caso sem sucesso', () => {

    it('POST /login sem os dados de usuario e senha', async () => {

      const response = await chai.request(app).post('/login');

      expect(response.status).to.be.equal(400);
      expect(response.body).to.deep.equal({ "message": "All fields must be filled" });
    });
    it('POST /login com os dados de usuario e/ou senha invalidos', async () => {

      const response = await chai.request(app)
        .post('/login')
        .send({
          "email": "userInvalid",
          "password": "senhaInvalid"
        });

      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ "message": "Invalid email or password" });
    });
  })

  describe('Caso de sucesso', () => {
    it('POST /login com os dados corretos de usuario e senha', async () => {
      sinon.stub(UsersService, 'loginUser').resolves(token)

      const response = await chai.request(app)
        .post('/login')
        .send({
          "email": "user@Valid.com",
          "password": "senhaValid"
        });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.deep.equal(tokenMock);
    });
  })
})
