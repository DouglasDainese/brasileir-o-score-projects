import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { token, tokenInvalid, tokenMock } from './mocks/loginMock';
import UsersService from '../services/UserServices';
import validatetoken from '../auth/ValidateToken';
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

  describe(`Rota /login/role; uma rota GET que receba um header com parâmetro authorization,
   onde ficará armazenado o token gerado no login;` , () => {

    it('Caso o token não seja informado, deve-se retornar, com um status 401, a seguinte mensagem', async () => {

      const response = await chai.request(app)
        .get('/login/role');

      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: "Token not found" });
    });
  })

  it(`Caso o token informado não seja válido, deve-se retornar,
   com um status 401, a seguinte mensagem:`, async () => {

    const response = await chai.request(app)
      .get('/login/role').set('authorization', tokenInvalid);

    expect(response.status).to.be.equal(401);
    expect(response.body).to.deep.equal({ message: "Token must be a valid token" });
  });

  it(`Caso o token seja valido a resposta deve ser de status 200
   com um objeto contendo a role do user:`, async () => {
    sinon.stub(validatetoken, 'verify').returns({
      payload: { userId: 1 }
    })
    sinon.stub(UsersService, 'findUserRole').resolves("admin")

    const response = await chai.request(app)
      .get('/login/role').set('authorization', token);

    expect(response.body).to.deep.equal({ role: "admin" });
    expect(response.status).to.be.equal(200);
  });

})
