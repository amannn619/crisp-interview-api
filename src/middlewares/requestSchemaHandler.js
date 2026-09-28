export default function requestSchemaHandler(schema) {
    return function (req, res, next) {
        req.body = schema.parse(req.body);
        next();
    }
}