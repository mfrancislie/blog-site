import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
// by having this express it can send form data overby post request
app.use(express.json());

// to connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db');
  })
  .catch(() => console.log('error in connecting to db'));

const User = mongoose.model(
  'users',
  new mongoose.Schema({
    id: Number,
    name: String,
    email: String,
    password: String,
    phone: String,
    website: String,
  })
);

//   Users list
app.get('/api/users', async (req, res) => {
  const { email, password } = req.query;
  const users = await User.find(email && password ? { email, password } : {});
  res.send(users);
});
app.get('/api/seed', async (req, res) => {
  await User.deleteMany();
  await User.insertMany([
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      password: '123',
      phone: '1-770-736-8031 x56442',
      website: 'https://mywebsite.com',
    },
  ]);
  res.send({ message: 'seeded successfully' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`served at http://localhost:5000`));
