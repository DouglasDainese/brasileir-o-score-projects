import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import allMatches, { matches } from './mocks/matchesMock'
import MatchesModel from '../database/models/MatchesModel'
import TeamsModel from '../database/models/TeamsModel';
import { teamsMock } from './mocks/teamsMocks';
import { classificaçãoGeral, classificaçãoMandantes, classificaçãoVisitantes } from './mocks/leaderboardMock';

const { expect } = chai;
chai.use(chaiHttp);

describe('Testes d rota /leaderboard', () => {

  afterEach(sinon.restore);

  it('GET /leaderboarder, a página deve apresentar a classificação geral', async () => {

    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as any);
    sinon.stub(MatchesModel, 'findAll').resolves(matches as any)
    const response = await chai.request(app).get('/leaderboard');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(classificaçãoGeral);
  });
  it('GET /leaderboarder/home, a página deve apresentar a classificação dos times mandantes', async () => {

    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as any);
    sinon.stub(MatchesModel, 'findAll').resolves(matches as any)
    const response = await chai.request(app).get('/leaderboard/home');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(classificaçãoMandantes);
  });
  it('GET /leaderboarder/away, a página deve apresentar a classificação visitantes', async () => {

    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as any);
    sinon.stub(MatchesModel, 'findAll').resolves(matches as any)
    const response = await chai.request(app).get('/leaderboard/away');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(classificaçãoVisitantes);
  });

})
