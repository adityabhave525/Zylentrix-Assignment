const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const authRoutes = require('./routes/auth.routes.js');
const postRoutes = require('./routes/post.routes.js');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});