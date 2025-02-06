const connection = require('../data/db')

//index
const index = (req, res) => {
  res.send('Elenco film');
}

//show
const show = (req, res) => {
  const id = req.params.id;
  res.send(`Dettagli del film con id ${id}`);
}

module.exports = {
  index,
  show
}