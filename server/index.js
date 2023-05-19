const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const colors = require('colors');












app.listen(process.env.SERVER_PORT, () => { console.log(`Server is running on port ${process.env.SERVER_PORT}`.yellow.bold)});
