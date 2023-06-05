import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import allMatches, { newMatchMock, newMatchResponseMock } from './mocks/matchesMock'
import MatchesModel from '../database/models/MatchesModel'
import validatetoken from '../auth/ValidateToken';
import { token } from './mocks/loginMock';

const { expect } = chai;
chai.use(chaiHttp);

describe('Rota /matches', () => {

  afterEach(sinon.restore);

  it('GET /matches, a página deve apresentar todos os dados de partidas sem nenhum filtro.', async () => {

    sinon.stub(MatchesModel, 'findAll').resolves(allMatches as any)
    const response = await chai.request(app).get('/matches');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(allMatches);
  });

  describe(`POST /matches, o endpoint deve cadastrar uma nova partida em andamento
  e retornar a partida inserida no banco de dados`, () => {

    it('caso de sucesso com as informações corretas deve retornar as informações da partida inserida', async () => {
      sinon.stub(validatetoken, 'verify').returns({ payload: { userId: 1 } })
      sinon.stub(MatchesModel, 'create').resolves({ dataValues: { id: 1 } } as any)
      sinon.stub(MatchesModel, 'findByPk').resolves(newMatchResponseMock as any)

      const response = await chai.request(app)
        .post('/matches')
        .send(newMatchMock)
        .set('authorization', token);

      expect(response).to.have.status(201);
      expect(response.body).to.deep.equal(newMatchResponseMock);
    });

    it('caso SEM sucesso, sem o tokem', async () => {
      sinon.stub(validatetoken, 'verify').returns({
        payload: { userId: 1 }
      })
      sinon.stub(MatchesModel, 'create').resolves(1 as any)
      sinon.stub(MatchesModel, 'findByPk').resolves(newMatchResponseMock as any)

      const response = await chai.request(app)
        .post('/matches')
        .send(newMatchMock);

      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: "Token not found" });
    });

    it('caso SEM sucesso, com o tokem invalido', async () => {
      sinon.stub(MatchesModel, 'create').resolves(1 as any)
      sinon.stub(MatchesModel, 'findByPk').resolves(newMatchResponseMock as any)

      const response = await chai.request(app)
        .post('/matches')
        .send(newMatchMock)
        .set('authorization', 'token.invalido');

      expect(response.status).to.be.equal(401);
      expect(response.body).to.deep.equal({ message: "Token must be a valid token" });
    });

  })

})
