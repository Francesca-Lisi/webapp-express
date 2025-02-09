const connection = require('../data/db')

//index
const index = (req, res) => {
  const sql = 'SELECT * FROM movies';

  connection.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: 'Errore query al database' });

    const movies = result.map(movie => {
      return {
        ...movie,
        image: req.imagePath + movie.image
      }
    })

    res.json(movies)
  })
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