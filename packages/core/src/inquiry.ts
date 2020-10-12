import { injectable, inject } from "inversify";
import "reflect-metadata";
import { ManagerRequest } from './templates/manager/manager.template'
import { managerQuestion } from './questions/manager.question'
import { Project } from './models/project';


@injectable()
export class Inquiries {

    constructor(@inject('ManagerRequest') private managerRequest: ManagerRequest) {
    }

    public async executeCLI(): Promise<any> {
        let projectToOpen: Project = await managerQuestion();

        return this.managerRequest.openProject(projectToOpen.cmdToOpen, projectToOpen.path);
    }
}

