const express = require("express");
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const router = require('./controllers/doctorController.js')
app.use(router)



app.listen(3000, () => {
    console.log("server running");
})
