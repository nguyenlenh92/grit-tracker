import { Request, Response } from "express"
import { DegreeDAO } from "../sequelize/models/Degree.Model";

export default class ProfileController {
    createDegree = async (req: Request, res: Response) => {
        console.log("create creates")
    };

    getDegrees = async (req: Request, res: Response) => {
        try {
            res.status(200).send({
                message: await DegreeDAO.findAll({
                    attributes: ['prefix', 'name']
                })
            })

        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }

    };

    getDegree = async (req: Request, res: Response) => {
        try {
            res.status(200).send({
                message: await DegreeDAO.findOne({
                    where: {
                        prefix: req.params.prefix
                    }
                })
            });
        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }

    };


    updateDegree = async (req: Request, res: Response) => {
        console.log("update courses")
    };

    deleteDegree = async (req: Request, res: Response) => {
        console.log("delete courses")
    };
}