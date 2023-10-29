const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clinic Reservation System',
      version: '1.0.0',
    },
  },
  apis: [path.join(process.cwd(), '/controllers/*.js')],
  components: {
    schemas: {
      Doctor: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
        },
        required: ['name', 'email', 'password'],
      },
    },
  },
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
