import { Application, Request, Response } from 'express';
import { CourseRoutes } from './Course.Routes';
import { UserRoutes } from './User.Routes';
import { ProfileRoutes } from './Profile.Routes';
import { DegreeRoutes } from './Degree.Routes';
import { RequirementRoutes } from './Requirement.Routes';

export class Routes {
    public courseRoutes: CourseRoutes = new CourseRoutes();
    public userRoutes: UserRoutes = new UserRoutes();
    public profileRoutes: ProfileRoutes = new ProfileRoutes();
    public degreeRoutes: DegreeRoutes = new DegreeRoutes();
    public requirementRoutes: RequirementRoutes = new RequirementRoutes()
    public routes(app: Application): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: "Welcome to Grit Tracker"
                });
            });

        this.courseRoutes.routes(app);
        this.userRoutes.routes(app);
        this.profileRoutes.routes(app);
        this.degreeRoutes.routes(app);
        this.requirementRoutes.routes(app);
    }
}