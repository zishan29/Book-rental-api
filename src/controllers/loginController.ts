import express from 'express';
import { db } from '../db';
import { usersTable } from '../schemas';
import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email' });
  }
  const isValid = bcrypt.compareSync(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: 'Incorrect password' });
  }
  const token = jwt.sign(
    { id: user.id, name: user.name },
    process.env.JWT_SECRET!,
    {
      expiresIn: '1d',
    },
  );
  res.json({
    token,
    user: { id: user.id, name: user.name, age: user.age, email: user.email },
  });
});

export default router;
