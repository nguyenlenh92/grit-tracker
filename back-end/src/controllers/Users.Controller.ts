import { Request, Response } from "express"
import { ProfileDAO } from "../sequelize/models/Profile.Model";
import { UserDAO } from "../sequelize/models/User.Model";
import hashFN from '../utils/PasswordHashing'

export default class UserController {

    createUser = async (req: Request, res: Response) => {
        const [hashed_pw, salt] = hashFN(req.body.password, '')
        try {
            await UserDAO.create({
                username: req.body.username,
                password: hashed_pw,
                salt: salt,
            })
            .then( () => {
                res.status(200).send({
                    message: `${req.body.username} has been created.`
                })
            })
            
        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }
    };

    getUser = async (req: Request, res: Response) => {
        try {
            res.status(200).send({
                message: await UserDAO.findOne({
                    where: {
                        username: req.params.username
                    }
                })
            });
        } catch (error) {
            res.status(500).send({
                message: error
            })
        }
    };

    checkPassword = async (req: Request, res: Response) => {
        var isValid = false;
        try {
            await UserDAO.findOne({
                where: {
                    username: req.body.username
                }
                
            })
            .then(res => {
                const hashed_pw = (res?.getDataValue('password'));
                const salt = (res?.getDataValue('salt'));
                const [ calculatedHash, _ ] = hashFN(req.body.password, salt) 
                if (hashed_pw == calculatedHash){
                    isValid = true;
                };
            })
            .then(() => {
                res.status(200).send({
                    message: {
                        isValid: isValid
                    }
                });
            })
            
        } catch (error) {
            res.status(500).send({
                message: error
            });
            console.error(error);
        } 

    }

    updateUser = async (req: Request, res: Response) => {
        try {
            await UserDAO.update({degree: req.body.degree}, {
                where: {
                    username: req.body.username
                }
            })
            .then(() => {
                res.status(200).send({
                    message: req.body.username + 'was modified successfully'
                });
            });
                
        } catch (error) {
            res.status(500).send({
                message: error
            });
            console.error(error)
        }
    };

    deleteUser = async (req: Request, res: Response) => {
        console.log("delete users");
    };
}