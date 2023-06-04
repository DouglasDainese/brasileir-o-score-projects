'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', { 
      id: {
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeamId: {
        field: 'home_team_id',
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        type: Sequelize.INTEGER,
      },
      awayTeamId: {
        field: 'away_team_id',
        type: Sequelize.INTEGER,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        type: Sequelize.INTEGER
      },
      inProgress: {
        field: 'in_progress',
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      }
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
