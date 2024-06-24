"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("../db");
const schemas_1 = require("../schemas");
const bcrypt_1 = __importDefault(require("bcrypt"));
const drizzle_orm_1 = require("drizzle-orm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield db_1.db.query.usersTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schemas_1.usersTable.email, email),
    });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
    }
    const isValid = bcrypt_1.default.compareSync(password, user.password);
    if (!isValid) {
        return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
    res.json({
        token,
        user: { id: user.id, name: user.name, age: user.age, email: user.email },
    });
}));
exports.default = router;
