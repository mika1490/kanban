const express = require(`express`);
const bodyParser = require(`body-parser`);
const Card = require(`./db/models/Card`);
const cardsRoute = require(`./db/routes/cards`);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(`/api/cards`, cardsRoute);

app.get(`/`, (req, res) => {
  res.send(`Smoke Test`);
})

app.listen(PORT, () => {
  console.log(`Server Listening On Port: ${PORT}`);
 })