import axios from "axios";
import { backOff } from "exponential-backoff";
import { Validator } from "jsonschema";
import { Provider } from "../interfaces/provider";
import { RequestBody } from "../interfaces/request-body";

const providerData = async (request: any) => {

        let requestBody: RequestBody = request.body;
        let result: [Provider];
        let validator: Validator = new Validator();

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

        let requestValid = validator.validate(requestBody, requestSchema);

        if (requestValid.valid) {
            try {
                let response = await backOff(() => getData(requestBody), { numOfAttempts: 5 })
                result = response.data;

                let callbackResponse = await backOff(() => postData(requestBody.callbackUrl, result));
                return callbackResponse.data;
            } catch (e) {
                throw e;
            }
        } else {
            throw Error(`Validation Error: ${requestValid.errors}`);
        }
    }

    const getData = (requestBody: RequestBody) => {
        return axios.get(`${process.env.PROVIDER_URL}/providers/${requestBody.provider}`);
    }

    const postData = (callbackUrl: string, result: any) => {
        return axios.post(callbackUrl, result);
}

export { providerData, getData, postData }