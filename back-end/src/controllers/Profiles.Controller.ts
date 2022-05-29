import { Request, Response } from "express"
import { CourseDAO } from "../sequelize/models/Course.Model";
import { ProfileDAO } from "../sequelize/models/Profile.Model";
import { sequelize } from "../sequelize/instance";


export default class ProfileController {

    
    createProfile = async (req: Request, res: Response) => {
        try {
            const body = req.body
            await ProfileDAO.create({
                semester: body.semester,
                year: body.year,
                notes: body.notes,
                grade: body.grade,
                code: body.code,
                username: body.username,
                createdAt: new Date(),
                updatedAt: new Date()
            }).then(() => {
                res.status(200).send({
                    message: `new profile was generated`
                })
            });
        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }
    };

    getProfileID = async (req: Request, res: Response) => {
        try {
            res.status(200).send({
                message: await ProfileDAO.findOne({
                    where: {
                        code: req.body.code,
                        username: req.body.username
                    },
                    attributes: ['id']
                })
            })
        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }
    };


    getProfile = async (req: Request, res: Response) => {
        try {
            // FIRST SELECT JOIN STATEMENT, JOINING PROFILES TABLE WITH COURSES TABLE USING PRIMARY KEY CODE
            // res.status(200).send({
            //     message: await sequelize.query(`SELECT * FROM "Profiles" JOIN "Courses" ON "Profiles".code="Courses".code WHERE "Profiles".username='${req.params.username}'`, { type: 'SELECT' })
            // });

            // HOW SELECT JOIN WOULD HAVE BEEN DONE USING ORM
            res.status(200).send({
                message: await ProfileDAO.findAll({
                    include: [{
                        model: CourseDAO,
                    }],
                    where: {
                        username: req.params.username
                    }

                })
            });
        } catch (error) {
            res.status(500).send({
                message: error
            });
            console.error(error);
        }
    };

    getUniqueSemesters = async (req: Request, res: Response) => {
        try {
            res.status(200).send({
                message: await ProfileDAO.findAll({
                    where: {
                        username: req.params.username,
                    },
                    attributes: ['semester', 'year'],
                    group: ['semester', 'year'],
                    order: [
                        ['year', 'ASC'],
                        [sequelize.literal(`CASE semester WHEN 'Spring' THEN 1 WHEN 'Summer' THEN 2 WHEN 'Fall' THEN 3 WHEN 'Winter' THEN 4 ELSE 0 END`), 'ASC'],
                    ]
                })
            });
        } catch (error) {
            res.status(500).send({
                message: error
            });
            console.error(error);
        }
    };

    getGrades = async (req: Request, res: Response) => {
        try {
            res.status(200).send({
                message: await ProfileDAO.findAll({
                    where: {
                        username: req.params.username
                    },

                    attributes: ['grade']

                })
            });
        } catch (error) {
            res.status(500).send({
                message: error
            });
            console.error(error);
        }
    };

    updateProfile = async (req: Request, res: Response) => {
        try {

        } catch (error) {

        }
    };
    

    deleteProfile = async (req: Request, res: Response) => {
        try {
            await ProfileDAO.destroy({
                where: {
                    username: req.params.username,
                    id: req.params.profileID
                }
            })
            .then((response) => {
                res.status(200).send({
                    message: response
                })
            })
        } 
        catch (error) {
            res.status(500).send({
                message: error
            })
            console.log(error)
        }
    };
}