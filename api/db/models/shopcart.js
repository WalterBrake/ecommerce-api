"use strict";
module.exports = (sequelize, DataTypes) => {
  const Shopcart = sequelize.define("Shopcart", {
    //atributes
    shopcartId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onDelete: "no action",
      onUpdate: "no action",
      references: {
        model: "Shopcarts",
        key: "userId",
      },
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onDelete: "no action",
      onUpdate: "no action",
      references: {
        model: "Products",
        key: "productId",
      },
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
  Shopcart.associate = function (models) {
    console.log(models);
  };
  return Shopcart;
};
