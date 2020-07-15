import 'reflect-metadata';

import express from 'express';
import routes from './routes';

import '@shared/infra/typeorm';

const app = express();

app.use(routes);
app.use(express.json());

app.listen(process.env.PORT || 3333);
