require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const universityRoutes = require('./routes/universityRoutes');
const threadRoutes = require('./routes/threadRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());

app.use('/universities', universityRoutes);
app.use('/threads', threadRoutes);
app.use('/users', userRoutes);

app.listen(process.env.PORT || 3001, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});