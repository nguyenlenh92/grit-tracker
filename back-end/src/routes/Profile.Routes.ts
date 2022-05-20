import ProfileController from '../controllers/Profiles.Controller';
import { Application, Router } from "express"

export class ProfileRoutes {
    public profileController: ProfileController = new ProfileController();
    public router = Router()

    public routes(app: Application): void {
        app.route('/profile/getProfileID/')
            .post(this.profileController.getProfileID)

        app.route('/profile/delete/:username/:profileID')
            .delete(this.profileController.deleteProfile)

        app.route('/profile/:username')
            .get(this.profileController.getProfile)
            .post(this.profileController.createProfile)
            .put(this.profileController.updateProfile)
            
        app.route('/profile/unique-semester/:username')
            .get(this.profileController.getUniqueSemesters)


    }
}