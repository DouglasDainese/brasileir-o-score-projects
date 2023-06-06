import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import allMatches, { invalidMatchMock, newMatchMock, newMatchResponseMock } from './mocks/matchesMock'
import MatchesModel from '../database/models/MatchesModel'
import validatetoken from '../auth/ValidateToken';
import { token } from './mocks/loginMock';
import TeamsModel from '../database/models/TeamsModel';

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

    it('caso SEM sucesso não deve permitir registrar a partida com o mesmo time Id', async () => {
      sinon.stub(validatetoken, 'verify').returns({ payload: { userId: 1 } })

      const response = await chai.request(app)
        .post('/matches')
        .send(invalidMatchMock)
        .set('authorization', token);

      expect(response).to.have.status(422);
      expect(response.body).to.deep.equal({
        message: "It is not possible to create a match with two equal teams"
      });
    });

    it('caso SEM sucesso não deve permitir registrar a partida com um time inexistente', async () => {
      sinon.stub(validatetoken, 'verify').returns({ payload: { userId: 1 } })
      sinon.stub(TeamsModel, 'findByPk').resolves(undefined)

      const response = await chai.request(app)
        .post('/matches')
        .send({
          homeTeamId: 8,
          awayTeamId: 80,
          homeTeamGoals: 2,
          awayTeamGoals: 2,
        })
        .set('authorization', token);

      expect(response).to.have.status(404);
      expect(response.body).to.deep.equal({ message: "There is no team with such id!" });
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

  describe(`testes do endpoint /matches/:id 
    de modo que seja possível atualizar uma partida em andamento`, () => {

    it('Em caso de sucesso deve-se retornar, com um status 200', async () => {
      sinon.stub(validatetoken, 'verify').returns({ payload: { userId: 1 } })
      sinon.stub(MatchesModel, 'update').resolves()

      const response = await chai.request(app)
        .patch('/matches/1')
        .send({ homeTeamGoals: 3, awayTeamGoals: 10 })
        .set('authorization', token);

      expect(response).to.have.status(200);
    });

  })

  describe(`testes do endpoint /matches/:id/finish 
    de modo que seja possível finalizar uma partida no banco de dados`, () => {

    it('Em caso de sucesso deve-se retornar, com um status 200, a mensagem de Finished', async () => {
      sinon.stub(validatetoken, 'verify').returns({ payload: { userId: 1 } })
      sinon.stub(MatchesModel, 'update').resolves()

      const response = await chai.request(app)
        .patch('/matches/1/finish')
        .set('authorization', token);

      expect(response.body).to.deep.equal({ message: "Finished" });
      expect(response).to.have.status(200);
    });

  })

})
