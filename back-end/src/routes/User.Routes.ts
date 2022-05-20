import UserController from '../controllers/Users.Controller';
import { Application, Router } from "express"

export class UserRoutes {
    public userController: UserController = new UserController();
    public router = Router()

    public routes(app: Application): void {

        app.route('/user/:username')
            .get(this.userController.getUser)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser)

        app.route('/authenticate')
            .post(this.userController.checkPassword)

        app.route('/register')
            .post(this.userController.createUser)
    }
}