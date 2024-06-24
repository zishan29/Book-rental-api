"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./utils/config"));
const express_1 = __importDefault(require("express"));
const middleware_1 = __importDefault(require("./utils/middleware"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./utils/logger"));
const userController_1 = __importDefault(require("./controllers/userController"));
const loginController_1 = __importDefault(require("./controllers/loginController"));
const app = (0, express_1.default)();
logger_1.default.info(`Connecting to ${config_1.default.DB_URL}`);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(middleware_1.default.requestLogger);
app.use(middleware_1.default.tokenExtractor);
app.get('/ping', (req, res) => {
    res.send('pong');
});
app.use('/api/users', userController_1.default);
app.use('/api/login', loginController_1.default);
app.use(middleware_1.default.unknownEndpoint);
app.use(middleware_1.default.errorHandler);
exports.default = app;
