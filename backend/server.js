const express = require('express');
const cors = require('cors');
const polls = require('./routes/polls')
const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());

app.use('/polls', polls);

app.listen(port, () => console.log(`Server is running on port: ${port}`))
