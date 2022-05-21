import { Request, Response } from "express"
import { Op } from "sequelize";
import { CourseDAO } from "../sequelize/models/Course.Model";
 
export default class CourseController {
    createCourse = async (req: Request, res: Response) => {
        console.log("create creates")
    };

    getCourses = async (req: Request, res: Response) => {
        try {
            res.status(200).send({
                message: await CourseDAO.findAll({
                    order: [['code', 'ASC'], ['code_number', 'ASC']]
                })
            })
  
        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }        

    };

    getCourse = async (req: Request, res: Response) => {
        try {
            res.status(200).send({
                message: await CourseDAO.findOne({
                    where: {
                        code: req.params.code
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

    getCoursesFromMajor = async (req: Request, res: Response) => {
        try {
            res.status(200).send({
                message: await CourseDAO.findAll({
                    where: {
                        code: {
                            [Op.like]: `%${req.params.major}%`
                        }
                    }
                })
            })          
        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }

    }

    getCourseNames = async (req: Request, res: Response) => {
        try {
            res.status(200).send({
                message: await CourseDAO.findAll({
                    attributes: [
                        'code',
                        'name'
                    ]
                })
            })
            
        } catch (error) {
            res.status(500).send({
                message: error
            })
            console.error(error)
        }
    }

    updateCourse = async (req: Request, res: Response) => {
        console.log("update courses")
    };

    deleteCourse = async (req: Request, res: Response) => {
        console.log("delete courses")
    };
}