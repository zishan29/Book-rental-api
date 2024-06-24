import express from 'express';
import { db } from '../db';
import { usersTable } from '../schemas';
import bcrypt from 'bcrypt';
const router = express.Router();

router.get('/', async (req, res) => {
  const users = await db.query.usersTable.findMany({
    columns: { password: false },
  });
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, age, email } = req.body;
  const password = bcrypt.hashSync(req.body.password, 10);
  const user = await db
    .insert(usersTable)
    .values({ name, age, email, password });
  res.json(user);
});

export default router;
