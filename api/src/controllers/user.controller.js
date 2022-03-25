//import the User model
import { User, Payment } from "../../db/models/";
/**
 *
 * function to create user
 *  
 */

export async function createUser(req, res, next) {
  try {
    //get the request data
    const { name, telephone } = req.body;

    //create the user 
    let newUser = await User.create({
      name,
      telephone,
    });
    //evaluate if was created the user
    if (newUser) {
      res.json({
        code: 1000,
        message: "success",
        data: {
          user: newUser,
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
 * function to get all users
 *
 */
export async function getUsers(req, res) {
  try {
    //Get all users
    let users = await User.findAll({
      // include: [{
      //   model: Payment,
      // }]
    });

    //evaluate if there are records
    if (users.length !== 0) {
      //Success
      res.json({
        code: 1000,
        message: "Success",
        data: users,
      });
    } else {
      //There is not users
      res.json({
        code: 1000,
        message: "There is not user",
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
 *  function to get one User
 * 
 * 
 */
export async function getOneUser(req, res) {

  try {
    //get the request data
    const { UserId } = req.params;

    let User = await User.findOne({
      where: {
        UserId
      }
    }, {

    });
    if (User) {
      //Return the data
      res.json({
        code: 1000,
        message: 'Success',
        data: User
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
      message: 'Something goes wrong, there is not User: ' + e.name,
      data: {}
    });
  }
}



/**  
 * function to delete User
 * 
 */
export async function deleteUser(req, res, next) {
  try {
    //get the request data
    const { UserId } = req.params;
    let deleteUsser = await User.destroy({
      where: {
        UserId
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
 * function to update User
 * 
 * 
 */
export async function updateUser(req, res, next) {
  try {
    //get the request data params
    const { UserId } = req.params;
    //get the request data body
    const { link } = req.body.User;

    var UserFound = await User.findOne({
      where: {
        UserId
      }
    });
    //evaluate if there are Users
    if (UserFound) {

      //update the User resourse
      let UserUpdated = await UserFound.update({
        link: UserFound.type == 'SLIDER' ? JSON.stringify(link) : link
      });
      if (UserUpdated) {
        
        //Return the data
        res.json({
          code: 1000,
          message: 'Success',
          data: UserUpdated
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
      //Not User case Return the message
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
