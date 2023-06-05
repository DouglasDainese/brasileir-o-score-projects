import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import allMatches from './mocks/matchesMock'
import MatchesModel from '../database/models/MatchesModel'

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

})
