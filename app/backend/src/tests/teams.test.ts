import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel'
import { teamsMock } from './mocks/teamsMocks';
import { StatusCodes } from 'http-status-codes';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota teams', () => {

  afterEach(() => {
    sinon.restore();
  })

  it(' se ao fazer uma requisição GET a resposta contem um status 200 e um json contendo todos os times cadastrados', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves()

    const getAllteams = await chai.request(app).get('\teams');

    expect(getAllteams.body).to.deep.equal(teamsMock)
    expect(getAllteams).to.have.status(StatusCodes.OK);

  });

});
