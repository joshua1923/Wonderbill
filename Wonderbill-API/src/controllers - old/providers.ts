import { Request, Response } from 'express';
import { RequestBody } from '../interfaces/request-body';
import { Provider } from '../interfaces/provider';
import { Validator } from 'jsonschema';
import axios from 'axios';

const postProvider = async (req: Request, res: Response) => {
    await getData(req, res, 1000, 5);
}

const getData = async (req: Request, res: Response, delay: number, maxtries: number, retry: number = 1) => {

    let requestBody: RequestBody = req.body;
    let result: [Provider];
    let validator = new Validator();

    let requestSchema = {
        "type": "object",
        "properties": {
            "provider": {
                "type": "string"
            },
            "callbackUrl": {
                "type": "string"
            }
        },
        "required": ["provider", "callbackUrl"]
    };

    const validationResult = validator.validate(requestBody, requestSchema);

    if (validationResult.valid) {
        try {
            let response = await axios.get(`${process.env.PROVIDERS_URL}/providers/${requestBody.provider}`);
            result = response.data;

            let callbackResponse = await axios.post(requestBody.callbackUrl, result);
            let callbackResult: [Provider] = callbackResponse.data;

            console.log("Callback successful");

            res.status(200).json({ callbackResult });
        } catch (e) {
            if (maxtries > retry) {
                console.log('call failed: executing with delay ' + delay);
                setTimeout(() => getData(req, res, delay * (retry + 1), maxtries, retry + 1), delay);
            } else {
                console.log('Call failed: executing with delay ' + delay);
            }
        }
    } else {
        res.status(400).send("");
    }
}

export default { postProvider };