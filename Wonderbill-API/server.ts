import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { Routes } from './src/routes/routes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT;
const routes: Routes = new Routes();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    res.send("App is running");
});

routes.loadProviderRoutes(app);
routes.loadCallbackRoutes(app);

app.listen(port, () => {
    console.log(`Application is running on ${port}`);
})

