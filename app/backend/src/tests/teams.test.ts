import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import { teamsMock } from './mocks/teamsMocks';

const { expect } = chai;
chai.use(chaiHttp);

describe('Rota /teams', () => {
  afterEach(sinon.restore);

  it('GET /teams', async () => {

    sinon.stub(TeamsModel, 'findAll').resolves(teamsMock as any);

    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.deep.equal(teamsMock);
  });
});