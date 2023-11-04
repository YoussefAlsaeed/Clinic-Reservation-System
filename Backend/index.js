const express = require("express");
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// Import your controller files
const userController = require('./controllers/UserController');
const doctorController = require('./controllers/DoctorController');
const patientController = require('./controllers/PatientController');


// Use the controllers as middleware
app.use('/users', userController);
app.use('/doctors', doctorController);
app.use('/patients', patientController);




app.listen(3000, () => {
    console.log("server running");
})
