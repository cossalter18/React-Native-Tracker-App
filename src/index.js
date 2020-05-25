require('./models/User')
require('./models/Track')
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const bodyParser = require('body-parser')
const requireAuth = require('./middleware/requireAuth')

const app = express();

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri =
  "mongodb+srv://mike:mikemike@cluster0-rlwuj.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
})

mongoose.connection.on('error', (error) => {
console.error('Error connecting to mongo', error)
})

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
