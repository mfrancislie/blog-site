import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
const app = express();
app.use(express.json());

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
const Post = mongoose.model(
  'posts',
  new mongoose.Schema({
    id: Number,
    title: String,
    body: String,
    userId: Number,
  })
);
// USERS LIST
app.get('/api/users', async (req, res) => {
  const { email, password } = req.query;
  const users = await User.find(email && password ? { email, password } : {});
  res.send(users);
});
// USER DETAILS
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ id } ? { id } : {});
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

// TO CREATE NEW USER
app.post('/api/users', async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.send({ message: 'Data is required' });
  }
  const user = new User(req.body);
  const createdUser = await user.save();
  res.send(createdUser);
});

// TO UPDATE USER
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { email, name, phone, password, website } = req.body;
  const user = await User.findOne({ id });
  if (user) {
    user.name = name;
    user.email = email;
    user.password = password;
    user.phone = phone;
    user.website = website;
    const updateUser = await user.save();
    res.send(updateUser);
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

// POST LIST
app.get('/api/posts', async (req, res) => {
  const { userId } = req.query;
  const posts = await Post.find(userId ? { userId } : {});
  res.send(posts);
});

// POST DETAILS
app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ id } ? { id } : {});
  if (post) {
    res.send(post);
  } else {
    res.status(404).send({ message: 'Post not found' });
  }
});

// TO CREATE NEW POST
app.post('/api/posts', async (req, res) => {
  if (!req.body.title || !req.body.body) {
    return res.send({ message: 'Data is required' });
  }
  const post = new Post(req.body);
  const createdPost = await post.save();
  res.send(createdPost);
});

app.get('/api/seed', async (req, res) => {
  await User.deleteMany();
  await User.insertMany([
    {
      id: 1,
      name: 'Francislie',
      email: 'francis@gmail.com',
      password: '123',
      phone: '09665375972',
      website: 'http://blog-site.com',
    },
  ]);
  await Post.deleteMany();
  await Post.insertMany([
    {
      id: 1,
      title: 'Black Adam 2',
      body: 'Black adam is now showing on cinema',
      userId: 1,
    },
  ]);
  res.send({ message: 'Seeded Successfully' });
});

const dirname = path.resolve();
app.use('/', express.static(dirname + '/build'));
app.get('/', (req, res) => res.sendFile(dirname + '/build/index.html'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`served at http://localhost:5000`));
