import { Request, Response } from "express"
// import { RequirementDAO } from "../sequelize/models/Requirement.Model";

export default class RequirementController {
    createRequirement = async (req: Request, res: Response) => {
        console.log("create creates")
    };

    getRequirement = async (req: Request, res: Response) => {
        try {
            res.status(200).send({
            });
        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }

    };

    getRequirements = async (req: Request, res: Response) => {
        try {
            res.status(200).send({

            })

        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }

    };

    updateRequirement = async (req: Request, res: Response) => {
        try {
            res.status(200).send({

            })

        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }
    };

    deleteRequirement = async (req: Request, res: Response) => {
        try {
            res.status(200).send({

            })

        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }
    };
}