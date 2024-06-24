"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("./logger"));
const requestLogger = (req, _res, next) => {
    logger_1.default.info('Method:', req.method);
    logger_1.default.info('Path:  ', req.path);
    logger_1.default.info('Body:  ', req.body);
    next();
};
const unknownEndpoint = (_req, res) => {
    res.status(404).send('Unknown endpoint');
};
const errorHandler = (err, _req, res, _next) => {
    logger_1.default.error(err);
    if (err.name === 'JsonWebTokenError') {
        res.status(401).send('Unauthorized').json({ error: 'token is invalid' });
    }
    else if (err.name === 'TokenExpiredError') {
        res.status(401).send('Unauthorized').json({ error: 'token has expired' });
    }
    _next(err);
};
const tokenExtractor = (req, _res, next) => {
    const authorization = req.headers.authorization;
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.split(' ')[1];
    }
    next();
};
exports.default = { requestLogger, unknownEndpoint, errorHandler, tokenExtractor };
