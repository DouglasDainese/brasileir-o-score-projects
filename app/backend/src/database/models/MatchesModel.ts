import { Model, INTEGER, NUMBER, BOOLEAN } from 'sequelize';
import db from '.';
import TeamsModel from './TeamsModel';

class MatchesModel extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

MatchesModel.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: NUMBER,
    field: 'home_team_id',
    allowNull: false,
  },
  homeTeamGoals: {
    type: NUMBER,
    field: 'home_team_goals',
    allowNull: false,
  },
  awayTeamId: {
    type: NUMBER,
    field: 'away_team_id',
    allowNull: false,
  },
  awayTeamGoals: {
    type: NUMBER,
    field: 'away_team_goals',
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

MatchesModel.belongsTo(TeamsModel, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

TeamsModel.hasMany(MatchesModel, {
  foreignKey: 'homeTeamId',
  as: 'homeMatches',
});

TeamsModel.hasMany(MatchesModel, {
  foreignKey: 'awayTeamId',
  as: 'awayMatches',
});

export default MatchesModel;
