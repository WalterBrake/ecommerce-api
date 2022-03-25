"use strict";
module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define("Shop", {
    //atributes
    shopId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  });
  Shop.associate = function (models) {

    Shop.hasMany(models.Product, {
      foreignKey: "shopId",
    });
  };
  return Shop;
};
