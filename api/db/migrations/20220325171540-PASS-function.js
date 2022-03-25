"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`

            CREATE FUNCTION PASS(VCH_Password VARCHAR(255)) RETURNS varchar(255) CHARSET utf8
            READS SQL DATA
            DETERMINISTIC
            RETURN SHA2(VCH_Password, 224)

          `);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize
      .query(` DROP function IF EXISTS PASS ;
        `);
  },
};
