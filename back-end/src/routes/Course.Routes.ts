import CourseController from '../controllers/Course.Controller';
import { Application, Router } from "express"

export class CourseRoutes {
    public courseController: CourseController = new CourseController();
    public router =  Router()

    public routes(app: Application): void {


/* A route for the todoController. */
        app.route('/course/:code')
            .get(this.courseController.getCourse)
            .put(this.courseController.updateCourse)
            .delete(this.courseController.deleteCourse)

        app.route('/course/:courseID')
            // get specific todo
            .get(this.courseController.getCourse)
            .put(this.courseController.updateCourse)
            .delete(this.courseController.deleteCourse)

        app.route('/courses/')
            .get(this.courseController.getCourses)

        app.route('/courses/names')
            .get(this.courseController.getCourseNames)

        app.route('/courses/:major')
            .get(this.courseController.getCoursesFromMajor)
    }   
}