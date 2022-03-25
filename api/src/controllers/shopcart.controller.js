//import the Shopcart model
import { Shopcart, Payment } from "../../db/models/";
/**
 *
 * function to create shopcart
 *  
 */

export async function createShopcart(req, res, next) {
  try {
    //get the request data
    const { name, telephone } = req.body;

    //create the shopcart 
    let newShopcart = await Shopcart.create({
      name,
      telephone,
    });
    //evaluate if was created the shopcart
    if (newShopcart) {
      res.json({
        code: 1000,
        message: "success",
        data: {
          shopcart: newShopcart,
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
 * function to get all shopcarts
 *
 */
export async function getShopcarts(req, res) {
  try {
    //Get all shopcarts
    let shopcarts = await Shopcart.findAll();

    //evaluate if there are records
    if (shopcarts.length !== 0) {
      //Success
      res.json({
        code: 1000,
        message: "Success",
        data: shopcarts,
      });
    } else {
      //There is not shopcarts
      res.json({
        code: 1000,
        message: "There is not shopcart",
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
 *  function to get one Shopcart
 * 
 * 
 */
export async function getOneShopcart(req, res) {

  try {
    //get the request data
    const { ShopcartId } = req.params;

    let Shopcart = await Shopcart.findOne({
      where: {
        ShopcartId
      }
    }, {

    });
    if (Shopcart) {
      //Return the data
      res.json({
        code: 1000,
        message: 'Success',
        data: Shopcart
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
      message: 'Something goes wrong, there is not Shopcart: ' + e.name,
      data: {}
    });
  }
}



/**  
 * function to delete Shopcart
 * 
 */
export async function deleteShopcart(req, res, next) {
  try {
    //get the request data
    const { ShopcartId } = req.params;
    let deleteUsser = await Shopcart.destroy({
      where: {
        ShopcartId
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
 * function to update Shopcart
 * 
 * 
 */
export async function updateShopcart(req, res, next) {
  try {
    //get the request data params
    const { ShopcartId } = req.params;
    //get the request data body
    const { link } = req.body.Shopcart;

    var ShopcartFound = await Shopcart.findOne({
      where: {
        ShopcartId
      }
    });
    //evaluate if there are Shopcarts
    if (ShopcartFound) {

      //update the Shopcart resourse
      let ShopcartUpdated = await ShopcartFound.update({
        link: ShopcartFound.type == 'SLIDER' ? JSON.stringify(link) : link
      });
      if (ShopcartUpdated) {
        
        //Return the data
        res.json({
          code: 1000,
          message: 'Success',
          data: ShopcartUpdated
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
      //Not Shopcart case Return the message
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
