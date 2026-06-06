const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Advanced Node API - ES6',
    version: '1.0.0',
    description: 'Swagger placeholder. Add schemas and endpoint docs here.',
  },
  servers: [{ url: '/api/v1' }],
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: { 200: { description: 'API is healthy' } },
      },
    },
  },
};

export default swaggerSpec;
