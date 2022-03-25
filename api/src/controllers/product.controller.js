//import the Product model
import { Product, Payment } from "../../db/models";
/**
 *
 * function to create product
 *
 */

export async function createProduct(req, res, next) {
  try {
    //get the request data
    const { cost, name, stock, shopId } = req.body;

    //create the product
    let newProduct = await Product.create({
      cost,
      name,
      stock,
      shopId
    });
    //evaluate if was created the product
    if (newProduct) {
      res.json({
        code: 1000,
        message: "success",
        data: {
          product: newProduct,
        },
      });
    } else {
      throw new Error("Cannot create record");
    }
  } catch (e) {
    //wrong case return error
    res.status(500).json({
      code: 2000,
      message: "Something goes wrong" + e,
      data: {},
    });
  }
}

/**
 *
 * function to get all products
 *
 */
export async function getProducts(req, res) {
  try {
    //Get all products
    let products = await Product.findAll();

    //evaluate if there are records
    if (products.length !== 0) {
      //Success
      res.json({
        code: 1000,
        message: "Success",
        data: products,
      });
    } else {
      //There is not products
      res.json({
        code: 1000,
        message: "There is not product",
        data: [],
      });
    }
  } catch (e) {
    //wrong case return error
    res.status(500).json({
      code: 2000,
      message: "Something goes wrong: " + e,
      data: {},
    });
  }
}

/**
 *  function to get one Product
 *
 *
 */
export async function getOneProduct(req, res) {
  try {
    //get the request data
    const { ProductId } = req.params;

    let Product = await Product.findOne(
      {
        where: {
          ProductId,
        },
      },
      {}
    );
    if (Product) {
      //Return the data
      res.json({
        code: 1000,
        message: "Success",
        data: Product,
      });
    } else {
      //Return the data
      res.status(400).json({
        code: 1009,
        message: "Record not found",
        data: {},
      });
    }
  } catch (e) {
    //wrong case return error
    res.status(500).json({
      code: 2000,
      message: "Something goes wrong, there is not Product: " + e.name,
      data: {},
    });
  }
}

/**
 * function to delete Product
 *
 */
export async function deleteProduct(req, res, next) {
  try {
    //get the request data
    const { ProductId } = req.params;
    let deleteUsser = await Product.destroy({
      where: {
        ProductId,
      },
    });
    if (deleteUsser) {
      //Return the data
      res.json({
        code: 1000,
        message: "Success",
        data: {},
      });
    } else {
      //Return the data
      res.status(500).json({
        code: 1008,
        message: "Cannot delete record",
        data: {},
      });
    }
  } catch (e) {
    //wrong case return error
    res.status(500).json({
      code: 2000,
      message: "Something goes wrong: " + e,
      data: {},
    });
  }
}

/**
 * function to update Product
 *
 *
 */
export async function updateProduct(req, res, next) {
  try {
    //get the request data params
    const { ProductId } = req.params;
    //get the request data body
    const { link } = req.body.Product;

    var ProductFound = await Product.findOne({
      where: {
        ProductId,
      },
    });
    //evaluate if there are Products
    if (ProductFound) {
      //update the Product resourse
      let ProductUpdated = await ProductFound.update({
        link: ProductFound.type == "SLIDER" ? JSON.stringify(link) : link,
      });
      if (ProductUpdated) {
        //Return the data
        res.json({
          code: 1000,
          message: "Success",
          data: ProductUpdated,
        });
      } else {
        //Return the data
        res.json({
          code: 1006,
          message: "Cannot update record",
          data: {},
        });
      }
    } else {
      //Not Product case Return the message
      res.status(400).json({
        code: 1009,
        message: "Record not found",
        data: {},
      });
    }
  } catch (e) {
    //wrong case return error
    res.status(500).json({
      code: 2000,
      message: "Something goes wrong: " + e,
      data: {},
    });
  }
}
