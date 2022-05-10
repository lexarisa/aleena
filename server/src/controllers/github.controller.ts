import { Request, Response, NextFunction } from 'express';
import { GitHubService } from './../services/github.service';

const service = new GitHubService();

export class GithubControllers {

    async tokenGithub(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const code = req.query.code
            console.log('codeee', req)
            const token = await service.gitToken(code as string);
            res.send(token)
        } catch (error) {
            console.error(error)
            res.status(500)
        }
    }

    async payloadGithub(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const payload = await service.gitPayload(req);
            res.send(payload)
        } catch (error) {
            console.error(error)
            res.status(500)
        }
    }
    
}