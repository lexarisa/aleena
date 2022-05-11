import { Request, Response, NextFunction } from 'express';

export const pipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const event_type = req.headers['X-GitHub-Event'];
  const payload = JSON.parse(req.body);

  switch (event_type) {
    case 'repository':
      //
      break;
    case 'pull_request':
      //
      break;
    case 'issues':
      //
      break;

    default:
      console.log(`Oooh, something new from GitHub: ${event_type}`);
      break;
  }
};
