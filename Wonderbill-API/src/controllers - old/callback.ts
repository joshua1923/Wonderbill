import { Request, Response } from "express";
import { Provider } from '../interfaces/provider';

const callback = (req: Request, res: Response) => {
    let requestBody: [Provider] = req.body;

    console.log('Data received at callback')

    res.send(requestBody);
}

export default {callback}