require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

const universityRoutes = require('./routes/universityRoutes');
const threadRoutes = require('./routes/threadRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
/* app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
})); */
app.use(cors());

app.use('/universities', universityRoutes);
app.use('/threads', threadRoutes);
app.use('/users', userRoutes);

app.listen(process.env.PORT || 3001, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});