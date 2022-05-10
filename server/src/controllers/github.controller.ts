import { Request, Response, NextFunction } from 'express';
import { GitHubService } from './../services/github.service';
import { DataService } from './../services/data.service';

const gitService = new GitHubService();
const dataService = new DataService();

export class GithubControllers {

    async tokenGithub(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const code = req.query.code;

            const token = await gitService.gitToken(code as string);

            const user = await gitService.gitUser(token);

            const findUser = await dataService.getUser(user.id);

            if (findUser === null) {
                // res.send('Sorry you don\'t have an account. Install our app and join us')
                res.redirect('https://github.com/apps/aleena-app/installations/new?state=AB12thttp://localhost:3000/');

                const createUser = await dataService.createUser(user);

            } else {
                // TODO need to add logic to check the projects.length 
                res.redirect('http://localhost:3000/');
            }
        } catch (error) {
            console.error(error)
            res.status(500)
        }

    }
  }


    async payloadGithub(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const payload = await gitService.gitPayload(req);
            res.send(payload)
        } catch (error) {
            console.error(error)
            res.status(500)
        }

    }
  }
}
