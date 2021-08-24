import axios from 'axios';
import chai from 'chai';
import 'mocha';
import dotenv from 'dotenv';
import Sinon from 'sinon';
import { getData, postData } from '../src/services/providers';

dotenv.config();

const request = {
    body: {
        "provider": "gas",
        "callbackUrl": "http://localhost:3001/callback"
    }
}

const result = [
    {
        "billedOn": "2020-04-07T15:03:14.257Z",
        "amount": 22.27
    },
    {
        "billedOn": "2020-05-07T15:03:14.257Z",
        "amount": 30
    }
];

describe('Test provider.ts', () => {
    let sandbox: Sinon.SinonSandbox;

    beforeEach(() => {
        sandbox = Sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it("getData should return gas data from providers.json", (done) => {
        const resolved = new Promise((resolve) => resolve(result));
        sandbox.stub(axios, 'get').returns(resolved);

        getData(request.body).then((response) => {
            chai.expect(response).to.eq(result);
        }).then(done, done);
    })

    it("postData should return gas data from callbackUrl", (done) => {
        const resolved = new Promise((resolve) => resolve(result));
        sandbox.stub(axios, 'post').returns(resolved);

        postData(request.body.callbackUrl, result).then((response) => {
            chai.expect(response).to.eq(result);
        }).then(done, done);
    });

    // it("providerData should return gas data", (done) => {
    //     const resolved = new Promise((resolve) => resolve(result));

    //     sandbox.stub(providers, "getData").returns(response);
    //     sandbox.stub(providers, "postData").returns(response);
    //     sandbox.spy(backOff, "arguments");

    //     providers.providerData(request).then((response) => {
    //         expect(response).to.eq(result);
    //     }).then(done, done);
    // })
});