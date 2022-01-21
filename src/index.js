import express from 'express';

const app = express();
const port = 8000;

app.use('/', (req, res) => res.send('Hello '));

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
