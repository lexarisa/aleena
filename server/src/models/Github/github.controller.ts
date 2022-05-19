import { Request, Response } from 'express';
import { GitHubService } from '../../services/github.service';
import { DataService } from '../../services/data.service';
import { createToken } from './../../utils/crypt.utils'
import { Container, Service } from 'typedi';

// const serviceInstance = Container.get(DataService);

const dataService: DataService = new DataService();
const gitService: GitHubService = new GitHubService();

export class GithubController {
  
  constructor(private readonly dataService: DataService, private readonly gitService: GitHubService){}

  async tokenGithub(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.query;

      const token = await gitService.gitToken(code as string);

      const user = await gitService.gitUser(token);

      const findUser = await dataService.getUser(user.id);

      if (findUser === null) {
        // res.send('Sorry you don\'t have an account. Install our app and join us')

        res.redirect(
          'https://github.com/apps/aleena-app/installations/new?state=AB12'
        );

        const createUser = await dataService.createUser(user);
      } else {
        // TODO need to add logic to check the projects.length

        const token = await createToken(user.id)

        res.redirect(`http://localhost:3000/project/${token}`);
      }
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  };

  async payloadGithub(req: Request, res: Response): Promise<void> {
    try {
      const payload = await gitService.gitPayload(req);

      res.send(payload);
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  };

  async createPR(req: Request, res: Response): Promise<void> {
    try {
      const newPR = req.body;

      const pr = await dataService.createPR(newPR)

      res.send(pr);
    } catch (error) {
      console.error(error);

      res.status(500);
    }
  };

}
