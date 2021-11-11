const express = require('express');
const swaggerUI = require('swagger-ui-express');
const apiRouter = require('./routes/api.route');
require('dotenv').config();

const app = express();
const port = process.env.APP_PORT ?? 3000;
const swaggerDocument = require('./openapi.json');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).json({error: {code: 404, message: 'Invalid API access route'}});
});

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});