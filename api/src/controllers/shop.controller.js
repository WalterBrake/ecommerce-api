//import the Shop model
import { Shop, Product } from "../../db/models/";
/**
 *
 * function to create shop
 *  
 */

export async function createShop(req, res, next) {
  try {
    //get the request data
    const { name, telephone } = req.body;

    //create the shop 
    let newShop = await Shop.create({
      name,
      telephone,
    });
    //evaluate if was created the shop
    if (newShop) {
      res.json({
        code: 1000,
        message: "success",
        data: {
          shop: newShop,
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
 * function to get all shops
 *
 */
export async function getShops(req, res) {
  try {
    //Get all shops
    let shops = await Shop.findAll({
      include: [{
        model: Product,
      }]
    });

    //evaluate if there are records
    if (shops.length !== 0) {
      //Success
      res.json({
        code: 1000,
        message: "Success",
        data: shops,
      });
    } else {
      //There is not shops
      res.json({
        code: 1000,
        message: "There is not shop",
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
 *  function to get one Shop
 * 
 * 
 */
export async function getOneShop(req, res) {

  try {
    //get the request data
    const { ShopId } = req.params;

    let Shop = await Shop.findOne({
      where: {
        ShopId
      }
    }, {

    });
    if (Shop) {
      //Return the data
      res.json({
        code: 1000,
        message: 'Success',
        data: Shop
      });
    } else {
      //Return the data
      res.status(400).json({
        code: 1009,
        message: 'Record not found',
        data: {}
      });
    }
  } catch (e) {
    //wrong case return error
    res.status(500).json({
      code: 2000,
      message: 'Something goes wrong, there is not Shop: ' + e.name,
      data: {}
    });
  }
}



/**  
 * function to delete Shop
 * 
 */
export async function deleteShop(req, res, next) {
  try {
    //get the request data
    const { ShopId } = req.params;
    let deleteUsser = await Shop.destroy({
      where: {
        ShopId
      }
    });
    if (deleteUsser) {

      //Return the data
      res.json({
        code: 1000,
        message: 'Success',
        data: {}
      });
    } else {
      //Return the data
      res.status(500).json({
        code: 1008,
        message: 'Cannot delete record',
        data: {}
      });
    }
  } catch (e) {
    //wrong case return error
    res.status(500).json({
      code: 2000,
      message: 'Something goes wrong: ' + e,
      data: {}
    });
  }
}



/**  
 * function to update Shop
 * 
 * 
 */
export async function updateShop(req, res, next) {
  try {
    //get the request data params
    const { ShopId } = req.params;
    //get the request data body
    const { link } = req.body.Shop;

    var ShopFound = await Shop.findOne({
      where: {
        ShopId
      }
    });
    //evaluate if there are Shops
    if (ShopFound) {

      //update the Shop resourse
      let ShopUpdated = await ShopFound.update({
        link: ShopFound.type == 'SLIDER' ? JSON.stringify(link) : link
      });
      if (ShopUpdated) {
        
        //Return the data
        res.json({
          code: 1000,
          message: 'Success',
          data: ShopUpdated
        });
      } else {
        //Return the data
        res.json({
          code: 1006,
          message: 'Cannot update record',
          data: {}
        });
      }
    } else {
      //Not Shop case Return the message
      res.status(400).json({
        code: 1009,
        message: 'Record not found',
        data: {}
      });
    }
  } catch (e) {
    //wrong case return error
    res.status(500).json({
      code: 2000,
      message: 'Something goes wrong: ' + e,
      data: {}
    });
  }

}	
