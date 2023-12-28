
function jsonResponseMiddleware(req, res, next) {
    // Override the default send method to format responses as JSON
    res.jsonResponse = function (success, data, message, statusCode = 200) {
        const response = {
        success,
        data,
        message,
        };

        res.status(statusCode).json(response);
    };

    next();
}
  
module.exports = jsonResponseMiddleware;
  