const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
require('./database');

app.use(express.json());
app.use(cors());

const profilesRouter = require('./routes/profiles');
const usersRouter = require('./routes/users');
app.use('/api/profiles', profilesRouter);
app.use('/api/users', usersRouter);

app.use(express.static(path.join(__dirname, 'client/build')));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
