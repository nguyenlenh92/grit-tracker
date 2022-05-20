import RequirementController from '../controllers/Requirements.Controller';
import { Application, Router } from "express"

export class RequirementRoutes {
    public requirementController: RequirementController = new RequirementController();
    public router = Router()

    public routes(app: Application): void {


        app.route('/requirement/:username')
            .get(this.requirementController.getRequirements)
            .post(this.requirementController.createRequirement)
            .put(this.requirementController.updateRequirement)


    }
}