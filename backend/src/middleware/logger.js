const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;
    const ip = req.ip || req.connection.remoteAddress;
    const user = req.user ? `User:${req.user.id} (${req.user.role})` : 'Guest';

    console.log(`[${timestamp}] ${method} ${url} - ${user} - ${ip}`);

    // Log user actions regarding data access particularly for sensitive routes
    if (req.user && (method === 'GET' || method === 'POST' || method === 'PUT')) {
        // You could theoretically save this to a database logs collection here
        // For MVP, console logging is sufficient as per standard practices
    }

    next();
};

module.exports = logger;
