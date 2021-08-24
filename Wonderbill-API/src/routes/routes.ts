import { Request, Response } from 'express';
import callbackData from '../services/callback';
import { providerData } from '../services/providers';

export class Routes {

    loadProviderRoutes = (app) => {
        /**
        * @api {post} /provider Post Provider
        * @apiName Post Provider
        *
        * @param {Request} req
        * @param {Response} res
        *
        * @apiSuccess (200) {Object} mixed callbackResult array
        * @apiFailure (400) Validation Error
        */
        app.post('/provider', async (req: Request, res: Response) => {
            try {
                const data = await providerData(req);
                res.status(200).send(data);                
            } catch (e) {
                res.status(400).send(e.message);
            }
        });
    }

    loadCallbackRoutes = (app) => {
        app.post('/callback', async (req: Request, res: Response) => {
            try {
                const data = await callbackData(req.body);
                res.status(200).send(data);
            } catch (e) {
                res.status(400).send(e.message);
            }
        });
    }
}
