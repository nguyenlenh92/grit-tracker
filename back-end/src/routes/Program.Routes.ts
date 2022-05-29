import ProfileController from '../controllers/Profiles.Controller';
import { Application, Router } from "express"

export class ProfileRoutes {
    public programController: ProfileController = new ProfileController();
    public router = Router()

    public routes(app: Application): void {
        app.route('/program/:userID')
            .get(this.programController.getProfile)
    }
}