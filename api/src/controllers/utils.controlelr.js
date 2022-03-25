const passport = require("passport");
const jwt = require("jsonwebtoken");

//import the Theme model
import { User,sequelize } from "../../db/models";

const { Op } = require("sequelize"); //for user operators


/**
 * Define the strategy for authorization
 *
 */

export async function strategy(req, res, next) {
    const passportJWT = require("passport-jwt");
    const JWTStrategy = passportJWT.Strategy;
    const ExtractJWT = passportJWT.ExtractJwt;

    passport.use(
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
                secretOrKey: "your_jwt_secret",
            },
            function (jwtPayload, cb) {
                return cb(null, jwtPayload);
            }
        )
    );
}

/**
 * Method used fot authorization request
 * 
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */

export function authorization(req, res, next) {
    return passport.authenticate("jwt", { session: false });
}

/**
 * Function to do login
 * @param {email: string} req  User email
 * @param {password: string} res  User password
 */

export async function authentication(req, res) {
    try {
        //get the data
        let email = req.body.email;
        let password = req.body.password;

        let userFound = await User.findOne({
            where: {
                email,
                password: {
                    [Op.eq]: sequelize.fn("PASS", password),
                },
            },
            attributes: [
                "userId",
                "name"
            ],
        });
        console.log(sequelize.fn("PASS", password));
        if (userFound) {
            const tokenSession = jwt.sign(userFound.dataValues, "your_jwt_secret");

            //generate Random Session ID
            //send the sessionToken in header with response
            res.setHeader("tokenSession", tokenSession);
            userFound.dataValues.tokenSession = tokenSession;

            //Return the data
            res.json({
                code: 1000,
                message: "Success",
                data: {
                    user: userFound,
                    tokenSession,
                },
            });
        } else {
            //There is not records
            res.status(400).json({
                code: 1009,
                message: "User not found",
                data: userFound,
            });
        }
    } catch (e) {
        console.log(e);
        //wrong case return error
        res.status(500).json({
            code: 2000,
            message: "Something goes wrong: " + e,
            data: {},
        });
    }
}

/**
 *
 * function to registrer user
 *
 *
 */
export async function registrerUser(req, res, next) {
    try {
        //get the request data
        const { name,email,password } = req.body.user;

        //create the user whit follow data
        let newUser = await User.create(
            {
                name,
                email,
                password: sequelize.fn("PASS", password),
            }
        );
        //evaluate if was created the user
        if (newUser) {
            //delete the password propierty
            delete newUser.dataValues.password;

            const tokenSession = jwt.sign(newUser.dataValues, "your_jwt_secret");

            //send the sessionToken in header with response
            res.setHeader("tokenSession", tokenSession);

            newUser.dataValues.tokenSession = tokenSession;

            //Return the data
            res.json({
                code: 1000,
                message: "Success",
                data: { user: newUser },
            });
        } else {
            //Return the data
            res.json({
                code: 1006,
                message: "Cannot create record",
                data: {},
            });
        }


    } catch (e) {
        //wrong case return error
        //console.log(e);
        res.status(500).json({
            code: 2000,
            message: "Something goes wrong" + e,
            data: {},
        });
    }
}
