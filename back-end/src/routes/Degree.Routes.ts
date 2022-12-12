import DegreeController from '../controllers/Degree.Controller';
import { Application, Router } from "express"

export class DegreeRoutes {
    public degreeController: DegreeController = new DegreeController();
    public router = Router()

    public routes(app: Application): void {
        app.route('/degrees/')
            .get(this.degreeController.getDegrees)
            .post(this.degreeController.createDegree)
            
        app.route('/degrees/:prefix')
            .get(this.degreeController.getDegree)
            .put(this.degreeController.updateDegree)
            .delete(this.degreeController.deleteDegree)
    }
}