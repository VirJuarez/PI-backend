const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    healthscore: {
      type: DataTypes.INTEGER,
      validate:{
        customValidator(value) {
          if (parseInt(value)<0 || parseInt(value)>100 ) {
            throw new Error("between 0 and 100");
          }}}
    },
    steps: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    dishtype: {
      type: DataTypes.STRING,
    }, 
  },{timestamps: false});
};
