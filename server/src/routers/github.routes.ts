import { Request, Response, Router, NextFunction } from 'express';

const router: Router = Router();

router
    .route('/github')
    .get((req: Request, res: Response, next: NextFunction): void => {
        
    });