"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    //atributes
    productId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    shopId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onDelete: "no action",
      onUpdate: "no action",
      references: {
        model: "Shops",
        key: "shopId",
      },
    },
    name: {
      type: DataTypes.STRING,
    },
    cost: {
      type: DataTypes.FLOAT(10, 2),
    },
    stock: {
      type: DataTypes.INTEGER,
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
  Product.associate = function (models) {
    Product.hasMany(models.Shopcart, {
      foreignKey: "productId",
    });
  };
  return Product;
};
