require('express-async-errors');
import express from 'express';
import { errorHandler } from './middlewares';
import routes from './routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
