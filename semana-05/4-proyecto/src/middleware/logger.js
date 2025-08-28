// Middleware para logging de requests
const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;
  const ip = req.ip || req.connection.remoteAddress;

  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);

  // Log del body para POST y PUT (solo en desarrollo)
  if ((method === 'POST' || method === 'PUT') && process.env.NODE_ENV === 'development') {
    console.log('Body:', JSON.stringify(req.body, null, 2));
  }

  next();
};

module.exports = logger;
