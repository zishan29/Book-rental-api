"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: '.env' });
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DB_URL;
exports.default = { PORT, DB_URL };
