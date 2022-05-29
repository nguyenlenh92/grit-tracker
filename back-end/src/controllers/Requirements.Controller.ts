import { Request, Response } from "express"
import { RequirementDAO } from "../sequelize/models/Requirement.Model";
import { ProfileDAO } from "../sequelize/models/Profile.Model";
import CMSC_BS_Requirement from "../programs/CMSC-BS";
import { SatisfiesRequirementDAO } from "../sequelize/models/SatisfiesRequirement.Model";
import { CourseDAO } from "../sequelize/models/Course.Model";
import { AttributeDAO } from "../sequelize/models/Attribute.Model";
import { sequelize } from "../sequelize/instance";

interface CourseType {
    code: string,
    grade: string,
    credits: number,
    attributes?: string[]
}

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

            // SELECT JOIN STATEMENT DONE USING SEQUELIZE ORM
            // await ProfileDAO.findAll({
            //     include: [{
            //         model: CourseDAO,
            //         as: 'Course',
            //         attributes: ['code', 'credits'],
            //         include: [{
            //             model: AttributeDAO,
            //             attributes: ['attribute']
            //         }]
            //     }],
            //     where: {
            //         username: req.params.username
            //     },
            //     attributes: ['code', 'grade'],
            //     raw: true,
            // })
            // THIRD SELECT JOIN STATEMENT, JOINING PROFILE AN COURSES WITH INNER JOIN AND OUTER JOINING ATTRIBUTES WITH OUTER JOIN
            await sequelize.query(
                `SELECT "Profiles".code, grade, credits, attribute FROM "Profiles" JOIN "Courses" ON "Profiles".code="Courses".code LEFT JOIN "Attributes" ON "Courses".code="Attributes".course WHERE "Profiles".username='${req.params.username}';`, {type: 'SELECT'})
            .then( async (res) => {
                const CMSC = new CMSC_BS_Requirement()
                const courses: CourseType[] = []
                res.forEach((course: any) => {
                    const newCourse: CourseType = {
                        code: course.code,
                        grade: course.grade,
                        credits: course.credits,
                        attributes: [course.attribute]
                    }
                    var index = courses.findIndex(course => course.code === newCourse.code)
                    if (index === -1){
                        courses.push(newCourse)
                    }
                    else {
                        if (newCourse.attributes !== undefined){
                            courses[index].attributes = courses[index].attributes?.concat(newCourse.attributes)
                        }
                    }
                })
                CMSC.satisfyRequirements(courses)
                for (const requirement of Object.keys(CMSC.requirements)){
                    await SatisfiesRequirementDAO.update({
                        satisfies: CMSC.requirements[requirement]
                    }, {
                        where: {
                            username: req.params.username,
                            requirement: requirement
                        }
                    })
                }
            })
            .catch(err => console.error(err)) 
            

            res.status(200).send({

                // SECOND SELECT JOIN STATEMENT IN WHICH WE JOIN SATISFIESREQUIREMENTS WITH REQUIREMENTS USING FOREIGNKEY REQUIREMENT
                // message: await sequelize.query(
                //     `SELECT "SatisfiesRequirements".requirement, satisfies, name, satisfy_condition \
                //     FROM "SatisfiesRequirements" JOIN "Requirements" ON "SatisfiesRequirements".requirement="Requirements".requirement \
                //     WHERE "SatisfiesRequirements".username='${req.params.username}'`, { type: 'SELECT'})
                
                // JOIN DONE USING SEQUELIZE ORM
                    message: await SatisfiesRequirementDAO.findAll({
                    include: {
                        model: RequirementDAO,
                        attributes: ['name', 'satisfy_condition'],
                    },
                    where: {
                        username: req.params.username
                    },
                    attributes: ['requirement', 'satisfies'],
                    order: [['satisfies', 'DESC']],
                })
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