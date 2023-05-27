module.exports = (sequelize, Sequelize) => {
    const Record = sequelize.define("record", {
      stu_num: {
        type: Sequelize.STRING,
        allowNull: false,
    //    unique: true,
    //    primaryKey: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tele_id: {
        type: Sequelize.STRING
      }
    });
  
    return Record;
  };